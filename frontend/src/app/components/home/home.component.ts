import { Component } from '@angular/core';
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

  data: any;

  constructor(http: HttpClient) {
    http.get('https://hacktm.onrender.com/api/get_sesizari/all').subscribe(data => {
      this.data = data;
      console.log(data);
    });
  }
}
