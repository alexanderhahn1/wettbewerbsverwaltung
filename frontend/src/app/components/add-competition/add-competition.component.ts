import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CompetitionService} from '../../services/competition/competition.service';
import {Competition} from '../../models/competition';
import {ResponseComponent} from '../response/response.component';

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
      is_active: new FormControl(false, [Validators.required]),
      is_relevant: new FormControl(false, [Validators.required]),
      is_not_relevant_info: new FormControl('', [Validators.required]),
      school_year: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]{4}'),
      ]),
      deadline: new FormControl('', [Validators.required]),
      deadline_date: new FormControl('', [
        Validators.required,
        this.notPastDateValidator
      ]),
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
                next: () => this.responseComponent.trigger('Bilder erfolgreich hochgeladen!', true),
                error: (err) => {
                  console.error('Upload-Fehler:', err);
                  this.responseComponent.trigger('Fehler beim Hochladen der Bilder.', false);
                }
              });
          }
          this.responseComponent.trigger('Wettbewerb erfolgreich hinzugefügt!', true)
          this.addCompetitionForm.reset();
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
    //console.log(this.addCompetitionForm.value);
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

  /*
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
  */

  notPastDateValidator(control: AbstractControl) {
    const selectedDate = new Date(control.value)
    const today = new Date()
    if (selectedDate < today) {
      return { pastDate: true }
    }
    return null
  }
}

