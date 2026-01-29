import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-complaint',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './complaint.html',
  styleUrls: ['./complaint.css']
})
export class ComplaintComponent {

  name = '';
  category = '';
  message = '';
  imageFile: File | null = null;

  loading = false;
  successMsg = '';
  errorMsg = '';

  constructor(private http: HttpClient) {}

  onFileChange(event: any) {
    this.imageFile = event.target.files[0];
  }

  submitComplaint() {
    if (!this.name || !this.category || !this.message) {
      alert('Please fill all required fields');
      return;
    }

    const formData = new FormData();
    formData.append('name', this.name);
    formData.append('category', this.category);
    formData.append('message', this.message);

    if (this.imageFile) {
      formData.append('image', this.imageFile);
    }

    this.loading = true;
    this.successMsg = '';
    this.errorMsg = '';

    this.http.post('http://127.0.0.1:8000/complaint', formData)
      .subscribe({
        next: () => {
          this.loading = false;
          this.successMsg = '✅ Complaint submitted successfully';

          // Reset form
          this.name = '';
          this.category = '';
          this.message = '';
          this.imageFile = null;
        },
        error: (err) => {
          console.error(err);
          this.loading = false;
          this.errorMsg = '❌ Failed to submit complaint';
        }
      });
  }
}
