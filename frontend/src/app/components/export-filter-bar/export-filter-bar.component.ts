import {Component, inject} from '@angular/core';
import { CompetitionService } from '../../services/competition/competition.service';
import {FormsModule} from '@angular/forms';
import {FormatSchoolYearPipe} from '../../pipes/format-school-year/format-school-year.pipe';

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
    this.selectSchoolYear('')
    this.competitionService.getAllSchoolYears().subscribe(
      (schoolYears: string[]) => {
        this.schoolYears = schoolYears;
      }
    )
  }

  selectSchoolYear(schoolYear: string) {
    this.competitionService.selectedExportSchoolYear.next(schoolYear)
  }
}
