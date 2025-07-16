import {Component, inject, OnInit} from '@angular/core';
import {CompetitionService} from '../../services/competition/competition.service';
import {SubmissionService} from '../../services/submission/submission.service';
import {FormatSchoolYearPipe} from '../../pipes/format-school-year/format-school-year.pipe';

@Component({
  selector: 'app-submission-filter-bar',
  imports: [
    FormatSchoolYearPipe
  ],
  templateUrl: './submission-filter-bar.component.html',
  styleUrl: './submission-filter-bar.component.css'
})
export class SubmissionFilterBarComponent implements OnInit{
  competitionService: CompetitionService = inject(CompetitionService);
  submissionService: SubmissionService = inject(SubmissionService);
  schoolYears: string[] = []
  selectedSchoolYears: string[] = []


  ngOnInit() {
    this.competitionService.getAllSchoolYears().subscribe(
      (schoolYears: string[]) => {
        this.schoolYears = schoolYears;
      }
    )
  }

  selectSchoolYear(year: string): void {
    this.submissionService.filterSubmissionsSubject.next(year);
  }
}
