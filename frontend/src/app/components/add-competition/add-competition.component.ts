import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CompetitionService} from '../../services/competition/competition.service';
import {Competition} from '../../models/competition';
import {ResponseComponent} from '../response/response.component';
import {catchError, forkJoin, map, Observable, of} from 'rxjs';

@Component({
  selector: 'app-add-competition',
  imports: [
    ReactiveFormsModule,
    ResponseComponent
  ],
  templateUrl: './add-competition.component.html',
  styleUrl: './add-competition.component.css'
})
export class AddCompetitionComponent implements OnInit{
  @ViewChild('response') responseComponent!: ResponseComponent;
  competitionService : CompetitionService = inject(CompetitionService);
  addCompetitionForm!: FormGroup;

  selectedFiles: File[] = []
  selectedFileNames: string[] = []

  ngOnInit() {
    this.addCompetitionForm = new FormGroup({
      name: new FormControl('', Validators.required),
      school_year: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]{4}'),
      ]),
      deadline: new FormControl('', [Validators.required]),
      prize: new FormControl('', [Validators.required]),
      information_material: new FormControl('', [Validators.required]),
      submission_forms: new FormControl('', [Validators.required]),
      contact: new FormControl('', [Validators.required]),
      link: new FormControl('', [Validators.required])
    })
  }

  addCompetition(): void {
    const competitionData = this.addCompetitionForm.value;
    this.competitionService.addCompetition(competitionData).subscribe({
      next: (createdCompetition: Competition) => {
        if (createdCompetition && createdCompetition.name) {
          if (this.selectedFiles.length > 0) {
            this.competitionService
              .addImagesToCompetition(this.selectedFiles, createdCompetition.id)
              .subscribe({
                next: () => this.responseComponent.trigger('Bilder erfolgreich hochgeladen!'),
                error: (err) => {
                  console.error('Upload-Fehler:', err);
                  this.responseComponent.trigger('Fehler beim Hochladen der Bilder.');
                }
              });
          }
          this.responseComponent.trigger('Wettbewerb erfolgreich hinzugefügt!')
          this.addCompetitionForm.reset();
          this.selectedFiles = [];
          this.selectedFileNames = [];
        } else {
          this.responseComponent.trigger('Etwas hat nicht funktioniert!')
        }
      },
      error: (err) => {
        this.responseComponent.trigger('Fehler beim Hinzufügen des Wettbewerbs. Bitte versuche es erneut.')
      }
    });
    console.log(this.addCompetitionForm.value);
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFiles = Array.from(input.files);
      this.selectedFileNames = this.selectedFiles.map(f => f.name);
    } else {
      this.selectedFiles = []
      this.selectedFileNames = this.selectedFiles.map(f => f.name);
    }
  }

  addImages(competitionId: number): void {
    if (this.selectedFiles.length === 0) {
      return;
    }
    this.competitionService
      .addImagesToCompetition(this.selectedFiles, competitionId)
      .subscribe({
        next: () => {
          this.responseComponent.trigger('Bilder erfolgreich hochgeladen!');
        },
        error: (err) => {
          console.error('Upload-Fehler:', err);
          this.responseComponent.trigger('Fehler beim Hochladen der Bilder.');
        }
      });
  }
}
