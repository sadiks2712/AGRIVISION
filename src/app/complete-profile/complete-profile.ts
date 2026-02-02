import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Auth } from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { onAuthStateChanged, User } from 'firebase/auth';

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
  isNight = false;

  private currentUser: User | null = null;

  @Output() profileSaved = new EventEmitter<void>();

  constructor(
    private auth: Auth,
    private firestore: Firestore
  ) {
    // 🌙 Day / Night UI
    const hour = new Date().getHours();
    this.isNight = hour >= 19 || hour < 6;

    // 🔐 WAIT FOR AUTH STATE (IMPORTANT)
    onAuthStateChanged(this.auth, user => {
      if (user) {
        this.currentUser = user;
        console.log('✅ Auth ready:', user.uid);
      } else {
        this.currentUser = null;
        console.warn('❌ No user logged in');
      }
    });
  }

  async saveProfile() {
    console.log('SAVE BUTTON CLICKED');

    if (!this.phone || !this.location) {
      alert('Please fill all details');
      return;
    }

    if (!this.currentUser) {
      alert('User not logged in');
      return;
    }

    this.isLoading = true;

    try {
      await setDoc(
        doc(this.firestore, 'users', this.currentUser.uid),
        {
          uid: this.currentUser.uid,
          email: this.currentUser.email,
          phone: this.phone,
          location: this.location,
          language: this.language,
          createdAt: new Date()
        },
        { merge: true }
      );

      console.log('✅ PROFILE SAVED TO FIRESTORE');
      this.profileSaved.emit();

    } catch (error: any) {
      console.error('❌ SAVE PROFILE ERROR:', error);
      alert(error.message || 'Failed to save profile');

    } finally {
      this.isLoading = false;
    }
  }
}
