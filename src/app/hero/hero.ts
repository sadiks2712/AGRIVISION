import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.html',
  styleUrls: ['./hero.css']
})
export class Hero {

  // 🔔 Event to notify AppComponent
  @Output() startClicked = new EventEmitter<void>();
  isNight = false;
  constructor(private viewportScroller: ViewportScroller) {}

  // 🟢 Get Started → Crop Detection
  goToCropDetection() {
    console.log('🔥 Hero: Get Started clicked'); // DEBUG
    this.startClicked.emit();
  }

  // 🔵 Learn More → Scroll to Features
  goToFeatures() {
    console.log('🔵 Hero: Learn More clicked'); // DEBUG
    this.viewportScroller.scrollToAnchor('features');
  }
}
