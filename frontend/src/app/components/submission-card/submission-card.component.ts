import {Component, inject, Input, OnInit} from '@angular/core';
import {Submission} from '../../models/submission';
import {EditProjectComponent} from '../edit-project/edit-project.component';
import {KeycloakService} from 'keycloak-angular';
import {Project} from '../../models/project';
import {SubmissionService} from '../../services/submission/submission.service';
import {DatePipe} from '@angular/common';
import {ProjectService} from '../../services/project/project.service';
import {SubmissionProjectItemComponent} from '../submission-project-item/submission-project-item.component';
import {KeycloakOperationService} from '../../services/keycloak/keycloak.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-submission-card',
  imports: [
    SubmissionProjectItemComponent
  ],
  templateUrl: './submission-card.component.html',
  styleUrl: './submission-card.component.css'
})
export class SubmissionCardComponent {
  @Input() submission!: Submission;
}
