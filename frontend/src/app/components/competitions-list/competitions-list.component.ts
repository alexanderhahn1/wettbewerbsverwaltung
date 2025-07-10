import {Component, inject, OnInit} from '@angular/core';
import {CompetitionService} from '../../services/competition/competition.service';
import {Competition} from '../../models/competition';
import {CompetitionCardComponent} from '../competition-card/competition-card.component';
import {CompetitionSearchBarComponent} from '../competition-search-bar/competition-search-bar.component';

@Component({
  selector: 'app-competitions-list',
  imports: [
    CompetitionCardComponent,
    CompetitionSearchBarComponent
  ],
  templateUrl: './competitions-list.component.html',
  styleUrl: './competitions-list.component.css'
})
export class CompetitionsListComponent implements OnInit{
  competitionService: CompetitionService = inject(CompetitionService);
  competitions: Competition[] = [];

  ngOnInit() {
    this.getAllCompetitions();
    this.competitionService.searchCompetitionsSubject.subscribe(searchValue => {
      this.competitions = this.competitions.filter(competition => competition.name.toLowerCase().includes(searchValue.toLowerCase()));
    })
    this.competitionService.resetSearchCompetitionsSubject.subscribe(
      resetSearchCompetitions => {
        this.getAllCompetitions();
      }
    );

  }

  getAllCompetitions() {
    this.competitionService.getAllCompetitions().subscribe(
      (competitions: Competition[]) => {
        this.competitions = competitions;
      }
    )
  }


}
