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

  Polygon,
  MultiPolygon,
  GeoJsonProperties,
} from 'geojson';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';

import { neighborhoodsGeoJson } from '../data/neighbours';
import { catchError, throwError } from 'rxjs';
import { CreationDialogComponent } from '../shared/creation-dialog/creation-dialog.component';
import { environment } from '../../environments/environments';
import { MatIcon } from '@angular/material/icon';
import { FeatureCollection, Feature, Point } from 'geojson';
import {NgForOf, NgIf} from '@angular/common';

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
    RouterLink,
    NgIf,
    NgForOf
  ]
})
export class MapHeat3DComponent implements AfterViewInit, OnDestroy {
  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef<HTMLDivElement>;
  map!: mapboxgl.Map;
  popup?: mapboxgl.Popup;
  private regionName: string | null = null;
  public currentHeatmap: 'category' | 'security' = 'category';
  private readonly policeStations: [number, number][] = [
    [21.2416237, 45.7587678],           // HQ
    [21.207632, 45.764828],             // New 1
    [21.209308, 45.750764],             // New 2
    [21.238206, 45.747776]              // New 3
  ];
  private fetchIsochrone(center: [number, number], minutes = 15) {
    const accessToken = 'pk.eyJ1IjoiZW1hMTIxIiwiYSI6ImNtYmMycms1djE3azcybHF1d3pvMzM2NHQifQ.1kkI3Uwn4zAER6PYWpMknQ';
    const url = `https://api.mapbox.com/isochrone/v1/mapbox/driving/${center[0]},${center[1]}?contours_minutes=5,10,15&polygons=true&access_token=${accessToken}`;
    return this.http.get(url);
  }
  public showCategoryLegend = true;
  public showSecurityLegend = false;



  public removePoliceCoverage(): void {
    if (this.map.getLayer('police-isochrone-layer')) {
      this.map.removeLayer('police-isochrone-layer');
    }
    if (this.map.getSource('police-isochrone')) {
      this.map.removeSource('police-isochrone');
    }
    if (this.map.getLayer('police-symbol')) {
      this.map.removeLayer('police-symbol');
    }
    if (this.map.getSource('police-symbol')) {
      this.map.removeSource('police-symbol');
    }
    this.policeModeEnabled = false;



    // Remove any police-related popups
    if (this.popup) {
      this.popup.remove();
      this.popup = undefined;
    }

    // Restore heatmap and red markers
    this.loadAndPaintZonesHeatmapByType(this.currentHeatmap);
    if (this.regionName) {
      this.fetchAndDrawRedMarkers(this.regionName);
    }
  }


  public drawPoliceIsochrone(): void {
    const layersToRemove = ['zones-3d-heat', 'route-line-layer'];
    const sourcesToRemove = ['timisoara-zones', 'route-line'];

    this.policeModeEnabled = true;

    layersToRemove.forEach(id => {
      if (this.map.getLayer(id)) this.map.removeLayer(id);
    });
    sourcesToRemove.forEach(id => {
      if (this.map.getSource(id)) this.map.removeSource(id);
    });

    if (this.popup) {
      this.popup.remove();
      this.popup = undefined;
    }

    document.querySelectorAll('.mapboxgl-marker').forEach(el => {
      if (el.classList.contains('remove-for-police')) el.remove();
    });

    // For each police station
    this.policeStations.forEach((station, index) => {
      const url = `https://api.mapbox.com/isochrone/v1/mapbox/driving/${station[0]},${station[1]}?contours_minutes=5,10,15&polygons=true&access_token=${mapboxgl.accessToken}`;

      this.http.get<any>(url).subscribe(data => {
        const sourceId = `police-isochrone-${index}`;
        const layerId = `police-isochrone-layer-${index}`;

        this.map.addSource(sourceId, { type: 'geojson', data });
        this.map.addLayer({
          id: layerId,
          type: 'fill',
          source: sourceId,
          paint: {
            'fill-color': [
              'match', ['get', 'contour'],
              5, '#ffffb2',
              10, '#fecc5c',
              15, '#fd8d3c',
              '#f03b20'
            ],
            'fill-opacity': 0.4
          }
        });

        // Add marker for the station
        const feature: Feature<Point> = {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: station
          },
          properties: {
            title: `Poliția #${index + 1}`
          }
        };

        const sourceSymbolId = `police-symbol-${index}`;
        const layerSymbolId = `police-symbol-layer-${index}`;

        this.map.addSource(sourceSymbolId, {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [feature]
          }
        });

        const addSymbolLayer = () => {
          this.map.addLayer({
            id: layerSymbolId,
            type: 'symbol',
            source: sourceSymbolId,
            layout: {
              'icon-image': 'police-icon',
              'icon-size': 0.07,
              'icon-anchor': 'bottom',
              'text-field': ['get', 'title'],
              'text-offset': [0, 1.2],
              'text-anchor': 'top'
            },
            paint: {
              'text-color': '#0044cc'
            }
          });
        };

        if (!this.map.hasImage('police-icon')) {
          this.map.loadImage('police-station.png', (err, image) => {
            if (!err && image) {
              this.map.addImage('police-icon', image);
              addSymbolLayer();
            }
          });
        } else {
          addSymbolLayer();
        }
      });
    });

    // Optionally fly to the first station
    this.map.flyTo({ center: this.policeStations[0], zoom: 13 });
  }



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
    this.policeModeEnabled = false; // ← reset flag
    if (this.currentHeatmap !== type) {
      this.currentHeatmap = type;
      this.showCategoryLegend = type === 'category';
      this.showSecurityLegend = type === 'security';
      this.loadAndPaintZonesHeatmapByType(type);
    }
  }

  public policeModeEnabled: boolean = false;


  public categoryColorEntries = Object.entries(this.categoryColors).filter(([k]) => k !== 'default');

  public securityColorEntries = [
    { range: '0–0.25', color: '#ffffff' },
    { range: '0.25–0.5', color: '#ffd700' },
    { range: '0.5–1', color: '#ff8c00' },
    { range: '1+', color: '#ff0000' }
  ];


  private drawRouteToHighRiskZone(destination: [number, number]): void {
    const origin: [number, number] = [21.228, 45.748]; // Example: police HQ

    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${origin[0]},${origin[1]};${destination[0]},${destination[1]}?geometries=geojson&access_token=${mapboxgl.accessToken}`;

    this.http.get<any>(url).subscribe(response => {
      const route = response.routes[0].geometry;


      // Remove previous route if exists
      if (this.map.getLayer('route-line-layer')) this.map.removeLayer('route-line-layer');
      if (this.map.getSource('route-line')) this.map.removeSource('route-line');

      this.map.addSource('route-line', {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: route,
          properties: {} // ✅ Required by strict typings
        }
      });



      this.map.addLayer({
        id: 'route-line-layer',
        type: 'line',
        source: 'route-line',
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#ff0000',
          'line-width': 4
        }
      });

      const minutes = Math.round(response.routes[0].duration / 60);
      if (this.policeModeEnabled) {
        new mapboxgl.Popup()
          .setLngLat(destination)
          .setHTML(`<strong>ETA:</strong> ${minutes} min`)
          .addTo(this.map);
      }

    });
  }


  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private matDialog: MatDialog
  ) {}

  ngAfterViewInit(): void {
    // 1) Read “regionName” from URL if provided
    this.regionName = this.activatedRoute.snapshot.queryParamMap.get('regionName');
    this.policeModeEnabled = false;

    // 2) Initialize Mapbox GL
    mapboxgl.accessToken = 'pk.eyJ1IjoiZW1hMTIxIiwiYSI6ImNtYmMycms1djE3azcybHF1d3pvMzM2NHQifQ.1kkI3Uwn4zAER6PYWpMknQ';
    this.map = new mapboxgl.Map({
      container: this.mapContainer.nativeElement,
      style: 'mapbox://styles/mapbox/standard',
      center: [21.23771, 45.75616], // Timișoara center
      zoom: 17,                      // start a bit closer
      pitch: 70,                     // tilt even more (was 60)
      bearing: 45,                   // rotate view to 45° (instead of -17.6)
      antialias: true
    });
    this.map.addControl(new mapboxgl.FullscreenControl(), 'bottom');


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
      maxzoom: 17
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

        if (type === 'security' && this.policeModeEnabled) {
          const topDanger = filteredGeoJson.features
            .filter(f => f.properties?.intensity)
            .sort((a, b) => b.properties!.intensity - a.properties!.intensity)[0];

          if (topDanger) {
            const coords = this.extractLinearRing(topDanger.geometry);
            const center = this.computeCentroid(coords);
            this.drawRouteToHighRiskZone(center);
          }
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
            maxZoom: 17
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
            <p><strong>Categorii:</strong> ${category}</p>
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
