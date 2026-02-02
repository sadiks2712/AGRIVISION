import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {

  email = '';
  password = '';

  @Output() loginSuccess = new EventEmitter<void>(); // ✅ ADD THIS

  constructor(private authService: AuthService) {}

  googleLogin() {
    this.authService.googleLogin()
      .then(() => {
        alert('Login successful');
        this.loginSuccess.emit();   // ✅ EMIT EVENT
      })
      .catch((err: any) => alert(err.message));
  }

  emailLogin() {
    this.authService.emailLogin(this.email, this.password)
      .then(() => {
        alert('Login successful');
        this.loginSuccess.emit();   // ✅ EMIT EVENT
      })
      .catch((err: any) => alert(err.message));
  }
  
  forgotPassword() {
    console.log('Forgot password clicked');
  }
}
