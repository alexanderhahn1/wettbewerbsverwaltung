import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  ImageRun
} from 'docx';
import {inject, Injectable} from '@angular/core';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Competition } from '../../models/competition';;
import PptxGenJS from 'pptxgenjs';

import { forkJoin } from 'rxjs';
import {CompetitionService} from '../competition/competition.service';
import { ProjectService } from '../project/project.service';
import { Project } from '../../models/project';

@Injectable({
  providedIn: 'root'
})
export class ExportService {
  competitionService: CompetitionService = inject(CompetitionService)
  projectService: ProjectService = inject(ProjectService);

  exportToPowerPoint(data: Competition[]): void {
    const pptx = new PptxGenJS();

    if (data == null) {
      return;
    }

    const imageRequests = data.map(comp => this.competitionService.getImagesForCompetition(comp.id));
    forkJoin(imageRequests).subscribe(imagesArrays => {
      const projectRequests = data.map(comp => this.projectService.getProjectsForCompetitions(comp.id));
      forkJoin(projectRequests).subscribe(projectsArrays => {
        data.forEach((competition, index) => {
          let images = imagesArrays[index] || [];

          images = images.sort((a, b) => {
            const aIsLogo = a.name.toLowerCase().includes("logo");
            const bIsLogo = b.name.toLowerCase().includes("logo");
            return aIsLogo === bIsLogo ? 0 : aIsLogo ? -1 : 1;
          });

          const projects = projectsArrays[index] || [];
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

          const projectNames = projects.map(p => p.name).join(', ');

          // Details-Box
          const details = [
            `📅 Einreichungsfrist: ${competition.deadline}`,
            `🎁 Preis: ${competition.prize}`,
            `📬 Kontakt: ${competition.contact}`,
            `📚 Informations Material: ${competition.information_material}`,
            `📝 Einreichungsformulare: ${competition.submission_forms}`,
            `🔗 Link: ${competition.link}`,
            `📆 Schuljahr: ${competition.school_year}`,
            `⚒️ Projekte: ${projectNames}`
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

          // Wettbewerbsbilder in einem 4x2 Raster (max 8 Bilder) anordnen
          images.forEach((img, imgIndex) => {
            console.log(img.name.toLowerCase(), imgIndex);
            const cols = 3;
            const imgWidth = 1.5;
            const imgHeight = 0.9;

            const col = imgIndex % cols;
            const row = Math.floor(imgIndex / cols);

            if (row >= 3) {
              return;
            }

            const xPos = 5 + col * (imgWidth + 0.1);
            const yPos = 1.5 + row * (imgHeight + 0.2);

            slide.addImage({
              path: img.url,
              x: xPos,
              y: yPos,
              w: imgWidth,
              h: undefined,
            });
          });
        });



        // Sobald alle Folien fertig sind, speichern
        pptx.writeFile({ fileName: 'competition_presentation.pptx' });
      });
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

  exportToWord(data: Competition[]): void {
    const imageRequests = data.map(comp => this.competitionService.getImagesForCompetition(comp.id));

    forkJoin(imageRequests).subscribe(async imagesArrays => {
      const projectRequests = data.map(comp => this.projectService.getProjectsForCompetitions(comp.id));
      forkJoin(projectRequests).subscribe(async projectsArrays => {
        const children: Paragraph[] = [];

        // Fetch all images as blobs per competition
        const allImageBlobs: (Blob[])[] = await Promise.all(
          imagesArrays.map(images =>
            Promise.all(
              images.map(img =>
                fetch(img.url).then(res => res.blob())
              )
            )
          )
        );

        const allImageBuffers: (ArrayBuffer[])[] = await Promise.all(
          allImageBlobs.map(blobs =>
            Promise.all(blobs.map(blob => blob.arrayBuffer()))
          )
        );

        data.forEach((competition, index) => {
          const images = imagesArrays[index] || [];
          const imageBuffers = allImageBuffers[index] || [];
          const projects = projectsArrays[index] || [];

          children.push(
            new Paragraph({
              text: competition.name,
              heading: HeadingLevel.HEADING_1,
            }),
            new Paragraph({
              children: [
                new TextRun({ text: `📅 Einreichungsfrist: ${competition.deadline}`, break: 1 }),
                new TextRun({ text: `🎁 Preis: ${competition.prize}`, break: 1 }),
                new TextRun({ text: `📬 Kontakt: ${competition.contact}`, break: 1 }),
                new TextRun({ text: `📚 Informations Material: ${competition.information_material}`, break: 1 }),
                new TextRun({ text: `📝 Einreichungsformulare: ${competition.submission_forms}`, break: 1 }),
                new TextRun({ text: `🔗 Link: ${competition.link}`, break: 1 }),
                new TextRun({ text: `📆 Schuljahr: ${competition.school_year}`, break: 1 }),
                new TextRun({ text: `⚒️ Projekte: ${projects.map(p => p.name).join(', ')}`, break: 1 }),
              ]
            })
          );

          images.forEach((img, imgIndex) => {
            const buffer = imageBuffers[imgIndex];
            const extension = img.url.split('.').pop()?.toLowerCase();
            let format: 'png' | 'jpg' | 'gif' = 'png';
            if (extension === 'jpg' || extension === 'jpeg') {
              format = 'jpg';
            } else if (extension === 'gif') {
              format = 'gif';
            }

            children.push(
              new Paragraph({
                children: [
                  new ImageRun({
                    data: buffer,
                    transformation: {
                      width: 300,
                      height: 200
                    },
                    type: format
                  })
                ]
              })
            );
          });

          children.push(new Paragraph({ text: "", spacing: { after: 200 } }));
        });

        const doc = new Document({
          sections: [{
            properties: {},
            children
          }]
        });

        Packer.toBlob(doc).then(blob => {
          saveAs(blob, 'competitions.docx');
        });
      });
    });
  }


}
