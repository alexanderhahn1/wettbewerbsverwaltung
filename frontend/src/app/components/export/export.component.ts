import {Component, inject} from '@angular/core';
import {ExportService} from '../../services/export/export.service';
import {CompetitionService} from '../../services/competition/competition.service';
import {Competition} from '../../models/competition';

@Component({
  selector: 'app-export',
  imports: [],
  templateUrl: './export.component.html',
  styleUrl: './export.component.css'
})
export class ExportComponent {

  exportService: ExportService = inject(ExportService);
  competitionService: CompetitionService = inject(CompetitionService);

  exportTest(): void {

    this.competitionService.getAllCompetitions().subscribe(s => {
      this.exportService.exportToExcel(s);
    });

  }
}
