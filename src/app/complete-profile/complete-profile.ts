import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Auth } from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { onAuthStateChanged, User } from 'firebase/auth';

import { MessagingService } from '../services/messaging.service';

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

  // ✅ FIX: remove default language (force user selection)
  language: 'en' | 'hi' | 'mr' | '' = '';

  isLoading = false;
  isNight = false;

  currentUser: User | null = null;

  @Output() profileSaved = new EventEmitter<void>();

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private messagingService: MessagingService
  ) {

    // 🌙 Day / Night Mode
    const hour = new Date().getHours();
    this.isNight = hour >= 19 || hour < 6;

    // 🔐 Auth Listener
    onAuthStateChanged(this.auth, (user) => {
      this.currentUser = user;
    });
  }

 async saveProfile(): Promise<boolean> {

  if (!this.phone || !this.location || !this.language) {
    alert('Please fill all details including language');
    return false; // ❗ IMPORTANT
  }

  if (!this.currentUser) {
    alert('User not logged in');
    return false;
  }

  this.isLoading = true;

  try {

    let token: string | null = null;
    try {
      token = await this.messagingService.requestPermission();
    } catch (e) {
      console.warn('FCM token failed');
    }

    const userRef = doc(this.firestore, 'users', this.currentUser.uid);

    await setDoc(userRef, {
      uid: this.currentUser.uid,
      email: this.currentUser.email,
      phone: this.phone,
      location: this.location,
      language: this.language,
      role: 'farmer',
      profileComplete: true,
      fcmToken: token ?? null,
      createdAt: new Date()
    }, { merge: true });

    alert('Profile Saved Successfully ✅');

    this.profileSaved.emit(); // ✅ only here

    return true;

  } catch (error: any) {
    console.error('Profile Save Error:', error);
    alert(error?.message || 'Failed to save profile');
    return false;
  } finally {
    this.isLoading = false;
  }
}
}