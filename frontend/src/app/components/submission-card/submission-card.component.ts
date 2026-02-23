import {Component, Input} from '@angular/core';
import {Submission} from '../../models/submission';

import {SubmissionProjectItemComponent} from '../submission-project-item/submission-project-item.component';

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
