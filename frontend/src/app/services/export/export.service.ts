import {inject, Injectable} from '@angular/core';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Competition } from '../../models/competition';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import html2pdf from 'html2pdf.js';
import PptxGenJS from 'pptxgenjs';
import Slide = PptxGenJS.Slide;

import { forkJoin } from 'rxjs';
import {CompetitionService} from '../competition/competition.service';

@Injectable({
  providedIn: 'root'
})
export class ExportService {
  competitionService: CompetitionService = inject(CompetitionService)

  exportToPowerPoint(data: Competition[]): void {
    const pptx = new PptxGenJS();

    if (data == null) {
      return;
    }

    const imageRequests = data.map(comp => this.competitionService.getImagesForCompetition(comp.id));
    forkJoin(imageRequests).subscribe(imagesArrays => {
      data.forEach((competition, index) => {
        const images = imagesArrays[index] || [];
        const slide = pptx.addSlide();

        // ✅ Logo (oben rechts)
        slide.addImage({
          path: './htllogo_2022_black_v2.png',
          x: 5.5,
          y: 0.1,
          w: 4.4248,
          h: 1.0,
        });

        // Titel
        slide.addText(competition.name, {
          x: 0.5,
          y: 0.5,
          w: '50%',
          fontSize: 28,
          bold: true,
          color: '003366',
        });

        // Details-Box
        const details = [
          `📅 Einreichungsfrist: ${competition.deadline}`,
          `🎁 Preis: ${competition.prize}`,
          `📬 Kontakt: ${competition.contact}`,
          `📚 Informations Material: ${competition.information_material}`,
          `📝 Einreichungsformulare: ${competition.submission_forms}`,
          `🔗 Link: ${competition.link}`,
          `📆 Schuljahr: ${competition.school_year}`
        ].join('\n');

        slide.addText(details, {
          x: 0.5,
          y: 1.5,
          w: 4,
          h: 5,
          fontSize: 12,
          color: '222222',
          lineSpacing: 18,
        });

        // Wettbewerbsbilder in zwei Spalten und kleiner darstellen
        images.forEach((img, imgIndex) => {
          const col = imgIndex % 2;
          const row = Math.floor(imgIndex / 2);
          const imgWidth = 2;
          const imgHeight = 1.5;
          const xPos = 5 + col * (imgWidth + 0.3);
          const yPos = 1.5 + row * (imgHeight + 0.3);
          slide.addImage({
            path: img.url,
            x: xPos,
            y: yPos,
            w: imgWidth,
            h: imgHeight,
          });
        });
      });

      // Sobald alle Folien fertig sind, speichern
      pptx.writeFile({ fileName: 'competition_presentation.pptx' });
    });
  }

  exportToExcel(data: Competition[]): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const workbook: XLSX.WorkBook = {
      Sheets: { 'Competitions': worksheet },
      SheetNames: ['Competitions']
    };
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array'
    });
    const blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });
    saveAs(blob, 'competitions.xlsx');
  }

  async exportPPTXToPDF(data: Competition[]) {
    
  }
}
