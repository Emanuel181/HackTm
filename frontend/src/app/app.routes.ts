// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SesizariComponent } from './components/sesizari/sesizari.component';
import { ZoneVizualeComponent } from './components/zone-vizuale/zone-vizuale.component';
import { HomeComponent } from './components/home/home.component';
import { MapHeat3DComponent } from './map-heat3-d/map-heat3-d';
import {AuthComponent} from './components/auth/auth.component';
import { AuthGuard } from './components/auth/auth.guard';
import {TrafficMapComponent} from './traffic-map/traffic-map.component';
import {PopulationMapComponent} from './density/density.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'population-map',
    component: PopulationMapComponent
  },

  {
    path: 'traffic-map',
    component: TrafficMapComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'sesizari',
    component: SesizariComponent
  },
  {
    path: 'map-heat3d',
    component: ZoneVizualeComponent
  },
  {
    path: 'heat-map',
    component: MapHeat3DComponent
  },
  {
    path: 'auth',
    component: AuthComponent
  },
  {
    path: '**',
    redirectTo: 'home'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
