import { ApplicationConfig } from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideMessaging, getMessaging } from '@angular/fire/messaging'; // ✅ ADD THIS

import { environment } from '../environments/environments';

export const appConfig: ApplicationConfig = {
  providers: [

    // 🌐 HTTP CLIENT
    provideHttpClient(withFetch()),

    // 🔥 Firebase App
    provideFirebaseApp(() =>
      initializeApp(environment.firebase)
    ),

    // 🔐 Firebase Auth
    provideAuth(() => getAuth()),

    // 🗄️ Firestore
    provideFirestore(() => getFirestore()),

    // 📲 Firebase Cloud Messaging (NEW)
    provideMessaging(() => getMessaging()),

  ],
};
