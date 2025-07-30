import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {filter, map, Observable, Subject, forkJoin} from 'rxjs';
import {Competition} from '../../models/competition';
import { KeycloakService } from 'keycloak-angular';
import {CompetitionImage} from '../../models/competition-image';

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

  deleteCompetition(competition: Competition) {
    const headers = {
      Authorization: `Bearer ${this.keycloakService.getToken()}`
    }
    this.httpClient.delete(`${this.BASE_URL}/competitions/${competition.id}`, { headers }).subscribe();
  }

  addImagesToCompetition(files: File[], competitionId: number): Observable<any> {
    const headers = {
      Authorization: `Bearer ${this.keycloakService.getToken()}`
    };
    const requests = files.map(file => {
      const formData = new FormData();
      formData.append('file', file, file.name);
      formData.append('fileName', file.name);
      formData.append('fileContentType', file.type);
      return this.httpClient.post<void>(
        `${this.BASE_URL}/competitions/${competitionId}/images`,
        formData,
        { headers }
      );
    });
    return forkJoin(requests);
  }

  getImagesForCompetition(competitionId: number): Observable<CompetitionImage[]> {
    return this.httpClient.get<CompetitionImage[]>(`${this.BASE_URL}/competitions/${competitionId}/images`)
  }

  deleteImage(imageId: number): Observable<void> {
    const token = this.keycloakService.getToken();
    const headers = { Authorization: `Bearer ${token}` };
    return this.httpClient.delete<void>(
      `${this.BASE_URL}/images/${imageId}`,
      { headers }
    );
  }

}
