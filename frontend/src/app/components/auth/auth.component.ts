import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth',
  standalone: true,
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  imports: [FormsModule, CommonModule]
})
export class AuthComponent {
  email: string = '';
  error: string = '';
  submitted: boolean = false;

  login() {
    this.submitted = true;
    this.error = '';
  
    if (!this.email) {
      this.error = 'Câmpul este obligatoriu.';
      return;
    }
  
    // Simulate login
    if (this.email === 'admin') {
      localStorage.setItem('user', JSON.stringify({ id: 'admin', role: 'admin' }));
    } else if (this.email === 'user') {
      localStorage.setItem('user', JSON.stringify({ id: 77, role: 'user' }));
    } else {
      this.error = 'Cont inexistent. Încercați din nou.';
      return;
    }
  
    window.location.href = '/home'; // redirect to home
  }
  
}

