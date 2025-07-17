import {Component, inject, Input, OnInit} from '@angular/core';
import {Submission} from '../../models/submission';
import {EditProjectComponent} from '../edit-project/edit-project.component';
import {KeycloakService} from 'keycloak-angular';

@Component({
  selector: 'app-submission-card',
  imports: [
    EditProjectComponent
  ],
  templateUrl: './submission-card.component.html',
  styleUrl: './submission-card.component.css'
})
export class SubmissionCardComponent implements OnInit{
  @Input() submission!: Submission;
  keycloakService: KeycloakService = inject(KeycloakService);
  isModalOpen: boolean = false;
  showEditImage = false;

  ngOnInit() {
    this.keycloakService.getUserRoles().includes('admin') ? this.showEditImage = true : this.showEditImage = false;
  }

  handleBtnEditProject() {
    this.isModalOpen = true;
  }
}
