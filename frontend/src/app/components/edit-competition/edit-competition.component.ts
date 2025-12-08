import {Component, EventEmitter, inject, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Competition} from '../../models/competition';
import {AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {ResponseComponent} from '../response/response.component';
import {HttpClient} from '@angular/common/http';
import {CompetitionService} from '../../services/competition/competition.service';
import {Image} from '../../models/image';
import {of, switchMap} from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-edit-competition',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ResponseComponent
  ],
  templateUrl: './edit-competition.component.html',
  styleUrl: './edit-competition.component.css'
})
export class EditCompetitionComponent implements OnInit{
  @ViewChild('response') responseComponent!: ResponseComponent;
  competitionService: CompetitionService = inject(CompetitionService);
  @Input() competition!: Competition;
  @Output() closeModal = new EventEmitter<void>();
  editCompetitionForm!: FormGroup;

  existingImages: Image[] = [];
  newFiles: File[] = [];


  ngOnInit() {
    document.body.style.overflow = 'hidden';

    this.editCompetitionForm = new FormGroup({
      name: new FormControl(this.competition.name, [Validators.required]),
      is_active: new FormControl(this.competition.is_active, [Validators.required]),
      is_relevant: new FormControl(this.competition.is_relevant, [Validators.required]),
      is_not_relevant_info: new FormControl(this.competition.is_not_relevant_info, [Validators.required]),
      school_year: new FormControl(this.competition.school_year, [Validators.required, Validators.pattern('[0-9]{4}')]),
      deadline: new FormControl(this.competition.deadline, [Validators.required]),
      deadline_date: new FormControl(this.competition.deadline_date, [
        Validators.required,
        this.notPastDateValidator
      ]),
      prize: new FormControl(this.competition.prize, [Validators.required]),
      information_material: new FormControl(this.competition.information_material, [Validators.required]),
      submission_forms: new FormControl(this.competition.submission_forms, [Validators.required]),
      contact: new FormControl(this.competition.contact, [Validators.required]),
      link: new FormControl(this.competition.link, [Validators.required]),
    })

    this.competitionService.getImagesForCompetition(this.competition.id).subscribe(images => {
      this.existingImages = images
    })
  }

  close() {
    document.body.style.overflow = 'auto';
    this.closeModal.emit();
  }

  saveCompetition() {
    const updatedCompetition = {
      ...this.editCompetitionForm.value,
      id: this.competition.id
    }
    this.competitionService.updateCompetition(updatedCompetition).pipe(
      switchMap((comp: Competition) => {
        if (this.newFiles.length) {
          return this.competitionService.addImagesToCompetition(this.newFiles, this.competition.id).pipe(
            map(() => comp)
          );
        }
        return of(comp);
      })
    ).subscribe({
      next: (comp: Competition) => {
        this.responseComponent.trigger('Wettbewerb erfolgreich bearbeitet!', true);
        setTimeout(() => {
          this.competitionService.refreshCompetitionList.next(true);
          document.body.style.overflow = 'auto';
          this.closeModal.emit();
          this.competitionService.refreshCompetitionList.next(true);
        }, 500);
      },
      error: (err) => {
        this.responseComponent.trigger('Fehler beim Bearbeiten des Wettbewerbs. Bitte versuche es erneut.', false);
      }
    });
  }

  confirmDeleteCompetition() {
    const confirmed = window.confirm("Möchten Sie diesen Wettbewerb wirklich löschen?");
    if (confirmed) {
      this.responseComponent.trigger("Wettbewerb erfolgreich gelöscht!", true);
      this.deleteCompetition();
    }
  }

  deleteCompetition() {
    this.competitionService.deleteCompetition(this.competition)
    this.competitionService.refreshCompetitionList.next(true);
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
    this.competitionService.deleteImage(image.id).subscribe(() => {
      this.existingImages = this.existingImages.filter(i => i.id !== image.id)
    }, err => {
      this.responseComponent.trigger("Löschen des Bildes hat nicht funktioniert! Bitte erneut versuchen", false)
    })
  }

  notPastDateValidator(control: AbstractControl) {
    const selectedDate = new Date(control.value)
    const today = new Date()
    if (selectedDate < today) {
      return { pastDate: true }
    }
    return null
  }
}
