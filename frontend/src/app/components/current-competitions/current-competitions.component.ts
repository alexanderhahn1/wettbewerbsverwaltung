import {Component, inject, OnInit} from '@angular/core';
import {CompetitionService} from '../../services/competition/competition.service';
import {Competition} from '../../models/competition';

@Component({
  selector: 'app-current-competitions',
  imports: [],
  templateUrl: './current-competitions.component.html',
  styleUrl: './current-competitions.component.css'
})
export class CurrentCompetitionsComponent implements OnInit{
  competitionService: CompetitionService = inject(CompetitionService);
  competitions!: Competition[];

  ngOnInit() {
    this.competitionService.getActiveCompetitions().subscribe(
      (competitions: Competition[]) => {
        this.competitions = competitions;
        console.log(this.competitions);
      }
    )
  }
}
