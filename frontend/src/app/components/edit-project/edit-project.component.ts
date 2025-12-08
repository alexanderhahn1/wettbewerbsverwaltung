import {Component, EventEmitter, inject, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {ResponseComponent} from '../response/response.component';
import {Project} from '../../models/project';
import {Competition} from '../../models/competition';
import {CompetitionService} from '../../services/competition/competition.service';
import {ProjectService} from '../../services/project/project.service';
import {Image} from '../../models/image';
import {map, of, switchMap} from 'rxjs';

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

  existingImages: Image[] = [];
  newFiles: File[] = [];

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

    this.projectService.getImagesForProject(this.project.id).subscribe(images => {
      this.existingImages = images
    })
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

    this.projectService.updateProject(updatedProject).pipe(
      switchMap((project: Project) => {
        if (this.newFiles.length) {
          return this.projectService.addImagesToProject(this.newFiles, this.project.id).pipe(
            map(() => project)
          );
        }
        return of(project)
      })
    ).subscribe({
      next: (updatedProject: Project) => {
        if (updatedProject && updatedProject.name) {
          this.responseComponent.trigger('Projekt erfolgreich bearbeitet!', true)
          setTimeout(() => {
            document.body.style.overflow = 'auto';
            this.editProjectForm.reset()
            this.closeModal.emit()
            this.projectService.refreshProjectList.next(true);
          }, 500)
        } else {
          this.responseComponent.trigger('Etwas hat nicht funktioniert!', false)
        }
      },
      error: (err) => {
        this.responseComponent.trigger('Fehler beim Bearbeiten des Projekts. Bitte versuche es erneut.', false)
      }
    })
  }

  confirmDeleteProject() {
    const confirmed = window.confirm("Möchten Sie dieses Projekt wirklich löschen?");
    if (confirmed) {
      this.deleteProject();
    }
  }
  deleteProject() {
    this.projectService.deleteProject(this.project)
    this.projectService.refreshProjectList.next(true);
    document.body.style.overflow = 'auto';

    this.closeModal.emit()
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement
    if (!input.files) return

    const selectedFilesArray = Array.from(input.files)
    const hasLogo = selectedFilesArray.some(file => file.name.toLowerCase().includes('logo'))

    const maxFiles = hasLogo ? 9 : 8

    const totalAlreadyUploaded = this.existingImages.length + this.newFiles.length

    if (totalAlreadyUploaded >= maxFiles) {
      this.responseComponent.trigger(`Es sind bereits ${maxFiles} Bilder hochgeladen. Weitere Uploads sind nicht möglich.`, false)
      return
    }

    let newFilesToAdd: File[] = []
    selectedFilesArray.forEach(file => {
      const alreadyNew = this.newFiles.some(f => f.name === file.name)
      const alreadyOld = this.existingImages.some(f => f.name === file.name)
      if (!alreadyNew && !alreadyOld) {
        newFilesToAdd.push(file)
      }
    })

    const remainingSlots = maxFiles - totalAlreadyUploaded

    if (newFilesToAdd.length > remainingSlots) {
      this.responseComponent.trigger(`Maximale Anzahl an Bildern überschritten (maximal ${maxFiles} erlaubt).`, false)
      newFilesToAdd = newFilesToAdd.slice(0, remainingSlots)
    }

    this.newFiles = [...this.newFiles, ...newFilesToAdd]
  }

  removeNewFile(file:File){
    this.newFiles = this.newFiles.filter( f => f !== file);
  }

  removeExistingImage(image: Image){
    this.projectService.deleteImage(image.id).subscribe(() => {
      console.log(this.existingImages)
      this.existingImages = this.existingImages.filter(i => i.id !== image.id)
      console.log(this.existingImages)
    }, err => {
      this.responseComponent.trigger("Löschen des Bildes hat nicht funktioniert! Bitte erneut versuchen", false)
    })
  }
}
