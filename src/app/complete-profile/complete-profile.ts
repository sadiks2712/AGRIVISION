import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-complete-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './complete-profile.html',
  styleUrls: ['./complete-profile.css']
})
export class CompleteProfileComponent {

  phone = '';
  location = '';
  language: 'en' | 'hi' | 'mr' = 'en';

  isLoading = false;
  isNight = false; // ✅ ADD THIS

  @Output() profileSaved = new EventEmitter<void>();

  constructor(
    private http: HttpClient,
    private auth: Auth
  ) {
    // 🌙 Auto-detect night mode
    const hour = new Date().getHours();
    this.isNight = hour >= 19 || hour < 6;
  }

  saveProfile() {
    console.log('SAVE BUTTON CLICKED');

    if (!this.phone || !this.location) {
      alert('Please fill all details');
      return;
    }

    const user = this.auth.currentUser;
    if (!user) {
      alert('User not logged in');
      return;
    }

    this.isLoading = true;

    this.http.post('http://127.0.0.1:5001/api/users/save', {
      uid: user.uid,
      email: user.email,
      phone: this.phone,
      location: this.location,
      language: this.language
    }).subscribe({
      next: () => {
        console.log('PROFILE SAVED');
        this.isLoading = false;
        this.profileSaved.emit();
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
        alert('Failed to save profile');
      }
    });
  }
}
