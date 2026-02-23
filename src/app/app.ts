import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login';
import { NavbarComponent } from './navbar/navbar';
import { Hero } from './hero/hero';
import { CropDetection } from './crop-detection/crop-detection';
import { WeatherAlertComponent } from './weather-alert/weather-alert';
import { CompleteProfileComponent } from './complete-profile/complete-profile';
import { SchemesComponent } from './schemes/schemes';
import { FarmerHistory } from './farmer-history/farmer-history';
import { ComplaintComponent } from './complaint/complaint';

import { Auth } from '@angular/fire/auth';
import { Firestore, doc, docData } from '@angular/fire/firestore';
import { onAuthStateChanged } from 'firebase/auth';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    LoginComponent,
    CompleteProfileComponent,
    NavbarComponent,
    Hero,
    CropDetection,
    SchemesComponent,
    WeatherAlertComponent,
    FarmerHistory,
    ComplaintComponent
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {

  isLoggedIn = false;
  isProfileComplete = false;
  isAuthReady = false; // ✅ IMPORTANT
  activeSection = 'home';

  constructor(
    private auth: Auth,
    private firestore: Firestore
  ) {
    // 🔐 Listen to Firebase auth
    onAuthStateChanged(this.auth, (user) => {

      this.isAuthReady = true; // ✅ allow UI to render
      this.isLoggedIn = !!user;

      if (!user) {
        this.isProfileComplete = false;
        return;
      }

      // 📡 Listen to Firestore user doc
      const userRef = doc(this.firestore, 'users', user.uid);

      docData(userRef).subscribe((userData: any) => {
        this.isProfileComplete = userData?.profileComplete === true;

        console.log(
          '✅ Profile complete from DB:',
          this.isProfileComplete
        );
      });
    });
  }

  // 🔐 Called after login
  onLoginSuccess() {
    this.isLoggedIn = true;
  }

  // ✅ Smooth UI transition after profile save
  onProfileCompleted() {
    console.log('PROFILE COMPLETED RECEIVED');

    // ⭐ optimistic update (instant hero)
    this.isProfileComplete = true;

    this.activeSection = 'home';
  }

  onMenuChange(menu: string) {
    this.activeSection = menu;
  }

  onStartClicked() {
    console.log('🚀 AppComponent: switching to crop section');
    this.activeSection = 'crop';
  }
}
