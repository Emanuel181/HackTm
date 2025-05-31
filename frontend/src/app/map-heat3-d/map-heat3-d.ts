import {
  Component,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  ViewChild
} from '@angular/core';
import mapboxgl from 'mapbox-gl';
import { FeatureCollection, Polygon } from 'geojson';

interface ZoneProperties {
  name: string;
  intensity: number;
  description: string;
}

const polygonGeoJson: FeatureCollection<Polygon, ZoneProperties> = {
  type: 'FeatureCollection',
  features: [
    {
      id: 1,
      type: 'Feature',
      properties: {
        name: 'Zone A',
        intensity: 8,
        description: 'High activity: student events and traffic.'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [21.2205, 45.749],
          [21.2235, 45.749],
          [21.2235, 45.7515],
          [21.2205, 45.7515],
          [21.2205, 45.749]
        ]]
      }
    },
    {
      id: 2,
      type: 'Feature',
      properties: {
        name: 'Zone B',
        intensity: 3,
        description: 'Low density area with minimal activity.'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [21.224, 45.7485],
          [21.2265, 45.7485],
          [21.2265, 45.7508],
          [21.224, 45.7508],
          [21.224, 45.7485]
        ]]
      }
    }
  ]
};

@Component({
  selector: 'app-map-heat3d',
  templateUrl: 'map-heat3-d.html',
  styleUrls: ['map-heat3-d.scss']
})
export class MapHeat3DComponent implements AfterViewInit, OnDestroy {
  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;
  map!: mapboxgl.Map;
  popup?: mapboxgl.Popup;

  ngAfterViewInit(): void {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZW1hMTIxIiwiYSI6ImNtYmMycms1djE3azcybHF1d3pvMzM2NHQifQ.1kkI3Uwn4zAER6PYWpMknQ';

    this.map = new mapboxgl.Map({
      container: this.mapContainer.nativeElement,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [21.2225, 45.7502],
      zoom: 15,
      pitch: 60,
      bearing: -17.6,
      antialias: true
    });

    this.map.on('load', () => {
      this.map.addSource('mapbox-dem', {
        type: 'raster-dem',
        url: 'mapbox://mapbox.terrain-rgb',
        tileSize: 512,
        maxzoom: 14
      });

      this.map.setTerrain({ source: 'mapbox-dem', exaggeration: 1.5 });

      this.map.addLayer({
        id: 'sky',
        type: 'sky',
        paint: {
          'sky-type': 'atmosphere',
          'sky-atmosphere-sun': [0, 0],
          'sky-atmosphere-sun-intensity': 15
        }
      });

      this.map.addLayer({
        id: '3d-buildings',
        source: 'composite',
        'source-layer': 'building',
        type: 'fill-extrusion',
        paint: {
          'fill-extrusion-color': '#aaa',
          'fill-extrusion-height': ['get', 'height'],
          'fill-extrusion-base': ['get', 'min_height'],
          'fill-extrusion-opacity': 0.6
        }
      });

      this.addPolygonHeatmapLayer();
    });
  }

  addPolygonHeatmapLayer() {
    this.map.addSource('timisoara-zones', {
      type: 'geojson',
      data: polygonGeoJson
    });

    this.map.addLayer({
      id: 'zone-heat',
      type: 'fill',
      source: 'timisoara-zones',
      paint: {
        'fill-color': [
          'interpolate', ['linear'], ['get', 'intensity'],
          0, 'rgba(33,102,172,0)',
          2, 'rgb(103,169,207)',
          4, 'rgb(209,229,240)',
          6, 'rgb(253,219,199)',
          8, 'rgb(239,138,98)',
          10, 'rgb(178,24,43)'
        ],
        'fill-opacity': 0.7
      }
    });

    this.map.addLayer({
      id: 'zone-highlight',
      type: 'line',
      source: 'timisoara-zones',
      paint: {
        'line-color': '#ffff00',
        'line-width': [
          'case',
          ['boolean', ['feature-state', 'hover'], false], 3, 0
        ],
        'line-opacity': [
          'case',
          ['boolean', ['feature-state', 'hover'], false], 1, 0
        ],
        'line-blur': [
          'case',
          ['boolean', ['feature-state', 'hover'], false], 4, 0
        ]
      }
    });

    let hoveredId: number | null = null;

    this.map.on('mousemove', 'zone-heat', (e) => {
      const feature = e.features?.[0];
      if (!feature || feature.geometry.type !== 'Polygon') return;

      this.map.getCanvas().style.cursor = 'pointer';

      if (hoveredId !== null) {
        this.map.setFeatureState({ source: 'timisoara-zones', id: hoveredId }, { hover: false });
      }

      hoveredId = feature.id as number;
      this.map.setFeatureState({ source: 'timisoara-zones', id: hoveredId }, { hover: true });

      const name = feature.properties?.['name'] ?? 'Unnamed Zone';
      const description = feature.properties?.['description'] ?? 'No description';

      const coords = feature.geometry.coordinates[0] as [number, number][];

      const center: [number, number] = coords.reduce(
        (acc: [number, number], coord: [number, number]) => [
          acc[0] + coord[0],
          acc[1] + coord[1]
        ],
        [0, 0]
      ).map(c => c / coords.length) as [number, number];

      if (this.popup) this.popup.remove();
      this.popup = new mapboxgl.Popup({ closeButton: false, closeOnClick: false })
        .setLngLat(center)
        .setHTML(`<strong>${name}</strong><br><small>${description}</small>`)
        .addTo(this.map);
    });

    this.map.on('mouseleave', 'zone-heat', () => {
      this.map.getCanvas().style.cursor = '';
      if (hoveredId !== null) {
        this.map.setFeatureState({ source: 'timisoara-zones', id: hoveredId }, { hover: false });
      }
      hoveredId = null;
      if (this.popup) this.popup.remove();
    });
  }

  ngOnDestroy(): void {
    if (this.map) this.map.remove();
  }
}

