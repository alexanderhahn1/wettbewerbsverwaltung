import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import {Competition} from '../../models/competition';

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  constructor() { }

  exportToExcel(competitions: Competition[]): void {

    let data = competitions;

    //for (const competition of competitions) {
    //  data.push({ Name: competition.name, Link: competition.link, Deadline: competition.deadline,  })
    //}

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
}
