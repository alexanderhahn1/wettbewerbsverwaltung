import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {filter, forkJoin, map, Observable, Subject} from 'rxjs';
import {Project} from '../../models/project';
import {KeycloakService} from 'keycloak-angular';
import {Competition} from '../../models/competition';
import {Image} from '../../models/image';

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

  addImagesToProject(files: File[], projectId: number): Observable<any> {
    const headers = {
      Authorization: `Bearer ${this.keycloakService.getToken()}`
    };
    const requests = files.map(file => {
      const formData = new FormData();
      formData.append('file', file, file.name);
      formData.append('fileName', file.name);
      formData.append('fileContentType', file.type);
      return this.httpClient.post<void>(
        `${this.BASE_URL}/projects/${projectId}/images`,
        formData,
        { headers }
      );
    });
    return forkJoin(requests);
  }

  getImagesForProject(projectId: number): Observable<Image[]> {
    return this.httpClient.get<Image[]>(`${this.BASE_URL}/projects/${projectId}/images`)
  }

  deleteImage(imageId: number): Observable<void> {
    const token = this.keycloakService.getToken();
    const headers = { Authorization: `Bearer ${token}` };
    return this.httpClient.delete<void>(
      `${this.BASE_URL}/project-images/${imageId}`,
      { headers }
    );
  }
}
