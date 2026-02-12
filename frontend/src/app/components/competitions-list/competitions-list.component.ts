import {Component, inject, OnInit} from '@angular/core';
import {CompetitionService} from '../../services/competition/competition.service';
import {Competition} from '../../models/competition';
import {CompetitionCardComponent} from '../competition-card/competition-card.component';
import {CompetitionSearchBarComponent} from '../competition-search-bar/competition-search-bar.component';
import {KeycloakService} from 'keycloak-angular';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-competitions-list',
  imports: [
    CompetitionCardComponent,
    CompetitionSearchBarComponent,
    NgClass
  ],
  templateUrl: './competitions-list.component.html',
  styleUrl: './competitions-list.component.css'
})
export class CompetitionsListComponent implements OnInit{
  competitionService: CompetitionService = inject(CompetitionService);
  keycloakService: KeycloakService = inject(KeycloakService);
  competitions: Competition[] = [];
  isUserAdmin: boolean = false;

  page = 1;
  pageSize = 5;

  ngOnInit() {
    this.keycloakService.getUserRoles().includes('admin') ? this.isUserAdmin = true : this.isUserAdmin = false;
    //console.log(this.keycloakService.getToken());
    this.getAllCompetitions();
    this.competitionService.searchCompetitionsSubject.subscribe(searchValue => {
      this.competitionService.getAllCompetitions().subscribe(
        (competitions: Competition[]) => {
          this.page = 1;
          const term = (searchValue ?? '').toString().toLowerCase();
          this.competitions = competitions.filter(competition => {
            const infoString = this.competitionService.getCompetitionInfoString(competition);
            return infoString.includes(term);
          });
        }
      );
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

    this.competitionService.isCompetitionRelevantSubject.subscribe(
      competitionIsRelevant => {
        if (competitionIsRelevant) {
          this.competitionService.getAllCompetitions().subscribe(
            (competitions: Competition[]) => {
              this.page = 1
              this.competitions = competitions.filter(competition => competition.is_relevant);
            }
          )
        } else {
          this.getAllCompetitions();
        }
      }
    )
  }

  getAllCompetitions() {
    this.competitionService.getAllCompetitions().subscribe(
      (competitions: Competition[]) => {
        this.competitions = competitions.sort((a, b) => a.name.localeCompare(b.name));
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

  get paginatedCompetitions() {
    const start = (this.page - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.competitions.slice(start, end);
  }

  get totalPages() {
    return Math.ceil(this.competitions.length / this.pageSize);
  }

  goToPage(page: number) {
    if (page >= 1 || page <= this.totalPages) {
      this.page = page

      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 5);
    }
  }

  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1)
  }

  protected readonly window = window;
}
