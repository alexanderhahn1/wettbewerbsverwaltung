import {Component, inject, OnInit} from '@angular/core';
import {CompetitionService} from '../../services/competition/competition.service';
import {Competition} from '../../models/competition';
import {CompetitionCardComponent} from '../competition-card/competition-card.component';
import {CompetitionSearchBarComponent} from '../competition-search-bar/competition-search-bar.component';
import {KeycloakService} from 'keycloak-angular';

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
  keycloakService: KeycloakService = inject(KeycloakService);
  competitions: Competition[] = [];
  isUserAdmin: boolean = false;

  ngOnInit() {
    this.keycloakService.getUserRoles().includes('admin') ? this.isUserAdmin = true : this.isUserAdmin = false;

    this.getAllCompetitions();
    this.competitionService.searchCompetitionsSubject.subscribe(searchValue => {
      this.competitions = this.competitions.filter(competition => competition.name.toLowerCase().includes(searchValue.toLowerCase()));
    })
    this.competitionService.resetSearchCompetitionsSubject.subscribe(
      resetSearchCompetitions => {
        this.getAllCompetitions();
      }
    );

    this.competitionService.refreshCompetitionList.subscribe(
      refreshCompetitions => {
        if (refreshCompetitions) {
          this.getAllCompetitions()
        }
    })
  }

  getAllCompetitions() {
    this.competitionService.getAllCompetitions().subscribe(
      (competitions: Competition[]) => {
        this.competitions = competitions;
      }
    )
  }

  exportPdf() {
    const exportButton = document.getElementById('exportButton') as HTMLElement;
    const searchBar = document.getElementById('searchBar') as HTMLElement;

    exportButton.style.display = 'none';
    searchBar.style.display = 'none';

    window.print();


    exportButton.style.display = '';
    searchBar.style.display = '';

  }
}
