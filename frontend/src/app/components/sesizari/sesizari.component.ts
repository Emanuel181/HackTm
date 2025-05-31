import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { OpenlayersMapComponent } from "../../shared/openlayers-map/openlayers-map.component";

@Component({
  selector: 'app-sesizari',
  imports: [RouterModule, NavbarComponent, OpenlayersMapComponent],
  templateUrl: './sesizari.component.html',
  styleUrl: './sesizari.component.scss'
})
export class SesizariComponent {

}
