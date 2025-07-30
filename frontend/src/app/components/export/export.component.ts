import {Component, ElementRef, inject, Input, OnInit, ViewChild} from '@angular/core';
import {ExportService} from '../../services/export/export.service';
import {CompetitionService} from '../../services/competition/competition.service';
import {Competition} from '../../models/competition';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-export',
  imports: [],
  templateUrl: './export.component.html',
  styleUrl: './export.component.css'
})
export class ExportComponent implements OnInit{
  @ViewChild('pdfContent', { static: false }) pdfContent!: ElementRef;
  exportService: ExportService = inject(ExportService);
  competitionService: CompetitionService = inject(CompetitionService);
  @Input() filter!: Observable<string>;
  selectedExportSchoolYear: string = "";
  filteredCompetitions: Competition[] = [];

  ngOnInit() {
    this.competitionService.selectedExportSchoolYear.subscribe(
      subjectSchoolYear => {
        this.selectedExportSchoolYear = subjectSchoolYear;
      }
    )

    this.competitionService.getAllCompetitions().pipe(
      map(competitions =>
        this.selectedExportSchoolYear
          ? competitions.filter(c => c.school_year === this.selectedExportSchoolYear)
          : competitions
      )
    ).subscribe(filteredCompetitions => {
      this.filteredCompetitions = filteredCompetitions;
    });
  }

  generatePowerPoint(): void {
    this.exportService.exportToPowerPoint(this.filteredCompetitions);
  }

  generatePptxAsPdf(): void {
    //this.exportService.exportToPowerPoint(this.filteredCompetitions);
  }

  generateExcel(): void {
    this.exportService.exportToExcel(this.filteredCompetitions);
  }

  generatePdf() {
    //TODO: als erstes eine power point und daraus dann eine pdf
    print();
    //this.exportService.exportToPDF(this.pdfContent.nativeElement);
  }

}
