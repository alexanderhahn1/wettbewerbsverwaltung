import {inject, Injectable} from '@angular/core';
import {KeycloakService} from 'keycloak-angular';
import {HttpClient} from '@angular/common/http';
import {Competition} from '../../models/competition';
import {Change} from '../../models/change';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChangeService {
  keycloakService: KeycloakService = inject(KeycloakService);
  private readonly BASE_URL = 'http://localhost:8080/api';
  httpClient: HttpClient = inject(HttpClient);

  getAllChangesForCompetition(competition: Competition): Observable<Change[]> {
    return this.httpClient.get<Change[]>(`${this.BASE_URL}/changes/competition/${competition.id}`)
  }
}
