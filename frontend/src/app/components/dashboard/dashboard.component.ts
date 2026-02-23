import {Component, inject, OnInit} from '@angular/core';
import {CompetitionCardComponent} from '../competition-card/competition-card.component';
import {Competition} from '../../models/competition';
import {CompetitionService} from '../../services/competition/competition.service';

@Component({
  selector: 'app-dashboard',
  imports: [
    CompetitionCardComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  competitionService: CompetitionService = inject(CompetitionService);
  randomCompetition!: Competition;
  userOUs: string[] = [];

  ngOnInit() {
    this.competitionService.getRandomCompetition().subscribe( c => {
      this.randomCompetition = c;
      //console.log(c)
    })
  }

}
