import {Component, ElementRef, inject, Input, OnInit, ViewChild} from '@angular/core';
import {ExportService} from '../../services/export/export.service';
import {CompetitionService} from '../../services/competition/competition.service';
import {Competition} from '../../models/competition';
import {combineLatest, Observable} from 'rxjs';
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
  filteredCompetitions: Competition[] = [];

  ngOnInit() {
    combineLatest([
      this.competitionService.getAllCompetitions(),
      this.competitionService.selectedExportSchoolYear
    ]).pipe(
      map(([competitions, year]) =>
        year ? competitions.filter(c => c.school_year === year) : competitions
      )
    ).subscribe(filtered => {
      this.filteredCompetitions = filtered;
    });
  }

  generatePowerPoint(): void {
    this.exportService.exportToPowerPoint(this.filteredCompetitions);
  }

  generateExcel(): void {
    this.exportService.exportToExcel(this.filteredCompetitions);
  }


  generateDocx() {
    this.exportService.exportToWord(this.filteredCompetitions);
  }

  generatePowerPointWithSubmissions() {
    console.log(`generatePowerPointWithSubmissions`);
  }
}
