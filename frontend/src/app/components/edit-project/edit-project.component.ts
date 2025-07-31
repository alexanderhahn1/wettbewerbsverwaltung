import {Component, EventEmitter, inject, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {ResponseComponent} from '../response/response.component';
import {Project} from '../../models/project';
import {Competition} from '../../models/competition';
import {CompetitionService} from '../../services/competition/competition.service';
import {ProjectService} from '../../services/project/project.service';

@Component({
  selector: 'app-edit-project',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ResponseComponent
  ],
  templateUrl: './edit-project.component.html',
  styleUrl: './edit-project.component.css'
})
export class EditProjectComponent implements OnInit{
  @ViewChild('response') responseComponent!: ResponseComponent;
  @Input() project!: Project;
  @Output() closeModal = new EventEmitter<void>();
  competitionService: CompetitionService = inject(CompetitionService);
  projectService: ProjectService = inject(ProjectService);
  competitions: Competition[] = []
  editProjectForm!: FormGroup;


  ngOnInit() {
    document.body.style.overflow = 'hidden';


    this.competitionService.getAllCompetitions().subscribe(
      (competitions: Competition[]) => {
        this.competitions = competitions;
      }
    )

    this.editProjectForm = new FormGroup({
      name: new FormControl(this.project.name, [Validators.required]),
      status: new FormControl(this.project.status, [Validators.required]),
      next_step: new FormControl(this.project.next_step, [Validators.required]),
      contributors: new FormControl(this.project.contributors, [Validators.required])
    })

    console.log(this.project)
  }

  close() {
    document.body.style.overflow = 'auto';

    this.editProjectForm.reset();
    this.closeModal.emit();
  }

  saveProject() {
    const updatedProject = {
      ...this.editProjectForm.value,
      id: this.project.id,
      competition_id: this.project.competition_id
    }

    this.projectService.updateProject(updatedProject).subscribe({
      next: (updatedProject: Project) => {
        if (updatedProject && updatedProject.name) {
          this.responseComponent.trigger('Projekt erfolgreich bearbeitet!')
          setTimeout(() => {
            document.body.style.overflow = 'auto';
            this.editProjectForm.reset()
            this.closeModal.emit()
            this.projectService.refreshProjectList.next(true);
          }, 500)
        } else {
          this.responseComponent.trigger('Etwas hat nicht funktioniert!')
        }
      },
      error: (err) => {
        this.responseComponent.trigger('Fehler beim Bearbeiten des Projekts. Bitte versuche es erneut.')
      }
    })
  }

  deleteProject() {
    this.projectService.deleteProject(this.project)
    this.projectService.refreshProjectList.next(true);
    document.body.style.overflow = 'auto';

    this.closeModal.emit()
  }
}
