import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {filter, map, Observable, Subject} from 'rxjs';
import {Competition} from '../../models/competition';

@Injectable({
  providedIn: 'root'
})
export class CompetitionService {
  private readonly BASE_URL = 'http://localhost:8080/api';
  httpClient: HttpClient = inject(HttpClient);
  public searchCompetitionsSubject = new Subject<String>()
  public resetSearchCompetitionsSubject = new Subject<boolean>()

  getAllCompetitions(): Observable<Competition[]> {
    return this.httpClient.get<Competition[]>(`${this.BASE_URL}/competitions`);
  }

  getActiveCompetitions(): Observable<Competition[]> {
    return this.httpClient.get<Competition[]>(`${this.BASE_URL}/competitions/active`);
  }

  addCompetition(competition: Competition): Observable<number> {
    return this.httpClient.post(`${this.BASE_URL}/competitions`, competition, {
      observe: 'response'
    }).pipe(
      map(response => response.status)
    )
  }
}
