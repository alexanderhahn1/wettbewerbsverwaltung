import {Component, inject, Input, OnInit} from '@angular/core';
import {Competition} from '../../models/competition';
import {Change} from '../../models/change';
import {ChangeService} from '../../services/change/change.service';
import {CompetitionService} from '../../services/competition/competition.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {routes} from '../../app.routes';

@Component({
  selector: 'app-changes',
  imports: [],
  templateUrl: './changes.component.html',
  styleUrl: './changes.component.css'
})
export class ChangesComponent implements OnInit{
  competitionService: CompetitionService = inject(CompetitionService);
  changeService: ChangeService = inject(ChangeService)
  route = inject(ActivatedRoute);
  router: Router = inject(Router);
  location: Location = inject(Location);
  //competition!: Competition;
  changes: Change[] = [];
  competitionName: string = "";

  ngOnInit() {
    const competitionId: string = <string>this.route.snapshot.paramMap.get('id');
    this.competitionService.getCompetitionById(competitionId).subscribe(
      (competition: Competition) => {
        this.changeService.getAllChangesForCompetition(competition).subscribe(
          (changes: Change[]) => {
            this.changes = changes;
            console.log(changes)
          }
        )
        this.competitionName = competition.name;
      }
    )


  }

  back() {
    this.location.back();
  }
}
