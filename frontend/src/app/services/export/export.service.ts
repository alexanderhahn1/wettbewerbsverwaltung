import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import {Competition} from '../../models/competition';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import html2pdf from 'html2pdf.js';

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  constructor() { }

  exportToExcel(data: Competition[]): void {

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);

    const workbook: XLSX.WorkBook = {
      Sheets: {'People': worksheet},
      SheetNames: ['People']
    };

    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array'
    });

    const blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });

    saveAs(blob, 'people.xlsx');
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
