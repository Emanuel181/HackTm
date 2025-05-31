import { Component, ViewChild } from '@angular/core';
import { OpenlayersMapComponent } from "../../shared/openlayers-map/openlayers-map.component";
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../../environments/environments';

@Component({
  selector: 'app-home',
  imports: [OpenlayersMapComponent,    
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
  HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
 @ViewChild(OpenlayersMapComponent, { static: true })
  openLayersMap!: OpenlayersMapComponent;

  data: any[] = [];

  constructor(private http: HttpClient) {}

  ngAfterViewInit(): void {
    // 2) Once the view (and thus the map) is initialized, fetch the data
    this.http
      .get<any[]>(environment.baseApiUrl + 'get_sesizari/all')
      .subscribe((response) => {
        this.data = response;

        // 3) Iterate over each item and pass its longitude & latitude to the map
        //    (Assuming each object is like { locatie: { lat: number, lng: number }, ... })
        for (const item of this.data) {
          const lat = item.locatie.lat;
          const lon = item.locatie.lng;
          // call the public method on the map to add a red dot
          this.openLayersMap.addComplaints(lat, lon);
        }
      });
  }
}
