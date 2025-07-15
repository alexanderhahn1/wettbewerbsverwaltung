import {Component, ElementRef, inject, ViewChild} from '@angular/core';
import {ExportService} from '../../services/export/export.service';
import {CompetitionService} from '../../services/competition/competition.service';
import * as html2pdf from 'html2pdf.js';
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

  exportTest(): void {

    this.competitionService.getAllCompetitions().subscribe(s => {
      this.exportService.exportToExcel(s);
    });
  }

  generatePdf() {
    const options = {
      margin: 0.5,
      filename: 'my-document.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    const content: Element = this.pdfContent.nativeElement;
    html2pdf().from(content).set(options).save();
  }
}
