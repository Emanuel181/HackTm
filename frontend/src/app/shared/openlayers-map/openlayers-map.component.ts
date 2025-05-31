// src/app/openlayers-map/openlayers-map.component.ts

import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef
} from '@angular/core';

import { Router } from '@angular/router';

import Map from 'ol/Map';
import View from 'ol/View';

import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';

import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';

import GeoJSON from 'ol/format/GeoJSON';

import { fromLonLat, toLonLat } from 'ol/proj';

import Stroke from 'ol/style/Stroke';
import Fill from 'ol/style/Fill';
import Style from 'ol/style/Style';

import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import CircleStyle from 'ol/style/Circle';

// ← Import the extracted GeoJSON file
import { neighborhoodsGeoJson } from '../../data/neighbours';

@Component({
  selector: 'app-openlayers-map',
  templateUrl: './openlayers-map.component.html',
  styleUrls: ['./openlayers-map.component.scss']
})
export class OpenlayersMapComponent implements OnInit, OnDestroy {
  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;
  private map!: Map;
  private view!: View;



  // We will keep a reference to the neighborhood layer so we can
  // detect clicks specifically on it.
  private neighborhoodLayer!: VectorLayer;

  // Keep track of your “complaint” layer too if you still need it.
  private complaintSource!: VectorSource;
  private complaintLayer!: VectorLayer;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.initMap();
    this.centerOnUserLocation();

    // Listen for single‐clicks and attempt to detect a neighborhood feature
    this.map.on('singleclick', (evt) => {
      // 'forEachFeatureAtPixel' will call the callback for each feature drawn at that pixel.
      // We only care if the feature belongs to our neighborhoodLayer.
      this.map.forEachFeatureAtPixel(evt.pixel, (feature, layer) => {
        if (layer === this.neighborhoodLayer) {
          // We assume each neighborhood feature has a "name" property.
          const clickedName = feature.get('name') as string;
          if (clickedName) {
            // Navigate to /heat-map, passing ?regionName=clickedName
            this.router.navigate(['/heat-map'], {
              queryParams: { regionName: clickedName }
            });
          }
        }
      });
    });

    this.map.on('pointermove', (evt) => {
      let hoveredFeature: Feature | null = null;
    
      this.map.forEachFeatureAtPixel(evt.pixel, (feature, layer) => {
        if (layer === this.complaintLayer) {
          hoveredFeature = feature as Feature;
        }
      });
    
      // Set pointer cursor if hovering a feature
      this.map.getTargetElement().style.cursor = hoveredFeature ? 'pointer' : '';
    
      // Reset all styles first
      this.complaintSource.getFeatures().forEach((f) => {
        f.setStyle(this.defaultComplaintStyle);
      });
    
      // Apply hover style only to hovered feature
      if (hoveredFeature) {
        (hoveredFeature as Feature<Point>).setStyle(this.hoverComplaintStyle);
      }
    }); 
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.setTarget(undefined);
    }
  }

  private initMap(): void {
    // 1. Base OSM tile layer
    const osmLayer = new TileLayer({
      source: new OSM(),
    });

    // 2. View centered on Timișoara (we’ll fit to data later)
    this.view = new View({
      center: fromLonLat([21.23771, 45.75616]),
      zoom: 13,
    });

    // 3. Instantiate the map
    this.map = new Map({
      target: this.mapContainer.nativeElement,
      layers: [osmLayer],
      view: this.view,
    });

    // 4. Add the neighborhood polygons from the imported GeoJSON
    this.addNeighborhoodsFromData();

    // 5. Create an empty VectorSource + VectorLayer for “complaint” markers (if you still need it)
    this.complaintSource = new VectorSource({ features: [] });
    this.complaintLayer = new VectorLayer({
      source: this.complaintSource,
      zIndex: 1000, // sit on top of polygons
    });
    this.map.addLayer(this.complaintLayer);
  }

  private addNeighborhoodsFromData(): void {
    const format = new GeoJSON();

    // Read features (EPSG:4326 → EPSG:3857) from the imported GeoJSON
    const features = format.readFeatures(neighborhoodsGeoJson, {
      dataProjection: 'EPSG:4326',
      featureProjection: 'EPSG:3857'
    });

    // Create a VectorSource from those features
    const vectorSource = new VectorSource({
      features: features
    });

    // Create a VectorLayer with a style callback that assigns each neighborhood its own color
    this.neighborhoodLayer = new VectorLayer({
      source: vectorSource,
      style: (feature) => {
        const name = feature.get('name') as string;

        // Iosefin (bright orange)
        if (name === 'Iosefin') {
          return new Style({
            stroke: new Stroke({ color: '#CC5500', width: 2 }),
            fill: new Fill({ color: this.hexToRgba('#CC5500', 0.1) })
          });
        }

        // Dâmbovița (forest green)
        if (name === 'Dâmbovița') {
          return new Style({
            stroke: new Stroke({ color: '#228B22', width: 2 }),
            fill: new Fill({ color: this.hexToRgba('#228B22', 0.1) })
          });
        }

        // Circumvalațiunii + Dacia (royal blue)
        if (name === 'Circumvalațiunii + Dacia') {
          return new Style({
            stroke: new Stroke({ color: '#1E90FF', width: 2 }),
            fill: new Fill({ color: this.hexToRgba('#1E90FF', 0.1) })
          });
        }

        // Blașcovici (purple)
        if (name === 'Blașcovici') {
          return new Style({
            stroke: new Stroke({ color: '#800080', width: 2 }),
            fill: new Fill({ color: this.hexToRgba('#800080', 0.1) })
          });
        }

        // Mehala (teal)
        if (name === 'Mehala') {
          return new Style({
            stroke: new Stroke({ color: '#008080', width: 2 }),
            fill: new Fill({ color: this.hexToRgba('#008080', 0.1) })
          });
        }

        // Ronaț (sienna)
        if (name === 'Ronaț') {
          return new Style({
            stroke: new Stroke({ color: '#A0522D', width: 2 }),
            fill: new Fill({ color: this.hexToRgba('#A0522D', 0.1) })
          });
        }

        // Aradului (hot pink)
        if (name === 'Aradului') {
          return new Style({
            stroke: new Stroke({ color: '#FF1493', width: 2 }),
            fill: new Fill({ color: this.hexToRgba('#FF1493', 0.1) })
          });
        }

        // Torontalului (lime)
        if (name === 'Torontalului') {
          return new Style({
            stroke: new Stroke({ color: '#32CD32', width: 2 }),
            fill: new Fill({ color: this.hexToRgba('#32CD32', 0.1) })
          });
        }

        // Lipovei (magenta)
        if (name === 'Lipovei') {
          return new Style({
            stroke: new Stroke({ color: '#FF00FF', width: 2 }),
            fill: new Fill({ color: this.hexToRgba('#FF00FF', 0.1) })
          });
        }

        // Tipografilor (goldenrod)
        if (name === 'Tipografilor') {
          return new Style({
            stroke: new Stroke({ color: '#DAA520', width: 2 }),
            fill: new Fill({ color: this.hexToRgba('#DAA520', 0.1) })
          });
        }

        // Bastion (cyan)
        if (name === 'Bastion') {
          return new Style({
            stroke: new Stroke({ color: '#00CED1', width: 2 }),
            fill: new Fill({ color: this.hexToRgba('#00CED1', 0.1) })
          });
        }

        // Elisabetin (coral)
        if (name === 'Elisabetin') {
          return new Style({
            stroke: new Stroke({ color: '#FF7F50', width: 2 }),
            fill: new Fill({ color: this.hexToRgba('#FF7F50', 0.1) })
          });
        }

        // Șagului (navy)
        if (name === 'Șagului') {
          return new Style({
            stroke: new Stroke({ color: '#000080', width: 2 }),
            fill: new Fill({ color: this.hexToRgba('#000080', 0.1) })
          });
        }

        // Girocului (olive)
        if (name === 'Girocului') {
          return new Style({
            stroke: new Stroke({ color: '#808000', width: 2 }),
            fill: new Fill({ color: this.hexToRgba('#808000', 0.1) })
          });
        }

        // Fabric (maroon)
        if (name === 'Fabric') {
          return new Style({
            stroke: new Stroke({ color: '#800000', width: 2 }),
            fill: new Fill({ color: this.hexToRgba('#800000', 0.1) })
          });
        }

        // Olimpia-Stadion (slate gray)
        if (name === 'Olimpia-Stadion') {
          return new Style({
            stroke: new Stroke({ color: '#708090', width: 2 }),
            fill: new Fill({ color: this.hexToRgba('#708090', 0.1) })
          });
        }

        // Soarelui (aqua)
        if (name === 'Soarelui') {
          return new Style({
            stroke: new Stroke({ color: '#00FFFF', width: 2 }),
            fill: new Fill({ color: this.hexToRgba('#00FFFF', 0.1) })
          });
        }

        // Buziașului (chartreuse)
        if (name === 'Buziașului') {
          return new Style({
            stroke: new Stroke({ color: '#7FFF00', width: 2 }),
            fill: new Fill({ color: this.hexToRgba('#7FFF00', 0.1) })
          });
        }

        // Cetate (bright red)
        if (name === 'Cetate') {
          return new Style({
            stroke: new Stroke({ color: '#FF0000', width: 2 }),
            fill: new Fill({ color: this.hexToRgba('#FF0000', 0.1) })
          });
        }



        // Complexul Studențesc (royal blue)
        if (name === 'Complexul Studențesc') {
          return new Style({
            stroke: new Stroke({ color: '#1E90FF', width: 2 }),
            fill: new Fill({ color: this.hexToRgba('#1E90FF', 0.1) })
          });
        }

        // Fallback for anything else (light gray outline + transparent fill)
        return new Style({
          stroke: new Stroke({ color: '#555555', width: 1 }),
          fill: new Fill({ color: this.hexToRgba('#555555', 0.1) })
        });
      }
    });

    // Add that layer to the map
    this.map.addLayer(this.neighborhoodLayer);

    // Fit the view so the entire dataset is visible
    const extent = vectorSource.getExtent();
    this.map.getView().fit(extent, { padding: [50, 50, 50, 50] });
  }

  private centerOnUserLocation(): void {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = 45.75616;
          const longitude = 21.23771;
          const rawCoords = fromLonLat([longitude, latitude]);
          const userCoords3857: number[] = rawCoords;

          // 1) Calculate a pixel-based vertical offset (e.g. 100px)
          //    so that the marker sits lower in the map container.
          const resolution = this.view.getResolution()!;        // meters per pixel
          const pixelShift = -5;                                // “how many pixels down”
          const yOffsetMeters = resolution * pixelShift;        // convert px to map units

          // 2) Build a new center: same X, Y + offset
          const shiftedCenter: [number, number] = [
            userCoords3857[0],
            userCoords3857[1] + yOffsetMeters
          ];

          // 3) Re-center & zoom
          this.view.setCenter(shiftedCenter);
          this.view.setZoom(18);

          // 4) Add the “You are here” marker at the true location
          this.addUserLocationMarker(userCoords3857);
        },
        (error) => {
          console.warn('Geolocation error:', error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000
        }
      );
    } else {
      console.warn('Browser does not support geolocation.');
    }
  }

  private addUserLocationMarker(coord3857: number[]): void {
    // 1. Create a point feature at the user’s location
    const userFeature = new Feature({
      geometry: new Point(coord3857),
      name: 'You are here'
    });

    // 2. Style the feature as a small filled circle with a stroke
    userFeature.setStyle(
      new Style({
        image: new CircleStyle({
          radius: 6,
          fill: new Fill({
            color: 'rgba(0, 120, 220, 0.8)' // semi‐opaque blue
          }),
          stroke: new Stroke({
            color: '#ffffff',
            width: 2
          })
        })
      })
    );

    // 3. Put that in its own vector source/layer so it’s always on top
    const userLocationSource = new VectorSource({
      features: [userFeature]
    });
    const userLocationLayer = new VectorLayer({
      source: userLocationSource,
      zIndex: 999 // ensure it’s drawn above other layers
    });

    this.map.addLayer(userLocationLayer);
  }

  public addComplaints(data: any[]): void {
    for (const item of data) {
      const lat = item.locatie.lat;
      const lon = item.locatie.lng;

      const coord3857 = fromLonLat([lat, lon]);

      const feature = new Feature({
        geometry: new Point(coord3857),
        complaintData: item
      });

    feature.setStyle(this.defaultComplaintStyle);

    // 6) Add it to the complaintSource so it appears on the map
    this.complaintSource.addFeature(feature);
  }
}

private defaultComplaintStyle = new Style({
  image: new CircleStyle({
    radius: 5,
    fill: new Fill({ color: 'rgba(255, 0, 0, 0.8)' }),
    stroke: new Stroke({ color: '#fff', width: 1 }),
  }),
});

private hoverComplaintStyle = new Style({
  image: new CircleStyle({
    radius: 20,
    fill: new Fill({ color: 'rgba(255, 100, 100, 1)' }), // lighter red
  }),
});

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
