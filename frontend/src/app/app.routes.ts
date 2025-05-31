import { Routes } from '@angular/router';
import { MapHeat3DComponent } from './map-heat3-d/map-heat3-d'; // adjust path as needed

export const routes: Routes = [
  {
    path: 'map/:mode', // dynamic URL segment, e.g., 'heatmap'
    component: MapHeat3DComponent,
  },
  {
    path: '',
    redirectTo: 'map/heatmap',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'map/heatmap',
  },
];
