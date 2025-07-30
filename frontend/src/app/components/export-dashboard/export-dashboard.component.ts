import {Component, inject} from '@angular/core';
import {ExportFilterBarComponent} from '../export-filter-bar/export-filter-bar.component';
import {ExportComponent} from '../export/export.component';
import {CompetitionService} from '../../services/competition/competition.service';
import {CompetitionCardComponent} from '../competition-card/competition-card.component';

@Component({
  selector: 'app-export-dashboard',
  imports: [
    ExportFilterBarComponent,
    ExportComponent,
    CompetitionCardComponent
  ],
  templateUrl: './export-dashboard.component.html',
  styleUrl: './export-dashboard.component.css'
})
export class ExportDashboardComponent {
  competitionService: CompetitionService = inject(CompetitionService);


}
