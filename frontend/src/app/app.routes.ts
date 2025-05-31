// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent }          from './components/home/home.component';
import { SesizariComponent }      from './components/sesizari/sesizari.component';
import { ZoneVizualeComponent }   from './components/zone-vizuale/zone-vizuale.component';
import { MapHeat3DComponent }     from './map-heat3-d/map-heat3-d';    // or your “pins” version
import { AuthComponent }          from './components/auth/auth.component';

export const routes: Routes = [
  { path: '',          redirectTo: 'home',     pathMatch: 'full' },
  { path: 'home',      component: HomeComponent },
  { path: 'sesizari',  component: SesizariComponent },

  // ←── Here is the “map-heat3d” route, *above* the wildcard
  { path: 'map-heat3d', component: ZoneVizualeComponent },

  // you may still keep /heat-map if you need it:
  { path: 'heat-map',  component: MapHeat3DComponent },

  { path: 'auth',      component: AuthComponent },

  // wildcards must always come last
  { path: '**',        redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
