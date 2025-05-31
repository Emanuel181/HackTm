// src/app/shared/navbar/navbar.component.ts
import { CommonModule }   from '@angular/common';
import { Component }      from '@angular/core';
import { NavigationEnd, Router, RouterModule }   from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule }  from '@angular/material/button';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent { 
  isLoggedIn = false;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.checkLogin();
      }
    });
  }

  ngOnInit() {
    this.checkLogin();
  }

  checkLogin() {
    this.isLoggedIn = !!localStorage.getItem('user');
  }

  logout() {
    localStorage.removeItem('user');
    this.checkLogin();
    this.router.navigate(['/home']);
  }
}