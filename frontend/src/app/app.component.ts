// src/app/app.component.ts

import { Component } from '@angular/core';
import { OpenlayersMapComponent } from './openlayers-map/openlayers-map.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [OpenlayersMapComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'] /* or .css */
})
export class AppComponent {
  title = 'frontend';
}
