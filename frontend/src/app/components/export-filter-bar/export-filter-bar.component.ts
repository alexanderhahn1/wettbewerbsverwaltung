import {Component, inject} from '@angular/core';
import { CompetitionService } from '../../services/competition/competition.service';
import {Competition} from '../../models/competition';
import {FormsModule} from '@angular/forms';
import {NgForOf} from '@angular/common';
import {FormatSchoolYearPipe} from '../../pipes/format-school-year/format-school-year.pipe';
import {SubmissionService} from '../../services/submission/submission.service';
import {ProjectService} from '../../services/project/project.service';

@Component({
  selector: 'app-export-filter-bar',
  imports: [
    FormsModule,
    FormatSchoolYearPipe
  ],
  templateUrl: './export-filter-bar.component.html',
  styleUrl: './export-filter-bar.component.css'
})
export class ExportFilterBarComponent {
  competitionService: CompetitionService = inject(CompetitionService);
  schoolYears: string[] = []
  selectedSchoolYear: string = 'all'


  ngOnInit() {
    this.competitionService.getAllSchoolYears().subscribe(
      (schoolYears: string[]) => {
        this.schoolYears = schoolYears;
      }
    )

    this.selectSchoolYear('')
  }

  selectSchoolYear(schoolYear: string) {
    this.competitionService.selectedExportSchoolYear.next(schoolYear)
  }
}
