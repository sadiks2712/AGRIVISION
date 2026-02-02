import { ApplicationConfig } from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

import { environment } from '../environments/environments'; // ✅ FIXED

export const appConfig: ApplicationConfig = {
  providers: [

    // 🌐 HTTP CLIENT (Weather, ML, external APIs)
    provideHttpClient(
      withFetch()
    ),

    // 🔥 Firebase App Initialization
    provideFirebaseApp(() =>
      initializeApp(environment.firebase)
    ),

    // 🔐 Firebase Authentication
    provideAuth(() => getAuth()),

    // 🗄️ Firestore Database (NEW)
    provideFirestore(() => getFirestore()),

  ],
};
