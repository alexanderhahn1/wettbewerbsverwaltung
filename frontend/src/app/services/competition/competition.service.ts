import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Competition} from '../../models/competition';

@Injectable({
  providedIn: 'root'
})
export class CompetitionService {
  private readonly BASE_URL = 'http://localhost:8080/api';
  httpClient: HttpClient = inject(HttpClient);

  getAllCompetitions(): Observable<Competition[]> {
    return this.httpClient.get<Competition[]>(`${this.BASE_URL}/competitions`);
  }
}
