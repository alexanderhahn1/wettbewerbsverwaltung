import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {filter, map, Observable, Subject} from 'rxjs';
import {Competition} from '../../models/competition';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class CompetitionService {
  keycloakService: KeycloakService = inject(KeycloakService);
  private readonly BASE_URL = 'http://localhost:8080/api';
  httpClient: HttpClient = inject(HttpClient);
  public searchCompetitionsSubject = new Subject<String>()
  public resetSearchCompetitionsSubject = new Subject<boolean>()
  public refreshCompetitionList = new Subject<boolean>()

  getAllCompetitions(): Observable<Competition[]> {
    return this.httpClient.get<Competition[]>(`${this.BASE_URL}/competitions`);
  }

  getCompetitionById(competitionId: string): Observable<Competition> {
    return this.httpClient.get<Competition>(`${this.BASE_URL}/competitions/${competitionId}`)
  }

  getActiveCompetitions(): Observable<Competition[]> {
    return this.httpClient.get<Competition[]>(`${this.BASE_URL}/competitions/active`);
  }

  getRandomCompetition(): Observable<Competition> {
    return this.httpClient.get<Competition>(`${this.BASE_URL}/competitions/random`);
  }

  addCompetition(competition: Competition): Observable<Competition> {
    const headers = {
      Authorization: `Bearer ${this.keycloakService.getToken()}`
    };
    return this.httpClient.post<Competition>(`${this.BASE_URL}/competitions`, competition, { headers });
  }

  getAllSchoolYears(): Observable<string[]> {
    return this.getAllCompetitions().pipe(
      map(competitions => {
        const schoolYears = competitions
          .map(c => c.school_year)
          .filter(year => /^[0-9]{4}$/.test(year))
          .map(year => parseInt(year, 10))
          .sort((a, b) => b - a)
          .map(year => year.toString())
        return Array.from(new Set(schoolYears))
      })
    );
  }

  updateCompetition(competition: Competition): Observable<Competition> {
    const headers = {
      Authorization: `Bearer ${this.keycloakService.getToken()}`
    }
    return this.httpClient.put<Competition>(`${this.BASE_URL}/competitions/${competition.id}`, competition, { headers });
  }
}
