import {Component, inject, Input, OnInit} from '@angular/core';
import {Submission} from '../../models/submission';
import {EditProjectComponent} from '../edit-project/edit-project.component';
import {KeycloakService} from 'keycloak-angular';
import {Project} from '../../models/project';
import {SubmissionService} from '../../services/submission/submission.service';

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
  submissionService: SubmissionService = inject(SubmissionService);
  isModalOpen: boolean = false;
  showEditImage = false;
  selectedProjectForEdit: Project | null = null;

  ngOnInit() {
    this.keycloakService.getUserRoles().includes('admin') ? this.showEditImage = true : this.showEditImage = false;
  }

  handleBtnEditProject(project: Project) {
    this.selectedProjectForEdit = project
    this.isModalOpen = true;
  }

  closeEditModal() {
    this.selectedProjectForEdit = null
    this.submissionService.closeEditModalSubject.next(true)
  }
}
