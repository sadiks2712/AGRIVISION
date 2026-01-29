/* =====================================================
   IMPORTS
===================================================== */
import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

/* =====================================================
   COMPONENT METADATA
===================================================== */
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

/* =====================================================
   COMPONENT CLASS
===================================================== */
export class LoginComponent {

  /* ---------------------------------
     FORM STATE
  ---------------------------------- */
  email: string = '';
  password: string = '';
  isLoggingIn: boolean = false;

  /* ---------------------------------
     OUTPUT EVENTS
  ---------------------------------- */
  @Output() loginSuccess = new EventEmitter<void>();

  /* ---------------------------------
     CONSTRUCTOR
  ---------------------------------- */
  constructor(private authService: AuthService) {}

  /* =====================================================
     AUTH ACTIONS
  ===================================================== */

  // Google Login
  googleLogin(): void {
    if (this.isLoggingIn) return;

    this.isLoggingIn = true;

    this.authService.googleLogin()
      .then(() => this.loginSuccess.emit())
      .catch(err => alert(err.message))
      .finally(() => this.isLoggingIn = false);
  }

  // Email Login
  emailLogin(): void {
    if (!this.email || !this.password) {
      alert('Please enter email and password');
      return;
    }

    this.authService.emailLogin(this.email, this.password)
      .then(() => this.loginSuccess.emit())
      .catch(err => alert(err.message));
  }

  // Email Signup
  emailSignup(): void {
    if (!this.email || !this.password) {
      alert('Please enter email and password');
      return;
    }

    this.authService.emailSignup(this.email, this.password)
      .then(() => alert('Account created successfully'))
      .catch(err => alert(err.message));
  }

  // Forgot Password
  forgotPassword(): void {
    if (!this.email) {
      alert('Please enter your email first');
      return;
    }

    this.authService.resetPassword(this.email)
      .then(() => alert('Password reset email sent'))
      .catch(err => alert(err.message));
  }
}
