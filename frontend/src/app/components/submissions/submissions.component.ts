import {Component, inject, OnInit} from '@angular/core';
import {CompetitionCardComponent} from "../competition-card/competition-card.component";
import {CompetitionSearchBarComponent} from "../competition-search-bar/competition-search-bar.component";
import {SubmissionCardComponent} from '../submission-card/submission-card.component';
import {Submission} from '../../models/submission';
import {SubmissionService} from '../../services/submission/submission.service';

@Component({
  selector: 'app-submissions',
  imports: [
    CompetitionCardComponent,
    CompetitionSearchBarComponent,
    SubmissionCardComponent
  ],
  templateUrl: './submissions.component.html',
  styleUrl: './submissions.component.css'
})
export class SubmissionsComponent implements OnInit{
  submissionService: SubmissionService = inject(SubmissionService);
  submissions: Submission[] = [];

  ngOnInit() {
    this.submissionService.getAllSubmissions().subscribe(
      (submissions: Submission[]) => {
        this.submissions = submissions;
        console.log(this.submissions);
      }
    )
  }
}
