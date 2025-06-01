// src/app/components/zone-vizuale/zone-vizuale.component.ts

import { Component } from '@angular/core';
import {MapHeat3DComponent} from '../../heatmap3d_v2/heatmap3d.component';

@Component({
  selector: 'app-zone-vizuale',
  templateUrl: './zone-vizuale.component.html',
  imports: [
    MapHeat3DComponent
  ],

  styleUrls: ['./zone-vizuale.component.scss']
})
export class ZoneVizualeComponent {
  // This is just a “wrapper”—all the work happens in <app-heatmap3d_v2>.
}
