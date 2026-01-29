import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface CropHistory {
  id: number;
  cropName: string;
  disease: string;
  confidence: number;
  date: string;
}

@Component({
  selector: 'app-farmer-history',
  standalone: true,          // ✅ REQUIRED
  imports: [CommonModule],   // ✅ REQUIRED
  templateUrl: './farmer-history.html',
  styleUrls: ['./farmer-history.css']
})
export class FarmerHistory implements OnInit, OnDestroy {

  history: CropHistory[] = [];

  private onHistoryUpdate = () => {
    this.loadHistory();
  };

  ngOnInit(): void {
    this.loadHistory();
    window.addEventListener('history-updated', this.onHistoryUpdate);
  }

  ngOnDestroy(): void {
    window.removeEventListener('history-updated', this.onHistoryUpdate);
  }

  loadHistory(): void {
    const data = localStorage.getItem('crop_history');
    this.history = data ? JSON.parse(data) : [];
  }

  removeHistory(id: number): void {
    this.history = this.history.filter(item => item.id !== id);
    localStorage.setItem('crop_history', JSON.stringify(this.history));
  }

  clearAllHistory(): void {
    if (confirm('Clear all history?')) {
      this.history = [];
      localStorage.removeItem('crop_history');
    }
  }

  trackById(index: number, item: CropHistory): number {
    return item.id;
  }
}
