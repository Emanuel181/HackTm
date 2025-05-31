import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SesizariComponent } from './components/sesizari/sesizari.component';
import { SesizarileMeleComponent } from './components/sesizarile-mele/sesizarile-mele.component';
import { ZoneVizualeComponent } from './components/zone-vizuale/zone-vizuale.component';

export const routes: Routes = [
    { 
        path: '', 
        redirectTo: '/sesizari', 
        pathMatch: 'full' },
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
    }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
],
  exports: [RouterModule]
})
export class AppRoutingModule { }