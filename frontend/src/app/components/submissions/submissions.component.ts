import {Component, inject, OnInit} from '@angular/core';
import {CompetitionCardComponent} from "../competition-card/competition-card.component";
import {CompetitionSearchBarComponent} from "../competition-search-bar/competition-search-bar.component";
import {SubmissionCardComponent} from '../submission-card/submission-card.component';
import {Submission} from '../../models/submission';
import {SubmissionService} from '../../services/submission/submission.service';
import {SubmissionFilterBarComponent} from '../submission-filter-bar/submission-filter-bar.component';
import {filter} from 'rxjs';
import {ProjectService} from '../../services/project/project.service';

@Component({
  selector: 'app-submissions',
  imports: [
    SubmissionCardComponent,
    SubmissionFilterBarComponent
  ],
  templateUrl: './submissions.component.html',
  styleUrl: './submissions.component.css'
})
export class SubmissionsComponent implements OnInit{
  submissionService: SubmissionService = inject(SubmissionService);
  projectService: ProjectService = inject(ProjectService)
  submissions: Submission[] = [];

  ngOnInit() {
    this.getAllSubmissions()

    this.submissionService.filterSubmissionsSubject.subscribe(
      (year) => {
        if (year) {
          this.getYearsSubmission(year);
        } else {
          this.getAllSubmissions()
        }
      }
    )

    this.projectService.refreshProjectList.subscribe(
      refresh => {
        this.getAllSubmissions()
      }
    )
  }

  getAllSubmissions() {
    this.submissionService.getAllSubmissions().subscribe(
      (submissions: Submission[]) => {
        this.submissions = submissions.sort((a, b) => a.name.localeCompare(b.name));
        //console.log(submissions);
      }
    )
  }

  getYearsSubmission(year: string) {
    this.submissionService.getAllSubmissions().subscribe(
      (submissions: Submission[]) => {
        this.submissions = submissions.filter(submission => submission.school_year === year);
      }
    )
  }
}
