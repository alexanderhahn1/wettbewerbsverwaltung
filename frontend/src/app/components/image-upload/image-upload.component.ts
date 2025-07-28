import {Component, inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {CompetitionImage} from '../../models/competition-image';
import {NgForOf} from '@angular/common';
import {KeycloakService} from 'keycloak-angular';

@Component({
  selector: 'app-image-upload',
  imports: [
    FormsModule,
    NgForOf
  ],
  templateUrl: './image-upload.component.html',
  styleUrl: './image-upload.component.css'
})
export class ImageUploadComponent {

  keycloakService: KeycloakService = inject(KeycloakService);

  selectedFile: File | null = null;
  images: CompetitionImage[] | null = null;

  constructor(private http: HttpClient) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  getImages(): void {
    this.http.get<CompetitionImage[]>('http://localhost:8080/api/competitions/1/images').subscribe(images => {
      this.images = images;
    })
  }

  upload(): void {
    if (!this.selectedFile) return;

    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('fileName', this.selectedFile.name);
    formData.append('fileContentType', this.selectedFile.type);

    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    const headers = {
      Authorization: `Bearer ${this.keycloakService.getToken()}`
    };

    this.http.post('http://localhost:8080/api/competitions/1/images', formData, {headers}).subscribe({
      next: () => alert('Upload successful!'),
      error: (err) => alert('Upload failed: ' + err.message),
    });
  }

}
