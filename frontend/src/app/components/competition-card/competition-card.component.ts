import {Component, inject, Input, OnInit} from '@angular/core';
import {Competition} from '../../models/competition';
import {LinkifyPipe} from '../../pipes/linkify/linkify.pipe';
import {FormatSchoolYearPipe} from '../../pipes/format-school-year/format-school-year.pipe';
import {EditCompetitionComponent} from '../edit-competition/edit-competition.component';
import {ActivatedRoute, ActivatedRouteSnapshot, RouterLink} from '@angular/router';
import {Image} from '../../models/image';
import {CompetitionService} from '../../services/competition/competition.service';
import {DatePipe, NgOptimizedImage} from '@angular/common';
import {KeycloakOperationService} from '../../services/keycloak/keycloak.service';

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
  keycloakService: KeycloakOperationService = inject(KeycloakOperationService);
  competitionService: CompetitionService = inject(CompetitionService);
  activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  showEditImage: boolean = false;
  isModalOpen: boolean = false;
  images: Image[] = [];
  isLightboxOpen = false;
  currentImageIndex = 0;
  logoImage?: Image | {url: string, name: string} | null = null;
  allowedRoles!: string[] = [];
  userOUs: string[] = [];

  ngOnInit() {
    this.userOUs = this.keycloakService.getUserOUS()
    this.allowedRoles = this.activatedRoute.snapshot.data['allowedForEdit'] || [];

    for (let ou of this.userOUs) {
      for (let role of this.allowedRoles) {
        if (ou == role) {
          this.showEditImage = true;
        }
      }
    }

    this.getImagesForCompetition(this.competition.id)
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

  modalClosed() {
    this.isModalOpen = false;
    this.getImagesForCompetition(this.competition.id)
  }

  getImagesForCompetition(compId: number) {
    this.competitionService.getImagesForCompetition(compId).subscribe(images => {
      const foundImage = images.find(curImage => curImage.name.toLowerCase().includes('logo'))
      if (foundImage) {
        this.logoImage = foundImage;
        this.images = images.filter(image => image !== foundImage);
        //console.log(this.images);
        //console.log(this.logoImage)
      } else {
        this.images = images;
      }
    })
  }
}
