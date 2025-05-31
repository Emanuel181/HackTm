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
  password: string = '';
  error: string = '';
  submitted: boolean = false;

  login() {
    this.submitted = true;
    this.error = '';

    if (!this.email || !this.password) {
      this.error = 'Both fields are required.';
      return;
    }

    // Simulate login
    if (this.email === 'admin@example.com' && this.password === 'admin123') {
      console.log('Login successful!');
      alert('Login successful!');
    } else {
      this.error = 'Invalid credentials.';
    }
  }
}

