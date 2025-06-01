import {
  Component,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ElementRef,
} from '@angular/core';
import mapboxgl, { Map, Popup, LngLatLike } from 'mapbox-gl';

@Component({
  selector: 'app-population-map',
  templateUrl: './density.component.html',
  styleUrls: ['./density.component.scss'],
})
export class PopulationMapComponent implements AfterViewInit, OnDestroy {
  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;
  map!: Map;
  popup: Popup | null = null;

  ngAfterViewInit(): void {
    (mapboxgl as any).accessToken =
      'pk.eyJ1IjoiZW1hMTIxIiwiYSI6ImNtYmMycms1djE3azcybHF1d3pvMzM2NHQifQ.1kkI3Uwn4zAER6PYWpMknQ';

    this.map = new mapboxgl.Map({
      container: this.mapContainer.nativeElement,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [21.2272, 45.7489],
      zoom: 12,
      attributionControl: false,
    });

    // Controls
    this.map.addControl(new mapboxgl.NavigationControl(), 'top-right');
    this.map.addControl(new mapboxgl.ScaleControl({ maxWidth: 80 }), 'bottom-right');
    this.map.addControl(new mapboxgl.AttributionControl({ compact: true }));

    this.map.on('load', () => {
      console.log('🗺️ Map loaded');

      this.map.addSource('population', {
        type: 'geojson',
        data: 'timisoara.geojson',
      });

      this.map.addLayer({
        id: 'population-heatmap',
        type: 'heatmap',
        source: 'population',
        maxzoom: 15,
        paint: {
          'heatmap-weight': [
            'interpolate',
            ['linear'],
            ['get', 'density'],
            0, 0,
            3000, 1,
          ],
          'heatmap-intensity': 1.2,
          'heatmap-radius': 30,
          'heatmap-opacity': 0.85,
          'heatmap-color': [
            'interpolate',
            ['linear'],
            ['heatmap-density'],
            0, 'rgba(33,102,172,0)',
            0.2, 'royalblue',
            0.4, 'cyan',
            0.6, 'lime',
            0.8, 'yellow',
            1, 'red',
          ],
        },
      });

      this.map.addLayer({
        id: 'population-point',
        type: 'circle',
        source: 'population',
        minzoom: 14,
        paint: {
          'circle-radius': 6,
          'circle-color': 'red',
          'circle-opacity': 0.6,
        },
      });

      // Tooltip on hover
      this.map.on('mouseenter', 'population-point', (e) => {
        const feature = e.features?.[0];
        if (
          feature?.geometry.type === 'Point' &&
          Array.isArray(feature.geometry.coordinates)
        ) {
          const coords = feature.geometry.coordinates as [number, number];
          const density = feature.properties?.['density'];

          if (typeof density === 'number') {
            this.popup = new mapboxgl.Popup({ closeButton: false })
              .setLngLat(coords as LngLatLike)
              .setHTML(`<strong>Densitate:</strong> ${density}`)
              .addTo(this.map);
          }
        }
      });

      this.map.on('mouseleave', 'population-point', () => {
        this.popup?.remove();
        this.popup = null;
      });
    });
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }
}
