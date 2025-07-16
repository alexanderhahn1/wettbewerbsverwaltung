import {Component, ElementRef, inject, ViewChild} from '@angular/core';
import {ExportService} from '../../services/export/export.service';
import {CompetitionService} from '../../services/competition/competition.service';
import html2pdf from 'html2pdf.js';
import {Competition} from '../../models/competition';

@Component({
  selector: 'app-export',
  imports: [],
  templateUrl: './export.component.html',
  styleUrl: './export.component.css'
})
export class ExportComponent {

  @ViewChild('pdfContent', { static: false }) pdfContent!: ElementRef;
  exportService: ExportService = inject(ExportService);
  competitionService: CompetitionService = inject(CompetitionService);

  generatePowerPoint(): void {
    this.competitionService.getAllCompetitions().subscribe(s => {
      this.exportService.exportToPowerPoint(s);
    });
  }

  exportTest(): void {

    this.competitionService.getAllCompetitions().subscribe(s => {
      this.exportService.exportToExcel(s);
    });

  }

  generatePdf() {
    print();
    //this.exportService.exportToPDF(this.pdfContent.nativeElement);
  }
}
