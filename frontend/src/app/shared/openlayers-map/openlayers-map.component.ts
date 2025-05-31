// src/app/openlayers-map/openlayers-map.component.ts

import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef
} from '@angular/core';

import Map from 'ol/Map';
import View from 'ol/View';

import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';

import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';

import GeoJSON from 'ol/format/GeoJSON';

import { fromLonLat } from 'ol/proj';

import Stroke from 'ol/style/Stroke';
import Fill from 'ol/style/Fill';
import Style from 'ol/style/Style';

@Component({
  selector: 'app-openlayers-map',
  templateUrl: './openlayers-map.component.html',
  styleUrls: ['./openlayers-map.component.scss']
})
export class OpenlayersMapComponent implements OnInit, OnDestroy {
  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;
  private map!: Map;

  // ─────────────────────────────────────────────────────────────────
  // Inlined GeoJSON with an added “Timisoara” polygon (approximate bounding box)
  // ─────────────────────────────────────────────────────────────────
  private readonly neighborhoodData: any = {
    "type": "FeatureCollection",
    "features": [
      // ────── Whole-city rectangle for Timișoara ──────
      {
        "type": "Feature",
        "properties": { "name": "Timisoara" },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              // Approximate bounding box corners: 
              // SW: (21.18, 45.73), SE: (21.26, 45.73), 
              // NE: (21.26, 45.78), NW: (21.18, 45.78), back to SW
              [21.11, 45.68],
              [21.32, 45.68],
              [21.32, 45.83],
              [21.11, 45.83],
            ]
          ]
        }
      },

      // ────── Iosefin (dummy data) ──────
      {
        "type": "Feature",
        "properties": { "name": "Iosefin" },
        "geometry": {
          "type": "MultiPolygon",
          "coordinates": [
            [
              [
                [21.20, 45.74],
                [21.20, 45.78],
                [21.13, 45.78],
                [21.13, 45.74],
              ]
            ]
          ]
        }
      },

      // ────── Dacia (dummy triad) ──────
      {
        "type": "Feature",
        "properties": { "name": "Dacia" },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [21.21450, 45.74200],
              [21.21500, 45.74200],
              [21.21450, 45.74200]
            ]
          ]
        }
      },

      // ────── Circumvalatiunii (dummy triad) ──────
      {
        "type": "Feature",
        "properties": { "name": "Circumvalatiunii" },
        "geometry": {
          "type": "MultiPolygon",
          "coordinates": [
            [
              [
                [21.21230, 45.75500],
                [21.21300, 45.75500],
                [21.21230, 45.75500]
              ]
            ]
          ]
        }
      }
    ]
  };
  // ─────────────────────────────────────────────────────────────────

  ngOnInit(): void {
    this.initMap();
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.setTarget(undefined);
    }
  }

  private initMap(): void {
    // 1. Base OSM tile layer
    const osmLayer = new TileLayer({
      source: new OSM()
    });

    // 2. View centered on Timișoara (we’ll fit to data later)
    const view = new View({
      center: fromLonLat([21.2087, 45.7489]),
      zoom: 13
    });

    // 3. Instantiate the map
    this.map = new Map({
      target: this.mapContainer.nativeElement,
      layers: [osmLayer],
      view
    });

    // 4. Add inlined polygons (including the whole‐city rectangle)
    this.addNeighborhoodsFromData();
  }

  private addNeighborhoodsFromData(): void {
    const format = new GeoJSON();

    // ─── Read features, telling OL that raw coords are EPSG:4326 (WGS84)
    const features = format.readFeatures(this.neighborhoodData, {
      dataProjection: 'EPSG:4326',
      featureProjection: 'EPSG:3857'
    });

    console.log('Loaded features count:', features.length);
    features.forEach((feat, i) => {
      console.log(`  Feature[${i}].get('name') =`, feat.get('name'));
    });

    // 5. Create a VectorSource from those features
    const vectorSource = new VectorSource({
      features: features
    });

    // 6. Create a VectorLayer with a style callback based on ‘name’
    const vectorLayer = new VectorLayer({
      source: vectorSource,
      style: (feature) => {
        const name = feature.get('name') as string;
        // a) “Timisoara” whole‐city highlight = translucent yellow
        if (name === 'Timisoara') {
          return new Style({
            stroke: new Stroke({
              color: '#FFFF00', // yellow outline
              width: 3
            }),
            fill: new Fill({
              color: 'rgba(255, 255, 0, 0.3)' // 30% opaque yellow
            })
          });
        }
        // b) Iosefin = orange
        if (name === 'Iosefin') {
            return new Style({
            stroke: new Stroke({
              color: '#FFFF00', // yellow outline
              width: 3
            }),
            fill: new Fill({
              color: 'rgba(255, 255, 0, 0.3)' // 30% opaque yellow
            })
          });
        }
        // c) Dacia = blue
        if (name === 'Dacia') {
          return new Style({
            stroke: new Stroke({ color: '#33A1FF', width: 2 }),
            fill: new Fill({ color: this.hexToRgba('#33A1FF', 0.4) })
          });
        }
        // d) Circumvalatiunii = green
        if (name === 'Circumvalatiunii') {
          return new Style({
            stroke: new Stroke({ color: '#33FF57', width: 2 }),
            fill: new Fill({ color: this.hexToRgba('#33FF57', 0.4) })
          });
        }
        // e) fallback (transparent)
        return new Style({
          stroke: new Stroke({ color: '#000000', width: 1 }),
          fill: new Fill({ color: this.hexToRgba('#000000', 0.1) })
        });
      }
    });

    // 7. Add that layer to the map
    this.map.addLayer(vectorLayer);

    // 8. Fit the view so you see the entire city polygon (and all other features)
    const extent = vectorSource.getExtent();
    this.map.getView().fit(extent, { padding: [50, 50, 50, 50] });
  }

  /**
   * Utility: Convert “#RRGGBB” → “rgba(r,g,b,a)”
   */
  private hexToRgba(hex: string, alpha: number): string {
    const match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!match) {
      return `rgba(0,0,0,${alpha})`;
    }
    const r = parseInt(match[1], 16);
    const g = parseInt(match[2], 16);
    const b = parseInt(match[3], 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
}
