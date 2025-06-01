import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { environment } from '../../../environments/environments';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { FooterComponent } from "../../shared/footer/footer.component";
import { FormsModule } from '@angular/forms';
import { MatFormField, MatInput, MatInputModule } from '@angular/material/input';


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
    MatChipsModule,
    FooterComponent,
    FormsModule,
    MatInputModule,
    MatInput,
    MatFormField
],
  templateUrl: './sesizari.component.html',
  styleUrls: ['./sesizari.component.scss']
})
export class SesizariComponent implements OnInit {
  userData: any[] = [];
  allData: any[] = [];
  role: string | null = null;

  commentText: { [sesizareId: string]: string } = {};

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
  downloadReport(): void {
      const pdfEndpoint = `https://hacktm.onrender.com/report/download`;

      this.http
        .get(pdfEndpoint, { responseType: 'blob' })
        .subscribe({
          next: (blob: Blob) => {
            const url = window.URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = url;
            a.download = 'raport_sesizari.pdf';
            document.body.appendChild(a);
            a.click();

            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
          },
          error: (err) => {
            console.error('Eroare la descărcarea raportului:', err);
            alert('Nu s-a putut descărca raportul. Încearcă din nou.');
          }
        });
  }

  isValidImage(url: any): boolean {
    return !!url && url !== 'string';
  }
  
  onImageError(event: Event): void {
    const target = event.target as HTMLImageElement;
    target.src = 'no-img.svg';
    target.classList.add('fallback-image');
  }

  solveComplaint(sesizareId: string) {
    const url = `${environment.baseApiUrl}update_status/solutionat/${sesizareId}`;

    this.http.put<{ message: string }>(url, {}).subscribe({
      next: (res) => {
        console.log('PUT success:', res.message);

        const listRef = this.role === 'admin' ? this.allData : this.userData;
        const idx = listRef.findIndex(item => item.id === sesizareId);

        if (idx > -1) {
          listRef[idx].status = 'solutionat';
        }
      },
      error: (err) => {
        console.error('Eroare la PUT update_status/solutionat:', err);
        alert('Nu s-a putut actualiza starea sesizării. Încearcă din nou mai târziu.');
      }
    });
  }

  submitComment(sesizareId: string) {
    const text = (this.commentText[sesizareId] || '').trim();

    const url = `${environment.baseApiUrl}send_comment/${sesizareId}`;
    this.http.post<{ message: string }>(url, { comment: text }).subscribe({
      next: (res) => {
        if (res.message && res.message.toLowerCase().includes('comment added')) {
          const listRef = this.role === 'admin' ? this.allData : this.userData;
          const idx = listRef.findIndex(item => item.id === sesizareId);
          if (idx > -1) {
            listRef[idx].comment = text;
          }
          this.commentText[sesizareId] = '';
          window.location.reload(); 
        } else {
          alert('Eroare: nu s-a putut adăuga comentariul.');
        }
      },
      error: (err) => {
        console.error('Eroare la POST send_comment:', err);
        alert('Nu s-a putut salva comentariul. Încearcă din nou mai târziu.');
      }
    });
  }
  
}
