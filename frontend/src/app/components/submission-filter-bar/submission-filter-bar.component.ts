import {Component, inject, OnInit} from '@angular/core';
import {CompetitionService} from '../../services/competition/competition.service';
import {SubmissionService} from '../../services/submission/submission.service';
import {FormatSchoolYearPipe} from '../../pipes/format-school-year/format-school-year.pipe';
import {ProjectService} from '../../services/project/project.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-submission-filter-bar',
  imports: [
    FormatSchoolYearPipe,
    FormsModule
  ],
  templateUrl: './submission-filter-bar.component.html',
  styleUrl: './submission-filter-bar.component.css'
})
export class SubmissionFilterBarComponent implements OnInit{
  competitionService: CompetitionService = inject(CompetitionService);
  submissionService: SubmissionService = inject(SubmissionService);
  projectsService: ProjectService = inject(ProjectService);
  schoolYears: string[] = []
  selectedSchoolYears: string[] = []
  selectedSchoolYear: string = 'all'


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
