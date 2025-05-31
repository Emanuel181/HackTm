import { Component } from '@angular/core';
import { OpenlayersMapComponent } from "../../shared/openlayers-map/openlayers-map.component";

@Component({
  selector: 'app-home',
  imports: [OpenlayersMapComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
