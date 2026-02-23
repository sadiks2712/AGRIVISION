import { Injectable } from '@angular/core';
import { Messaging, getToken, onMessage } from '@angular/fire/messaging';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  constructor(private messaging: Messaging) {}

  async requestPermission() {
    const token = await getToken(this.messaging, {
      vapidKey: 'gxONymepgy9DNrN6aAnaJ13QRd2DepHgy-l0OrgtkOE'
    });

    return token;
  } 

  listen() {
    onMessage(this.messaging, (payload) => {
      console.log('Message received:', payload);
      alert(payload.notification?.title);
    });
  }
}
