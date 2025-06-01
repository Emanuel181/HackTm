// src/app/map-heat3d/heatmap3d_v2.component.ts

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
  GeoJsonProperties,
  Feature
} from 'geojson';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';

import { neighborhoodsGeoJson } from '../data/neighbours';
import { catchError, throwError } from 'rxjs';
import { CreationDialogComponent } from '../shared/creation-dialog/creation-dialog.component';
import { environment } from '../../environments/environments';
import { MatIcon } from '@angular/material/icon';

interface ZoneProperties {
  name: string;
  category: string;
  intensity: number;
  description?: string;
}

interface Sesizare {
  id: string;
  titlu: string;
  descriere: string;
  categorie: string;
  user_id: string;
  locatie: { lat: number; lng: number };
  url_poza: string;
  status: string;
  created_at: string;
  upvotes: number;
  downvotes: number;
  comments: string[];
  cartier: string;
  interactions: any;
}

@Component({
  selector: 'app-map-heat3d',
  templateUrl: './heatmap3d.component.html',
  styleUrls: ['./heatmap3d.component.scss'],
  standalone: true,
  imports: [
    MatIcon,
    RouterLink
  ]
})
export class MapHeat3DComponent implements AfterViewInit, OnDestroy {
  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef<HTMLDivElement>;
  map!: mapboxgl.Map;
  popup?: mapboxgl.Popup;
  private regionName: string | null = null;
  public currentHeatmap: 'category' | 'security' = 'category';

  // Keep track of which lightPreset is active. Default to "day".
  public currentPreset: 'day' | 'dusk' | 'dawn' | 'night' = 'day';

  // ───────────────────────────────────────────────────────────────────────────────
  // Define a color for each category. You can adjust hex codes as desired.
  // ───────────────────────────────────────────────────────────────────────────────
  private categoryColors: { [category: string]: string } = {
    "Animale": "#1f3b73",
    "Apa si canalizare":                    "#377eb8",
    "Constructii si terenuri":              "#4daf4a",
    "Garaje, coserit, cimitire si toalete publice": "#984ea3",
    "Iluminat public":                      "#ff7f00",
    "Mediu, locuri de joaca si spatii verzi": "#ffff33",
    "Ordine publica":                       "#a65628",
    "Organizare si functionare asociații de proprietari": "#f781bf",
    "Piete agroalimentare":                 "#999999",
    "Probleme de integritate":              "#66c2a5",
    "Probleme de integritate referitoare la angajati": "#fc8d62",
    "Salubrizare, dezinsectie, deratizare si dezapezire": "#8da0cb",
    "Santiere":                             "#e78ac3",
    "Strazi si trotoare":                   "#a6d854",
    "Trafic rutier si semne de circulatie": "#ffd92f",
    "Transport in comun":                   "#e5c494",
    "Urbanism":                            "#b3b3b3",
    "Website si platforma sesizari":        "#1b9e77",
    "default":                              "#cccccc"
  };
  public switchHeatmap(type: 'category' | 'security'): void {
    if (this.currentHeatmap !== type) {
      this.currentHeatmap = type;
      this.loadAndPaintZonesHeatmapByType(type);
    }
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private matDialog: MatDialog
  ) {}

  ngAfterViewInit(): void {
    // 1) Read “regionName” from URL if provided
    this.regionName = this.activatedRoute.snapshot.queryParamMap.get('regionName');

    // 2) Initialize Mapbox GL
    mapboxgl.accessToken = 'pk.eyJ1IjoiZW1hMTIxIiwiYSI6ImNtYmMycms1djE3azcybHF1d3pvMzM2NHQifQ.1kkI3Uwn4zAER6PYWpMknQ';
    this.map = new mapboxgl.Map({
      container: this.mapContainer.nativeElement,
      style: 'mapbox://styles/mapbox/standard',
      center: [21.23771, 45.75616], // Timișoara center
      zoom: 14,                      // start a bit closer
      pitch: 70,                     // tilt even more (was 60)
      bearing: 45,                   // rotate view to 45° (instead of -17.6)
      antialias: true
    });

    // Whenever the style reloads, re‐apply our chosen lightPreset
    this.map.on('style.load', () => {
      (this.map as any).setConfigProperty('basemap', 'lightPreset', this.currentPreset);
    });



    // Once built‐in layers have loaded, build terrain + heatmap
    this.map.on('load', () => {
      this.addTerrainAndSky();
      this.loadAndPaintZonesHeatmapByType(this.currentHeatmap);
      this.addCenterBlueMarker();

      if (this.regionName) {
        this.fetchAndDrawRedMarkers(this.regionName);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }

  // ───────────────────────────────────────────────────────────────────────────────
  // A) Terrain + fog + sky
  // ───────────────────────────────────────────────────────────────────────────────
  private addTerrainAndSky(): void {
    this.map.addSource('mapbox-dem', {
      type: 'raster-dem',
      url: 'mapbox://mapbox.terrain-rgb',
      tileSize: 512,
      maxzoom: 14
    });
    this.map.setTerrain({ source: 'mapbox-dem', exaggeration: 1.5 });

    this.map.setFog({
      range: [0.5, 10],
      color: 'rgba(240, 240, 255, 0.4)',
      'horizon-blend': 0.3,
      'star-intensity': 0.1
    });

    this.map.addLayer({
      id: 'sky',
      type: 'sky',
      paint: {
        'sky-type': 'atmosphere',
        'sky-atmosphere-sun': [0.0, 0.0],
        'sky-atmosphere-sun-intensity': 15
      }
    });
  }

  // ───────────────────────────────────────────────────────────────────────────────
  // B) Load neighborhoods, fetch their categories, and paint as 3D extrusion
  // ───────────────────────────────────────────────────────────────────────────────
  private loadAndPaintZonesHeatmapByType(type: 'category' | 'security'): void {
    const apiUrl =
      type === 'category'
        ? 'https://hacktm.onrender.com/api/heatmap/get_problems'
        : 'https://hacktm.onrender.com/api/heatmap/get_security';

    this.http
      .get<{ [regionName: string]: string | number }>(apiUrl)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          console.error(`Error fetching ${type} data:`, err.message);
          return throwError(err);
        })
      )
      .subscribe((mapData) => {
        const cleanedFeatures = (neighborhoodsGeoJson.features as any[]).filter((f) => {
          const props = f.properties as GeoJsonProperties;
          if (!props || !props['name']) return true;
          const nameLower = String(props['name']).toLowerCase();
          return nameLower !== 'zona a' && nameLower !== 'zone b';
        });

        const cleanedGeoJson: FeatureCollection<Polygon | MultiPolygon, ZoneProperties> = {
          type: 'FeatureCollection',
          features: cleanedFeatures.map((f, idx) => {
            const feat = f as Feature<Polygon | MultiPolygon, GeoJsonProperties>;
            const regionName = feat.properties!['name'] as string;
            const value = mapData[regionName] ?? (type === 'category' ? '' : 0);

            return {
              type: 'Feature',
              geometry: feat.geometry,
              properties: {
                name: regionName,
                category: type === 'category' ? String(value) : '',
                intensity: type === 'security' ? Number(value) : Math.random() * 5,
                description: ''
              },
              id: feat.id ?? idx
            };
          })
        };

        const filteredGeoJson: FeatureCollection<Polygon | MultiPolygon, ZoneProperties> =
          this.regionName
            ? this.filterCollectionByName(this.regionName, cleanedGeoJson)
            : cleanedGeoJson;

        if (this.map.getSource('timisoara-zones')) {
          (this.map.getSource('timisoara-zones') as mapboxgl.GeoJSONSource).setData(filteredGeoJson);
        } else {
          this.map.addSource('timisoara-zones', {
            type: 'geojson',
            data: filteredGeoJson
          });
        }

        let colorPaint: any;
        let heightPaint: any;

        if (type === 'category') {
          const categoryMatch: any[] = ['match', ['get', 'category']];
          for (const [cat, hex] of Object.entries(this.categoryColors)) {
            if (cat !== 'default') {
              categoryMatch.push(cat, hex);
            }
          }
          categoryMatch.push(this.categoryColors['default']);
          colorPaint = categoryMatch;
        } else {
          colorPaint = [
            'interpolate',
            ['linear'],
            ['get', 'intensity'],
            0, '#ffffff',
            0.25, '#ffd700',
            0.5, '#ff8c00',
            1, '#ff0000'
          ];
        }

        heightPaint = [
          'interpolate',
          ['linear'],
          ['get', 'intensity'],
          0, 0,
          1, 200
        ];

        if (!this.map.getLayer('zones-3d-heat')) {
          this.map.addLayer({
            id: 'zones-3d-heat',
            type: 'fill-extrusion',
            source: 'timisoara-zones',
            paint: {
              'fill-extrusion-color': colorPaint,
              'fill-extrusion-height': heightPaint,
              'fill-extrusion-base': 0,
              'fill-extrusion-opacity': 0.7
            }
          });

        } else {
          this.map.setPaintProperty('zones-3d-heat', 'fill-extrusion-color', colorPaint);
          this.map.setPaintProperty('zones-3d-heat', 'fill-extrusion-height', heightPaint);
        }

        const bbox = this.getGeoJSONFeatureBBoxForCollection(filteredGeoJson);
        this.map.fitBounds(
          [
            [bbox.minLng, bbox.minLat],
            [bbox.maxLng, bbox.maxLat]
          ],
          {
            padding: 40,
            duration: 1500,
            maxZoom: 15
          }
        );

        this.map.once('moveend', () => {
          this.map.easeTo({
            pitch: 70,
            bearing: 45,
            duration: 1200,
            easing: t => t
          });
        });

        this.addHoverInteraction('zones-3d-heat');
      });
  }

  // ───────────────────────────────────────────────────────────────────────────────
  // C) Hover logic for “fill-extrusion” layer, now showing name + category
  // ───────────────────────────────────────────────────────────────────────────────
  private addHoverInteraction(layerId: string): void {
    if (!this.map) return;
    let hoveredId: number | string | null = null;

    this.map.on('mousemove', layerId, e => {
      const feature = e.features && e.features[0];
      if (!feature) return;
      this.map.getCanvas().style.cursor = 'pointer';

      const thisId = feature.id!;
      if (hoveredId !== null && hoveredId !== thisId) {
        this.map.setFeatureState({ source: 'timisoara-zones', id: hoveredId }, { hover: false });
      }
      hoveredId = thisId as number;
      this.map.setFeatureState({ source: 'timisoara-zones', id: hoveredId }, { hover: true });

      const props = feature.properties as GeoJsonProperties | undefined;
      const name = (props && props['name']) ? String(props['name']) : 'Unnamed';
      const category = (props && props['category']) ? String(props['category']) : 'No category';

      const coords = this.extractLinearRing(feature.geometry as any);
      const center = this.computeCentroid(coords);

      if (this.popup) {
        this.popup.remove();
      }
      this.popup = new mapboxgl.Popup({ closeButton: false, closeOnClick: false })
        .setLngLat(center)
        .setHTML(`
          <div class="popup-content">
            <h4>${name}</h4>
            <p><strong>Problem Category:</strong> ${category}</p>
          </div>
        `)
        .addTo(this.map);
    });

    this.map.on('mouseleave', layerId, () => {
      this.map.getCanvas().style.cursor = '';
      if (hoveredId !== null) {
        this.map.setFeatureState({ source: 'timisoara-zones', id: hoveredId }, { hover: false });
      }
      hoveredId = null;
      if (this.popup) {
        this.popup.remove();
      }
    });
  }

  // ───────────────────────────────────────────────────────────────────────────────
  // D) Add a blue marker at city center (optional)
  // ───────────────────────────────────────────────────────────────────────────────
  private addCenterBlueMarker(): void {
    new mapboxgl.Marker({
      color: '#0000FF',
      draggable: false
    })
      .setLngLat([21.23771, 45.75616])
      .addTo(this.map);
  }

  // ───────────────────────────────────────────────────────────────────────────────
  // E) If ?regionName=… is provided, fetch “sesizări” and draw red pins
  // ───────────────────────────────────────────────────────────────────────────────
  private fetchAndDrawRedMarkers(regionName: string): void {
    const url = `${environment.baseApiUrl}get_sesizari/cartier/${encodeURIComponent(regionName)}`;
    this.http
      .get<Sesizare[]>(url)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          console.error('Error fetching sesizări:', err.message);
          return throwError(err);
        })
      )
      .subscribe((sesizari: Sesizare[]) => {
        if (!Array.isArray(sesizari) || sesizari.length === 0) {
          console.log(`No sesizări returned for "${regionName}".`);
          return;
        }

        sesizari.forEach(item => {
          // JSON “lat” actually holds longitude, and “lng” holds latitude
          const lon = item.locatie.lat;
          const lat = item.locatie.lng;

          // 1) Create the red marker
          const marker = new mapboxgl.Marker({
            color: '#FF0000',
            draggable: false
          })
            .setLngLat([lon, lat])
            .addTo(this.map);

          // 2) Add click handler to show dialog
          const el = marker.getElement();
          el.style.cursor = 'pointer';
          el.addEventListener('click', e => {
            e.stopPropagation();
            this.matDialog.open(CreationDialogComponent, {
              width: '650px',
              data: item
            });
          });
        });
      });
  }

  // ───────────────────────────────────────────────────────────────────────────────
  // Called by each of the four light buttons
  // ───────────────────────────────────────────────────────────────────────────────
  public onLightPresetClick(preset: 'day' | 'dawn' | 'dusk' | 'night'): void {
    this.currentPreset = preset;
    if (this.map && (this.map as any).setConfigProperty) {
      (this.map as any).setConfigProperty('basemap', 'lightPreset', preset);
    }
  }

  // ───────────────────────────────────────────────────────────────────────────────
  // FILTER: Returns either the single matching feature or the full collection
  // ───────────────────────────────────────────────────────────────────────────────
  private filterCollectionByName(
    regionName: string,
    sourceCollection: FeatureCollection<Polygon | MultiPolygon, ZoneProperties>
  ): FeatureCollection<Polygon | MultiPolygon, ZoneProperties> {
    const matched = sourceCollection.features.filter(f => {
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
            properties: matched[0].properties!,
            id: matched[0].id
          }
        ]
      };
    }
    return sourceCollection;
  }

  // ───────────────────────────────────────────────────────────────────────────────
  // HELPER: Extract the outer linear ring for a Polygon or MultiPolygon
  // ───────────────────────────────────────────────────────────────────────────────
  private extractLinearRing(geometry: Polygon | MultiPolygon): Array<[number, number]> {
    if (geometry.type === 'Polygon') {
      return (geometry.coordinates[0] as Array<[number, number]>);
    } else {
      return (geometry.coordinates[0][0] as Array<[number, number]>);
    }
  }

  // ───────────────────────────────────────────────────────────────────────────────
  // HELPER: Compute the centroid of a simple linear ring (arithmetic mean)
  // ───────────────────────────────────────────────────────────────────────────────
  private computeCentroid(ring: Array<[number, number]>): [number, number] {
    let sumLng = 0, sumLat = 0;
    for (const [lng, lat] of ring) {
      sumLng += lng;
      sumLat += lat;
    }
    const count = ring.length || 1;
    return [sumLng / count, sumLat / count];
  }

  // ───────────────────────────────────────────────────────────────────────────────
  // HELPER: Compute bounding box of a single Polygon/MultiPolygon
  // ───────────────────────────────────────────────────────────────────────────────
  private getGeoJSONFeatureBBox(
    geometry: Polygon | MultiPolygon
  ): { minLng: number; minLat: number; maxLng: number; maxLat: number } {
    const ring = this.extractLinearRing(geometry);
    let minLng = ring[0][0], maxLng = ring[0][0];
    let minLat = ring[0][1], maxLat = ring[0][1];

    for (const [lng, lat] of ring) {
      if (lng < minLng) minLng = lng;
      if (lng > maxLng) maxLng = lng;
      if (lat < minLat) minLat = lat;
      if (lat > maxLat) maxLat = lat;
    }
    return { minLng, minLat, maxLng, maxLat };
  }

  // ───────────────────────────────────────────────────────────────────────────────
  // HELPER: Compute bounding box for an entire FeatureCollection
  // ───────────────────────────────────────────────────────────────────────────────
  private getGeoJSONFeatureBBoxForCollection(
    fc: FeatureCollection<Polygon | MultiPolygon, ZoneProperties>
  ): { minLng: number; minLat: number; maxLng: number; maxLat: number } {
    let minLng = Infinity, maxLng = -Infinity;
    let minLat = Infinity, maxLat = -Infinity;

    for (const feature of fc.features) {
      const { minLng: fMin, minLat: fMinLat, maxLng: fMax, maxLat: fMaxLat } =
        this.getGeoJSONFeatureBBox(feature.geometry);
      if (fMin < minLng) minLng = fMin;
      if (fMax > maxLng) maxLng = fMax;
      if (fMinLat < minLat) minLat = fMinLat;
      if (fMaxLat > maxLat) maxLat = fMaxLat;
    }

    return { minLng, minLat, maxLng, maxLat };
  }
}
