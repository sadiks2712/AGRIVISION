import { Injectable } from '@angular/core';
import { Messaging, getToken, onMessage } from '@angular/fire/messaging';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  constructor(private messaging: Messaging) {}

  async requestPermission(): Promise<string | null> {
    try {
      const token = await getToken(this.messaging, {
        vapidKey: 'YOUR_VAPID_KEY'
      });
      return token;
    } catch (error) {
      console.error('FCM error:', error);
      return null;
    }
  }

  listen() {
    onMessage(this.messaging, (payload) => {
      console.log('Push received:', payload);
    });
  }
}
