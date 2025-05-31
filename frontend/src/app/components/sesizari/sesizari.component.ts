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
  data: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const userId = '69';
    this.http
      .get<any[]>(`${environment.baseApiUrl}get_sesizari/user_id/${userId}`)
      .subscribe((response) => {
        this.data = response;
        console.log('Fetched sesizari:', response);
      });
  }
}
