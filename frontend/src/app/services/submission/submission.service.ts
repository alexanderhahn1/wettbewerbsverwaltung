import { inject, Injectable } from '@angular/core';
import { Submission } from '../../models/submission';
import {forkJoin, map, Observable, Subject, switchMap} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Competition } from '../../models/competition';
import { ProjectService } from '../project/project.service';

@Injectable({
  providedIn: 'root'
})
export class SubmissionService {
  private readonly BASE_URL = 'http://localhost:8080/api';
  httpClient: HttpClient = inject(HttpClient);
  projectsService: ProjectService = inject(ProjectService)
  submissions: Submission[] = [];
  public filterSubmissionsSubject = new Subject<string>()

  /**
   * Explanation:
   * 1. All competitions are fetched.
   * 2. Check if the competitions' array is empty. If so, an observable is returned that emits an empty array
   * 3. An array of observables is created, one for each competition.
   * 4. For each competition, its projects are fetched and then the data gets mapped into Submission interface format
   * 5. forkJoin is used to wait for all the individual project-fetching observables to complete.
   */
  getAllSubmissions(): Observable<Submission[]> {
    return this.httpClient.get<Competition[]>(`${this.BASE_URL}/competitions/`).pipe(
      switchMap(competitions => {
        if(competitions.length === 0) {
          return new Observable<Submission[]>(observer => observer.next([]));
        }

        const submissionObservables = competitions.map(competition =>
          this.projectsService.getProjectsForCompetitions(competition.id).pipe(
            map(projects => ({
              name: competition.name,
              school_year: competition.school_year,
              last_update: competition.last_update,
              projects: projects
            }))
          )
        );
        return forkJoin(submissionObservables);
      })
    );
  }
}
