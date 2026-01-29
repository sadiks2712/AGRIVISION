import { ApplicationConfig } from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';

import { environment } from '../environments/environments';

export const appConfig: ApplicationConfig = {
  providers: [

    // 🌐 HTTP CLIENT (API calls, Weather, ML, SMS backend)
    provideHttpClient(
      withFetch() // ✅ better compatibility & performance
    ),

    // 🔥 Firebase App Initialization
    provideFirebaseApp(() =>
      initializeApp(environment.firebase)
    ),

    // 🔐 Firebase Authentication
    provideAuth(() => getAuth()),

  ],
  
};

