import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  serverTimestamp
} from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class FirestoreService {

  constructor(private firestore: Firestore) {}

  // 🌱 Save crop detection
  saveDetection(data: any) {
    const ref = collection(this.firestore, 'detections');
    return addDoc(ref, {
      ...data,
      createdAt: serverTimestamp()
    });
  }

  // 📝 Save report
  saveReport(message: string, uid: string) {
    const ref = collection(this.firestore, 'reports');
    return addDoc(ref, {
      uid,
      message,
      status: 'pending',
      createdAt: serverTimestamp()
    });
  }
}
