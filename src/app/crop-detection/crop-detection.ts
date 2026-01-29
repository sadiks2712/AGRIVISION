import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-crop-detection',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './crop-detection.html',
  styleUrls: ['./crop-detection.css']
})
export class CropDetection {

  selectedImage: string | null = null;
  selectedFile: File | null = null;

  isDetecting = false;

  result: {
    cropName: string;
    disease: string;
    confidence: number;
    pesticide: string;
    fertilizer: string;
  } | null = null;

  constructor(private http: HttpClient) {}

  // ----------------------------
  // Image upload (AUTO DETECT)
  // ----------------------------
  onImageUpload(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image');
      return;
    }

    this.selectedFile = file;
    this.result = null;

    const reader = new FileReader();
    reader.onload = () => {
      this.selectedImage = reader.result as string;

      // ✅ AUTO start detection after image loads
      this.detectCrop();
    };

    reader.readAsDataURL(file);
  }

  // ----------------------------
  // REAL ML CALL
  // ----------------------------
  detectCrop(): void {
    if (!this.selectedFile) return;

    this.isDetecting = true;

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.http.post<any>('http://127.0.0.1:8000/predict', formData)
      .subscribe({
        next: (response) => {
          console.log('✅ ML response:', response);

          this.result = {
            cropName: response.crop,
            disease: response.disease,
            confidence: response.confidence,
            pesticide: response.recommendation?.pesticide || 'N/A',
            fertilizer: response.recommendation?.fertilizer || 'N/A'
          };

          this.isDetecting = false;
          this.saveToHistory(this.result);
        },
        error: (err) => {
          console.error('❌ Detection error', err);
          alert('Detection failed. Try again.');
          this.isDetecting = false;
        }
      });
  }

  // ----------------------------
  // Save history
  // ----------------------------
 saveToHistory(result: any): void {
  const history = JSON.parse(
    localStorage.getItem('crop_history') || '[]'
  );

  history.unshift({
    id: Date.now(),
    cropName: result.cropName,
    disease: result.disease,
    confidence: result.confidence,
    date: new Date().toLocaleString()
  });

  localStorage.setItem('crop_history', JSON.stringify(history));

  // ✅ NOTIFY history component
  window.dispatchEvent(new Event('history-updated'));
}
}
