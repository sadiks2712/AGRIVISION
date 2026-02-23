import { Component, EventEmitter, Output } from '@angular/core';
import { Auth, signOut } from '@angular/fire/auth';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class NavbarComponent {

  isMenuOpen = false;

  @Output() menuSelected = new EventEmitter<string>();
  @Output() loggedOut = new EventEmitter<void>(); // ✅ NEW

  constructor(private auth: Auth) {}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  selectMenu(menu: string) {
    this.menuSelected.emit(menu);
    this.isMenuOpen = false; // ✅ close mobile menu
  }

  async logout() {
    await signOut(this.auth);
    this.loggedOut.emit(); // notify parent
    this.isMenuOpen = false;
  }
}
