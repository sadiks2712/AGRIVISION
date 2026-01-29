import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class NavbarComponent {

  @Output() menuSelected = new EventEmitter<string>();

  selectMenu(menu: string) {
    this.menuSelected.emit(menu);
  }
}
