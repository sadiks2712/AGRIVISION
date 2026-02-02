import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; // ✅ REQUIRED
import { LoginComponent } from './login/login';
import { NavbarComponent } from './navbar/navbar';
import { Hero } from './hero/hero';
import { CropDetection } from './crop-detection/crop-detection';
import { WeatherAlertComponent } from './weather-alert/weather-alert';
import { CompleteProfileComponent } from './complete-profile/complete-profile';
import { SchemesComponent } from './schemes/schemes';
import { FarmerHistory } from './farmer-history/farmer-history';
import { ComplaintComponent } from './complaint/complaint';

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
  activeSection = 'home';

  onLoginSuccess() {
    this.isLoggedIn = true;
  }

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
