import {Component, inject, Input, OnInit} from '@angular/core';
import {Competition} from '../../models/competition';
import {LinkifyPipe} from '../../pipes/linkify/linkify.pipe';
import {FormatSchoolYearPipe} from '../../pipes/format-school-year/format-school-year.pipe';
import {KeycloakService} from 'keycloak-angular';
import {EditCompetitionComponent} from '../edit-competition/edit-competition.component';
import {RouterLink} from '@angular/router';
import {CompetitionImage} from '../../models/competition-image';
import {CompetitionService} from '../../services/competition/competition.service';
import {DatePipe, NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-competition-card',
  imports: [
    LinkifyPipe,
    FormatSchoolYearPipe,
    EditCompetitionComponent,
    RouterLink,
    DatePipe
  ],
  templateUrl: './competition-card.component.html',
  styleUrl: './competition-card.component.css'
})
export class CompetitionCardComponent implements OnInit {
  @Input() competition!: Competition;
  @Input() isEditable!: boolean;
  keycloakService: KeycloakService = inject(KeycloakService);
  competitionService: CompetitionService = inject(CompetitionService);
  showEditImage: boolean = false;
  isModalOpen: boolean = false;
  images: CompetitionImage[] = [];
  isLightboxOpen = false;
  currentImageIndex = 0;
  logoImage?: CompetitionImage | {url: string, name: string} | null = null;

  ngOnInit() {
    if (!this.competition) {
      return;
    }

    if (this.keycloakService.getUserRoles().includes('admin') && this.isEditable) {
      this.showEditImage = true;
    }

    this.competitionService.getImagesForCompetition(this.competition.id).subscribe(images => {
      const foundImage = images.find(curImage => curImage.name.toLowerCase().includes('logo'))
      if (foundImage) {
        this.logoImage = foundImage;
        this.images = images.filter(image => image !== foundImage);
        console.log(this.images);
        console.log(this.logoImage)
      } else {
        this.images = images;
      }
    })
  }

  handleBtnEditCompetition() {
    this.isModalOpen = true;
  }

  openLightbox(index: number): void {
    this.currentImageIndex = index;
    this.isLightboxOpen = true;
  }

  closeLightbox(): void {
    this.isLightboxOpen = false;
  }

  prevImage(): void {
    this.currentImageIndex = (this.currentImageIndex - 1 + this.images.length) % this.images.length;
  }

  nextImage(): void {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
  }
}
