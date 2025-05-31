import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { environment } from '../../../environments/environments';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-sesizari',
  imports: [RouterModule, HttpClientModule, MatCardModule],
  templateUrl: './sesizari.component.html',
  styleUrl: './sesizari.component.scss'
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
            console.log(response);
    });

  }
}
