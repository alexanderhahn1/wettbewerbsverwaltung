import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {filter, map, Observable, Subject} from 'rxjs';
import {Project} from '../../models/project';
import {KeycloakService} from 'keycloak-angular';
import {Competition} from '../../models/competition';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  keycloakService: KeycloakService = inject(KeycloakService);
  private readonly BASE_URL = 'http://localhost:8080/api';
  httpClient: HttpClient = inject(HttpClient);
  public refreshProjectList = new Subject<boolean>()

  addProject(project: Project): Observable<Project> {
    const headers = {
      Authorization: `Bearer ${this.keycloakService.getToken()}`
    };
    return this.httpClient.post<Project>(`${this.BASE_URL}/projects`, project, { headers });
  }

  getProjectsForCompetitions(id: number): Observable<Project[]> {
    return this.httpClient.get<Project[]>(`${this.BASE_URL}/projects`).pipe(
     map((projects) => projects.filter(project => project.competition_id === id))
    );
  }

  updateProject(project: Project): Observable<Project> {
    const headers = {
      Authorization: `Bearer ${this.keycloakService.getToken()}`
    }
    return this.httpClient.put<Project>(`${this.BASE_URL}/projects/${project.id}`, project, { headers });
  }

  deleteProject(project: Project) {
    const headers = {
      Authorization: `Bearer ${this.keycloakService.getToken()}`
    }
    this.httpClient.delete(`${this.BASE_URL}/projects/${project.id}`, { headers }).subscribe();
  }
}
