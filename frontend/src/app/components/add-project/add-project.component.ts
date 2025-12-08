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

  selectedFiles: File[] = []
  selectedFileNames: string[] = []

  ngOnInit() {
    this.competitionService.getAllCompetitions().subscribe(
      (competitions: Competition[]) => {
        this.competitions = competitions.sort((a, b) => {
          return Number(b.school_year) - Number(a.school_year);
        });
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

  /*addProject(): void {
    const project: Project = this.addProjectForm.value;
    this.projectService.addProject(project).subscribe({
        next: (createdProject: Project) => {
          if (createdProject && createdProject.name) {
            this.responseComponent.trigger('Projekt erfolgreich hinzugefügt!', true)
            this.addProjectForm.reset();
          } else {
            this.responseComponent.trigger('Etwas hat nicht funktioniert!', false)
          }
        },
        error: (err) => {
          this.responseComponent.trigger('Fehler beim Hinzufügen des Projekts. Bitte versuche es erneut.', false)
        }
    })
    console.log(this.addProjectForm.value);
    console.log(project)
  }
  */


  addProject(): void {
    const projectData = this.addProjectForm.value;
    this.projectService.addProject(projectData).subscribe({
      next: (createdProject: Project) => {
        if (createdProject && createdProject.name) {
          if (this.selectedFiles.length > 0) {
            this.projectService
              .addImagesToProject(this.selectedFiles, createdProject.id)
              .subscribe({
                next: () => this.responseComponent.trigger('Bilder erfolgreich hochgeladen!', true),
                error: (err) => {
                  console.error('Upload-Fehler:', err);
                  this.responseComponent.trigger('Fehler beim Hochladen der Bilder.', false);
                }
              });
          }
          this.responseComponent.trigger('Wettbewerb erfolgreich hinzugefügt!', true)
          this.addProjectForm.reset();
          this.selectedFiles = [];
          this.selectedFileNames = [];
        } else {
          this.responseComponent.trigger('Etwas hat nicht funktioniert!', false)
        }
      },
      error: (err) => {
        this.responseComponent.trigger('Fehler beim Hinzufügen des Wettbewerbs. Bitte versuche es erneut.', false);
      }
    });
    console.log(this.addProjectForm.value);
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement
    if (!input.files || input.files.length === 0) {
      this.selectedFiles = []
      this.selectedFileNames = []
      return
    }

    const files = Array.from(input.files)

    const hasLogo = files.some(f => f.name.toLowerCase().includes('logo'))

    const maxFiles = hasLogo ? 9 : 8

    if (files.length > maxFiles) {
      this.responseComponent.trigger(
        hasLogo
          ? 'Maximal 9 Dateien erlaubt, wenn ein Logo dabei ist.'
          : 'Maximal 8 Dateien erlaubt.', false
      )
    }

    this.selectedFiles = files.slice(0, maxFiles)
    this.selectedFileNames = this.selectedFiles.map(f => f.name)
  }
}
