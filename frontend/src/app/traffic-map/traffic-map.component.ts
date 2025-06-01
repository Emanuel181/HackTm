// src/app/traffic-map/traffic-map.component.ts

import {
  Component,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  ViewChild,
} from '@angular/core';
import mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-traffic-map',
  templateUrl: './traffic-map.component.html',
  styleUrls: ['./traffic-map.component.scss']
})
export class TrafficMapComponent implements AfterViewInit, OnDestroy {
  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;
  map!: mapboxgl.Map;
  getCongestionDetails(level: string): { label: string; color: string; delay: string } {
    switch (level) {
      case 'low':
        return { label: 'Redus', color: '#2ECC40', delay: '0-2 min' };
      case 'moderate':
        return { label: 'Moderat', color: '#FFDC00', delay: '2-5 min' };
      case 'heavy':
        return { label: 'Intens', color: '#FF851B', delay: '5-10 min' };
      case 'severe':
        return { label: 'Sever', color: '#FF4136', delay: '10+ min' };
      default:
        return { label: 'Necunoscut', color: '#AAAAAA', delay: '?' };
    }
  }


  ngAfterViewInit(): void {
    (mapboxgl as any).accessToken =
      'pk.eyJ1IjoiZW1hMTIxIiwiYSI6ImNtYmMycms1djE3azcybHF1d3pvMzM2NHQifQ.1kkI3Uwn4zAER6PYWpMknQ';

    this.map = new mapboxgl.Map({
      container: this.mapContainer.nativeElement,
      style: 'mapbox://styles/mapbox/standard',
      center: [21.2272, 45.7489], // Timișoara
      zoom: 14,
      pitch: 60,           // tilt the map (0–85)
      bearing: -20         // optional: rotate the map
    });



    this.map.addControl(new mapboxgl.NavigationControl());

    this.map.on('load', () => {
      this.map.addLayer({
        id: 'traffic',
        type: 'line',
        source: {
          type: 'vector',
          url: 'mapbox://mapbox.mapbox-traffic-v1'
        },
        'source-layer': 'traffic',
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': [
            'match',
            ['get', 'congestion'],
            'low', '#2ECC40',
            'moderate', '#FFDC00',
            'heavy', '#FF851B',
            'severe', '#FF4136',
            '#AAAAAA'
          ],
          'line-width': 2
        }
      });

    });


    this.map.on('mousemove', 'traffic', (e) => {
      const feature = e.features?.[0];
      if (feature && feature.properties) {
        const congestion = feature.properties['congestion'] || 'unknown';

        const { label, color, delay } = this.getCongestionDetails(congestion);

        const popup = new mapboxgl.Popup({
          closeButton: false,
          closeOnClick: false,
        })
          .setLngLat(e.lngLat)
          .setHTML(`
        <div style="min-width: 160px;">
          <h4 style="margin: 0 0 5px; color: ${color};">
            🚦 Trafic: ${label}
          </h4>
          <p style="margin: 0;">
            Estimare întârziere: <strong>${delay}</strong>
          </p>
        </div>
      `)
          .addTo(this.map);

        setTimeout(() => popup.remove(), 2500);
      }
    });


  }

  ngOnDestroy(): void {
    if (this.map) this.map.remove();
  }
}
