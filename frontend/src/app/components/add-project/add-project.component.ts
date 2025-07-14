import {Component, inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CompetitionService} from '../../services/competition/competition.service';
import {Competition} from '../../models/competition';
import {Project} from '../../models/project';
import {ProjectService} from '../../services/project/project.service';

@Component({
  selector: 'app-add-project',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './add-project.component.html',
  styleUrl: './add-project.component.css'
})
export class AddProjectComponent implements OnInit{
  competitionService : CompetitionService = inject(CompetitionService);
  competitions: Competition[] = [];
  projectService: ProjectService = inject(ProjectService);
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

    this.projectService.getAllProjects().subscribe(
      (projects: Project[]) => {
        console.log(projects);
      }
    )
  }

  addProject(): void {
    const project: Project = this.addProjectForm.value;
    this.projectService.addProject(project).subscribe(
      (createdProject: Project) => {
        console.log(createdProject);
      }
    )
    console.log(project);
  }
}
