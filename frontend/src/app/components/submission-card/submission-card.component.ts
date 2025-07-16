import {Component, Input} from '@angular/core';
import {FormatSchoolYearPipe} from '../../pipes/format-school-year/format-school-year.pipe';
import {LinkifyPipe} from '../../pipes/linkify/linkify.pipe';
import {Submission} from '../../models/submission';

@Component({
  selector: 'app-submission-card',
  imports: [],
  templateUrl: './submission-card.component.html',
  styleUrl: './submission-card.component.css'
})
export class SubmissionCardComponent {
  @Input() submission!: Submission;
}
