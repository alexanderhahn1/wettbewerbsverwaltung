import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CompetitionService} from '../../services/competition/competition.service';
import {Competition} from '../../models/competition';
import {Project} from '../../models/project';
import {ProjectService} from '../../services/project/project.service';
import {ResponseComponent} from '../response/response.component';
import {FormatSchoolYearPipe} from '../../pipes/format-school-year/format-school-year.pipe';

@Component({
  selector: 'app-add-project',
  imports: [
    ReactiveFormsModule,
    ResponseComponent,
    FormatSchoolYearPipe
  ],
  templateUrl: './add-project.component.html',
  styleUrl: './add-project.component.css'
})
export class AddProjectComponent implements OnInit{
  @ViewChild('response') responseComponent!: ResponseComponent;
  competitionService : CompetitionService = inject(CompetitionService);
  projectService: ProjectService = inject(ProjectService);
  competitions: Competition[] = [];
  addProjectForm!: FormGroup;

  ngOnInit() {
    this.competitionService.getAllCompetitions().subscribe(
      (competitions: Competition[]) => {
        this.competitions = competitions;
      }
    )

    this.addProjectForm = new FormGroup({
      name: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
      next_step: new FormControl('', Validators.required),
      contributors: new FormControl('', Validators.required),
      competition_id: new FormControl('', Validators.required),
    })
  }

  addProject(): void {
    const project: Project = this.addProjectForm.value;
    this.projectService.addProject(project).subscribe({
        next: (createdProject: Project) => {
          if (createdProject && createdProject.name) {
            this.responseComponent.trigger('Projekt erfolgreich hinzugefügt!')
            this.addProjectForm.reset();
          } else {
            this.responseComponent.trigger('Etwas hat nicht funktioniert!')
          }
        },
        error: (err) => {
          this.responseComponent.trigger('Fehler beim Hinzufügen des Projekts. Bitte versuche es erneut.')
        }
    })
    console.log(this.addProjectForm.value);
    console.log(project)
  }
}
