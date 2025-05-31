// src/app/map-heat3-d/map-heat3-d.component.ts

import {
  Component,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  ViewChild
} from '@angular/core';

import mapboxgl from 'mapbox-gl';
import {
  FeatureCollection,
  Polygon,
  MultiPolygon,
  GeoJsonProperties
} from 'geojson';
import { ActivatedRoute } from '@angular/router';

// ← Import your full neighborhoods GeoJSON (same one used by OpenLayers)
import { neighborhoodsGeoJson } from '../data/neighbours';

interface ZoneProperties {
  name: string;
  intensity?: number;
  description?: string;
}

@Component({
  selector: 'app-map-heat3d',
  templateUrl: 'map-heat3-d.html',
  styleUrls: ['map-heat3-d.scss']
})
export class MapHeat3DComponent implements AfterViewInit, OnDestroy {
  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;
  map!: mapboxgl.Map;
  popup?: mapboxgl.Popup;

  // Holds the regionName passed in via ?regionName=…
  private regionName: string | null = null;

  // ───> Keep track of which lightPreset is active. Default to "day".
  public currentPreset: 'day' | 'dusk' | 'dawn' | 'night' = 'dawn';

  constructor(private activatedRoute: ActivatedRoute) {}

  ngAfterViewInit(): void {
    // 1) Read “regionName” from the URL query parameters
    this.regionName = this.activatedRoute.snapshot.queryParamMap.get('regionName');

    // 2) Initialize Mapbox GL with the Standard style
    mapboxgl.accessToken =
      'pk.eyJ1IjoiZW1hMTIxIiwiYSI6ImNtYmMycms1djE3azcybHF1d3pvMzM2NHQifQ.1kkI3Uwn4zAER6PYWpMknQ';

    this.map = new mapboxgl.Map({
      container: this.mapContainer.nativeElement,
      style: 'mapbox://styles/mapbox/standard',
      center: [21.23771, 45.75616], // fallback center (Timisoara)
      zoom: 13,
      pitch: 60,
      bearing: -17.6,
      antialias: true
    });

    // ─────────────────────────────────────────────────────────────────
    // A) Whenever the style is (re)loaded, re-apply our chosen lightPreset.
    //    In practice, “style.load” fires after the initial load too, so this
    //    will set Standard → “day” by default, then switch instantly if user changes.
    // ─────────────────────────────────────────────────────────────────
    this.map.on('style.load', () => {
      // If you haven’t loaded any style or if Standard has just reloaded,
      // set the basemap’s lightPreset to whatever we have in currentPreset.
      (this.map as any).setConfigProperty('basemap', 'lightPreset', this.currentPreset);
      // Note: In Mapbox GL JS v3+, setConfigProperty comes from the Style Import API.
      // “basemap” refers to the imported Standard style within your style JSON.
    });

    // ─────────────────────────────────────────────────────────────────
    // B) Run once when the map first finishes loading all of its built-in layers.
    //    Here we:
    //    1. Add terrain.
    //    2. Add (optional) custom 3D‐building layer on top of Standard’s own.
    //    3. Filter out “Zona A” / “Zone B”.
    //    4. Add our zones as a GeoJSON source.
    //    5. Show either a single region or all regions.
    // ─────────────────────────────────────────────────────────────────
    this.map.on('load', () => {
      // 1) Terrain and exaggeration:
      this.map.addSource('mapbox-dem', {
        type: 'raster-dem',
        url: 'mapbox://mapbox.terrain-rgb',
        tileSize: 512,
        maxzoom: 14
      });
      this.map.setTerrain({ source: 'mapbox-dem', exaggeration: 1.5 });

      // Add atmospheric fog
      this.map.setFog({
        range: [0.5, 10],
        color: 'rgba(240, 240, 255, 0.4)',
        'horizon-blend': 0.3,
        'star-intensity': 0.1
      });

// Add sky layer
      this.map.addLayer({
        id: 'sky',
        type: 'sky',
        paint: {
          'sky-type': 'atmosphere',
          'sky-atmosphere-sun': [0.0, 0.0],
          'sky-atmosphere-sun-intensity': 15
        }
      });


      // 3) FILTER OUT “Zona A” and “Zone B” from your neighborhoodsGeoJson:
      const cleanedFeatures = (neighborhoodsGeoJson.features as any[]).filter((f) => {
        const props = f.properties as GeoJsonProperties;
        if (!props || !props['name']) {
          return true; // keep if no name
        }
        const nameLower = String(props['name']).toLowerCase();
        return nameLower !== 'zona a' && nameLower !== 'zone b';
      });
      const cleanedGeoJson: FeatureCollection<Polygon | MultiPolygon, ZoneProperties> = {
        type: 'FeatureCollection',
        features: cleanedFeatures.map((f, index) => ({
          type: 'Feature',
          geometry: f.geometry,
          properties: f.properties,
          id: f.id ?? index // fallback to index if no id
        }))

      };

      // 4) If a ?regionName=… was provided, filter cleanedGeoJson down to exactly that one feature.
      const filteredGeoJson: FeatureCollection<Polygon | MultiPolygon, ZoneProperties> =
        this.regionName
          ? this.filterCollectionByName(this.regionName, cleanedGeoJson)
          : cleanedGeoJson;

      // 5) Add our zones as a GeoJSON source:
      this.map.addSource('timisoara-zones', {
        type: 'geojson',
        data: filteredGeoJson
      });

      // 6) Depending on whether we have exactly one region or many, call showSingleRegion or showAllRegions:
      if (this.regionName && filteredGeoJson.features.length === 1) {
        this.showSingleRegion(filteredGeoJson.features[0]);
      } else {
        this.showAllRegions();
      }
    });
  }

  /**
   * Called from the <select> when the user picks a new lightPreset.
   * Immediately tell Mapbox Standard to switch to that preset.
   */
  onLightPresetChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const preset = selectElement.value as 'day' | 'dusk' | 'dawn' | 'night';

    this.currentPreset = preset;

    if (this.map && (this.map as any).setConfigProperty) {
      (this.map as any).setConfigProperty('basemap', 'lightPreset', preset);
    }
  }


  /**
   * Filters a given GeoJSON collection to only the feature whose .properties.name === regionName.
   * If none match, returns the full collection as a fallback.
   */
  private filterCollectionByName(
    regionName: string,
    sourceCollection: FeatureCollection<Polygon | MultiPolygon, ZoneProperties>
  ): FeatureCollection<Polygon | MultiPolygon, ZoneProperties> {
    const matched = sourceCollection.features.filter((f) => {
      const props = f.properties as GeoJsonProperties;
      return props && String(props['name']) === regionName;
    });

    if (matched.length === 1) {
      return {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            geometry: matched[0].geometry,
            properties: matched[0].properties,
            id: matched[0].id
          }
        ]
      };
    }

    // No single match → return the entire cleaned collection
    return sourceCollection;
  }

  /**
   * Show exactly one polygon in “3D” (fill-extrusion), then fit camera to its BBox.
   */
  private showSingleRegion(feature: {
    type: 'Feature';
    geometry: Polygon | MultiPolygon;
    properties: ZoneProperties;
    id?: string | number;
  }) {
    if (!this.map) return;
    const colorRamp = this.currentPreset === 'night'
      ? ['#0D1B2A', '#1B263B', '#415A77', '#778DA9', '#E0E1DD']
      : ['#2DC4B2', '#3BB3C3', '#669EC4', '#8B88B6', '#A2719B', '#AA5E79'];

    // 2) Add an outline (line) layer for that same polygon
    this.map.addLayer({
      id: 'selected-region-outline',
      type: 'line',
      source: 'timisoara-zones',
      paint: {
        'line-color': '#FFC107',
        'line-width': 3,
        'line-opacity': 1
      }
    });


    // 3) Compute bounding box & fit
    const bbox = this.getGeoJSONFeatureBBox(feature.geometry);
    this.map.flyTo({
      center: this.computeCentroid(this.extractLinearRing(feature.geometry)),
      zoom: 16.5,           // Slightly less tight, more city context
      pitch: 60,            // View from above, not too steep
      bearing: -15,         // Gentle horizontal rotation
      speed: 0.3,           // Slow for cinematic feel
      curve: 3.2,           // Smoother arc trajectory
      easing: (t) => t < 0.5
        ? 4 * t * t * t     // Ease-in cubic
        : 1 - Math.pow(-2 * t + 2, 3) / 2, // Ease-out cubic
      essential: true
    });




    // 4) Add hover interaction so user sees popup with name/description
    this.addHoverInteraction('selected-region-outline');
  }

  /**
   * Show all neighborhoods in flat “3D” (fill-extrusion), then fit camera to entire collection.
   */
  private showAllRegions() {
    if (!this.map) return;
    const colorRamp = this.currentPreset === 'night'
      ? ['#0D1B2A', '#1B263B', '#415A77', '#778DA9', '#E0E1DD']
      : ['#2DC4B2', '#3BB3C3', '#669EC4', '#8B88B6', '#A2719B', '#AA5E79'];

    // 2) Add a “hover outline” line layer
    this.map.addLayer({
      id: 'all-zones-outline',
      type: 'line',
      source: 'timisoara-zones',
      paint: {
        'line-color': '#FFFFFF',
        'line-width': [
          'case',
          ['boolean', ['feature-state', 'hover'], false],
          3, 0
        ],
        'line-opacity': [
          'case',
          ['boolean', ['feature-state', 'hover'], false],
          1, 0
        ],
        'line-blur': [
          'case',
          ['boolean', ['feature-state', 'hover'], false],
          4, 0
        ]
      }
    });

    // 3) Fit camera to the bounding box of the entire cleaned collection
    const src = this.map.getSource('timisoara-zones') as mapboxgl.GeoJSONSource;
    const entireGeoJson = src.serialize().data as FeatureCollection<Polygon | MultiPolygon, ZoneProperties>;
    const entireBBox = this.getGeoJSONFeatureBBoxForCollection(entireGeoJson);

    this.map.fitBounds(
      [
        [entireBBox.minLng, entireBBox.minLat],
        [entireBBox.maxLng, entireBBox.maxLat]
      ],
      { padding: 40, duration: 1500 }
    );

    // 4) Add hover interaction for all polygons
    this.addHoverInteraction('all-zones-outline');
  }

  /**
   * Hover logic: when the user moves over any polygon in the specified layer,
   * outline it and display a popup of name/description.
   */
  private addHoverInteraction(layerId: string) {
    if (!this.map) return;

    let hoveredId: number | null = null;

    this.map.on('mousemove', layerId, (e) => {
      const feature = e.features && e.features[0];
      if (!feature || feature.geometry.type !== 'Polygon') {
        return;
      }

      this.map.getCanvas().style.cursor = 'pointer';

      if (hoveredId !== null) {
        this.map.setFeatureState({ source: 'timisoara-zones', id: hoveredId }, { hover: true });
      }




      if (hoveredId !== null) {
        this.map.setFeatureState({ source: 'timisoara-zones', id: hoveredId }, { hover: true });
      }


      // TS4111 fix: feature.properties may be null, so guard it
      const props = feature.properties as GeoJsonProperties | undefined;
      const name = props && props['name'] ? String(props['name']) : 'Unnamed';
      const description = props && props['description']
        ? String(props['description'])
        : '';

      // TS2322 fix: compute polygon centroid safely
      const coordsArray = this.extractLinearRing(feature.geometry);
      const center = this.computeCentroid(coordsArray);

      if (this.popup) {
        this.popup.remove();
      }
      this.popup = new mapboxgl.Popup({ closeButton: false, closeOnClick: false })
        .setLngLat(center)
        .setHTML(`
  <div class="popup-content">
    <h4>${name}</h4>
    <p>${description}</p>
  </div>
`)

        .addTo(this.map);
    });

    this.map.on('mouseleave', layerId, () => {
      this.map.getCanvas().style.cursor = '';
      if (hoveredId !== null) {
        this.map.setFeatureState({ source: 'timisoara-zones', id: hoveredId }, { hover: true });
      }

      hoveredId = null;
      if (this.popup) {
        this.popup.remove();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }

  // ─────────────────────────────────────────────────────────────────
  // Utility: Given a Polygon or MultiPolygon geometry, extract the “outer ring”
  // as an array of [lng, lat] pairs. (Handles both types cleanly.)
  // ─────────────────────────────────────────────────────────────────
  private extractLinearRing(
    geometry: Polygon | MultiPolygon
  ): Array<[number, number]> {
    if (geometry.type === 'Polygon') {
      // geometry.coordinates is number[][][] → outer ring is coordinates[0]
      return (geometry.coordinates[0] as Array<[number, number]>);
    } else {
      // geometry.type === 'MultiPolygon'
      // geometry.coordinates is number[][][][] → take coordinates[0][0]
      return (geometry.coordinates[0][0] as Array<[number, number]>);
    }
  }

  // ─────────────────────────────────────────────────────────────────
  // Utility: Compute centroid of a simple linear ring in [lng,lat] space
  // (Just arithmetic mean of vertices.)
  // ─────────────────────────────────────────────────────────────────
  private computeCentroid(ring: Array<[number, number]>): [number, number] {
    let sumLng = 0,
      sumLat = 0;
    for (const [lng, lat] of ring) {
      sumLng += lng;
      sumLat += lat;
    }
    const count = ring.length || 1;
    return [sumLng / count, sumLat / count];
  }

  // ─────────────────────────────────────────────────────────────────
  // Utility: Compute bounding box (minLng, minLat, maxLng, maxLat)
  // for a single Polygon or MultiPolygon feature.
  // ─────────────────────────────────────────────────────────────────
  private getGeoJSONFeatureBBox(
    geometry: Polygon | MultiPolygon
  ): { minLng: number; minLat: number; maxLng: number; maxLat: number } {
    const ring = this.extractLinearRing(geometry);
    let minLng = ring[0][0],
      maxLng = ring[0][0],
      minLat = ring[0][1],
      maxLat = ring[0][1];

    for (const [lng, lat] of ring) {
      if (lng < minLng) minLng = lng;
      if (lng > maxLng) maxLng = lng;
      if (lat < minLat) minLat = lat;
      if (lat > maxLat) maxLat = lat;
    }

    return { minLng, minLat, maxLng, maxLat };
  }

  // ─────────────────────────────────────────────────────────────────
  // Utility: Compute bounding box for an entire FeatureCollection
  // ─────────────────────────────────────────────────────────────────
  private getGeoJSONFeatureBBoxForCollection(
    fc: FeatureCollection<Polygon | MultiPolygon, ZoneProperties>
  ): { minLng: number; minLat: number; maxLng: number; maxLat: number } {
    let minLng = Infinity,
      maxLng = -Infinity,
      minLat = Infinity,
      maxLat = -Infinity;

    for (const feature of fc.features) {
      const { minLng: fMinLng, minLat: fMinLat, maxLng: fMaxLng, maxLat: fMaxLat } =
        this.getGeoJSONFeatureBBox(feature.geometry);

      if (fMinLng < minLng) minLng = fMinLng;
      if (fMaxLng > maxLng) maxLng = fMaxLng;
      if (fMinLat < minLat) minLat = fMinLat;
      if (fMaxLat > maxLat) maxLat = fMaxLat;
    }

    return { minLng, minLat, maxLng, maxLat };
  }

  onLightPresetClick(preset: 'day' | 'dawn' | 'dusk' | 'night') {
    this.currentPreset = preset;

    // Apply preset to the map if style is loaded
    if (this.map && (this.map as any).setConfigProperty) {
      (this.map as any).setConfigProperty('basemap', 'lightPreset', preset);
    }
  }

}
