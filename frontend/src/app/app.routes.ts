import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SesizariComponent } from './components/sesizari/sesizari.component';
import { SesizarileMeleComponent } from './components/sesizarile-mele/sesizarile-mele.component';
import { ZoneVizualeComponent } from './components/zone-vizuale/zone-vizuale.component';
import { HomeComponent } from './components/home/home.component';
import { AuthComponent } from './components/auth/auth.component';


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
    path: 'sesizarile-mele',
    component: SesizarileMeleComponent
  },
  {
    path: 'zone-vizuale',
    component: ZoneVizualeComponent
  },
  {
    path: 'autentificare',
    component: AuthComponent
  },

  {
    path: '**',
    redirectTo: 'home'
  },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
],
  exports: [RouterModule]
})
export class AppRoutingModule { }
