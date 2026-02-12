import {Component, inject, Input, OnInit} from '@angular/core';
import {KeycloakService} from 'keycloak-angular';
import {ProjectService} from '../../services/project/project.service';
import {Project} from '../../models/project';
import {Image} from '../../models/image';
import {EditProjectComponent} from '../edit-project/edit-project.component';
import {SubmissionService} from '../../services/submission/submission.service';
import {DatePipe} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {KeycloakOperationService} from '../../services/keycloak/keycloak.service';

@Component({
  selector: 'app-submission-project-item',
  imports: [
    EditProjectComponent,
    DatePipe
  ],
  templateUrl: './submission-project-item.component.html',
  styleUrl: './submission-project-item.component.css'
})
export class SubmissionProjectItemComponent implements OnInit {
  keycloakService: KeycloakOperationService = inject(KeycloakOperationService);
  projectService: ProjectService = inject(ProjectService);
  submissionService: SubmissionService = inject(SubmissionService);
  @Input() project!: Project;
  showEditBtn: boolean = false;
  isModalOpen: boolean = false;

  activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  allowedRoles!: string[]  = [];
  userOUs: string[] = [];

  images: Image[] = [];
  isLightboxOpen = false;
  currentImageIndex = 0;
  logoImage?: Image | {url: string, name: string} | null = null;

  selectedProjectForEdit: Project | null = null;

  modalClosed() {
    this.selectedProjectForEdit = null
    this.submissionService.closeEditModalSubject.next(true)

    this.getImagesForProject(this.project.id)
  }


  ngOnInit() {
    this.userOUs = this.keycloakService.getUserOUS()
    this.allowedRoles = this.activatedRoute.snapshot.data['allowedForEdit'] || []

    for (let ou of this.userOUs) {
      for (let role of this.allowedRoles) {
        if (ou == role) {
          this.showEditBtn = true;
        }
      }
    }

    this.getImagesForProject(this.project.id)
  }

  getImagesForProject(projId: number) {
    this.projectService.getImagesForProject(projId).subscribe(images => {
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

  handleBtnEditProject(project: Project) {
    this.selectedProjectForEdit = project
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
