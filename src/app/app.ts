import { Component, OnInit } from '@angular/core';
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

import { Auth, authState } from '@angular/fire/auth';
import { Firestore, doc, docData } from '@angular/fire/firestore';
import { MessagingService } from './services/messaging.service';
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
export class App implements OnInit {

  isLoggedIn = false;
  isProfileComplete = false;
  isAuthReady = false;
  activeSection = 'home';

  constructor(
    private auth: Auth,
    private firestore: Firestore,
   private messagingService: MessagingService
  ) {}

  ngOnInit() {

    // ✅ Safe auth listener (Angular-friendly)
    authState(this.auth).subscribe(user => {

      this.isAuthReady = true;
      this.isLoggedIn = !!user;

      if (!user) {
        this.isProfileComplete = false;
        return;
      }

      // ✅ Request FCM permission AFTER login
      this.messagingService.requestPermission();
      this.messagingService.listen();

      // 📡 Listen to Firestore user doc
      const userRef = doc(this.firestore, 'users', user.uid);

      docData(userRef).subscribe({
        next: (userData: any) => {
          this.isProfileComplete =
            userData?.profileComplete === true;

          console.log(
            '✅ Profile complete from DB:',
            this.isProfileComplete
          );
        },
        error: err => console.error('Firestore error:', err)
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