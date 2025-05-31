import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SesizariComponent } from './components/sesizari/sesizari.component';
import { ZoneVizualeComponent } from './components/zone-vizuale/zone-vizuale.component';
import { HomeComponent } from './components/home/home.component';
import { MapHeat3DComponent } from './map-heat3-d/map-heat3-d';
import {AuthComponent} from './components/auth/auth.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
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
    path: 'zone-vizuale',
    component: ZoneVizualeComponent
  },
  {
    path: 'heat-map',
    component: MapHeat3DComponent
  },
  {
    path: '**',
    redirectTo: 'home'
  },
  {
    path: 'auth',
    component: AuthComponent
  }
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
],
  exports: [RouterModule]
})
export class AppRoutingModule { }
