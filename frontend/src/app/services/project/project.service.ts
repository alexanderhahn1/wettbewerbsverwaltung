import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable, Subject} from 'rxjs';
import {Project} from '../../models/project';
import {KeycloakService} from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  keycloakService: KeycloakService = inject(KeycloakService);
  private readonly BASE_URL = 'http://localhost:8080/api';
  httpClient: HttpClient = inject(HttpClient);

  getAllProjects(): Observable<Project[]> {
    return this.httpClient.get<Project[]>(`${this.BASE_URL}/projects`);
  }

  addProject(project: Project): Observable<Project> {
    const headers = {
      Authorization: `Bearer ${this.keycloakService.getToken()}`
    };
    return this.httpClient.post<Project>(`${this.BASE_URL}/projects`, project, { headers });
  }
}
