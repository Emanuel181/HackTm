import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { environment } from '../../../environments/environments';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-sesizari',
  standalone: true,
  imports: [
    RouterModule,
    HttpClientModule,
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule
  ],
  templateUrl: './sesizari.component.html',
  styleUrls: ['./sesizari.component.scss']
})
export class SesizariComponent implements OnInit {
  userData: any[] = [];
  allData: any[] = [];
  role: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {const user = localStorage.getItem('user');

    if (user) {
      const parsed = JSON.parse(user);
      this.role = parsed.role;
  
      if (this.role === 'admin') {
        // Admin: get all complaints
        this.http
          .get<any[]>(`${environment.baseApiUrl}get_sesizari/all`)
          .subscribe((response) => {
            this.allData = response;
          });
      } else if (this.role === 'user') {
        // User: get complaints by their ID
        const userId = parsed.id; // dynamically get the user ID
        this.http
          .get<any[]>(`${environment.baseApiUrl}get_sesizari/user_id/${userId}`)
          .subscribe((response) => {
            this.userData = response;
          });
      }
    } else {
      alert('Autentificare necesară.');
      window.location.href = '/auth';
    }
  } 
}
