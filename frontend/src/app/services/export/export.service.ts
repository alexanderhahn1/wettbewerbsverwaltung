import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import {Competition} from '../../models/competition';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import html2pdf from 'html2pdf.js';
import PptxGenJS from 'pptxgenjs';
import Slide = PptxGenJS.Slide;

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  constructor() { }

  exportToPowerPoint(data: Competition[]): void {
    const pptx = new PptxGenJS();

    if (data == null) {
      return;
    }

    data.forEach((competition) => {
      const slide = pptx.addSlide();

      // ✅ Add logo (top right)
      slide.addImage({
        path: './htllogo_2022_black_v2.png', // Local path or public URL
        x: 5.5,                    // Adjust depending on slide width
        y: 0.1,
        w: 4.4248,
        h: 1.0,
      });

      // Title
      slide.addText(competition.name, {
        x: 0.5,
        y: 0.5,
        w: '50%',
        fontSize: 28,
        bold: true,
        color: '003366',
      });

      // Details box
      const details = [
        `📅 Deadline: ${competition.deadline}`,
        `🎁 Prize: ${competition.prize}`,
        `📬 Contact: ${competition.contact}`,
        `📚 Info Material: ${competition.information_material}`,
        `📝 Submission: ${competition.submission_forms}`,
        `🔗 Link: ${competition.link}`,
        `📆 School Year: ${competition.school_year}`,
        `🧑 Created By: ${competition.created_by}`,
      ].join('\n');

      slide.addText(details, {
        x: 0.5,
        y: 1.5,
        w: '90%',
        h: 5,
        fontSize: 14,
        color: '222222',
        lineSpacing: 20,
      });

    })

    // Export the pptx
    pptx.writeFile({ fileName: "competition_presentation.pptx" });
  }

  exportToExcel(data: Competition[]): void {

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);

    const workbook: XLSX.WorkBook = {
      Sheets: {'Competitions': worksheet},
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

  async exportToPDF(content: HTMLElement) {
    // Wait for DOM to fully render (important for Tailwind + Angular)
    await new Promise(resolve => setTimeout(resolve, 100));

    const canvas = await html2canvas(content, {
      scale: 2,
      useCORS: true // Important if you load external assets like fonts/images
    });

    const imgData = canvas.toDataURL('image/jpeg', 1.0);

    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const pxToMm = 0.264583;
    const imgWidth = canvas.width * pxToMm;
    const imgHeight = canvas.height * pxToMm;

    const ratio = Math.min(pageWidth / imgWidth, pageHeight / imgHeight);

    pdf.addImage(
      imgData,
      'JPEG',
      0,
      0,
      imgWidth * ratio,
      imgHeight * ratio
    );

    const blob = pdf.output('blob');
    saveAs(blob, 'my-document.pdf');
  }
}
