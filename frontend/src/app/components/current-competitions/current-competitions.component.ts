import {Component, inject, OnInit} from '@angular/core';
import {CompetitionService} from '../../services/competition/competition.service';
import {Competition} from '../../models/competition';
import {CompetitionCardComponent} from '../competition-card/competition-card.component';
import {CompetitionSearchBarComponent} from '../competition-search-bar/competition-search-bar.component';

@Component({
  selector: 'app-current-competitions',
  imports: [ CompetitionCardComponent ],
  templateUrl: './current-competitions.component.html',
  styleUrl: './current-competitions.component.css'
})
export class CurrentCompetitionsComponent implements OnInit{
  competitionService: CompetitionService = inject(CompetitionService);
  competitions!: Competition[];

  ngOnInit() {
    this.competitionService.getActiveCompetitions().subscribe(
      (competitions: Competition[]) => {
        this.competitions = competitions.filter(competition => new Date(competition.deadline_date) > new Date()).sort((a, b) => a.name.localeCompare(b.name));
      }
    )
  }
}
