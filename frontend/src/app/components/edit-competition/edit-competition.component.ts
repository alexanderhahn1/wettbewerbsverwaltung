import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Competition} from '../../models/competition';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {ResponseComponent} from '../response/response.component';

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
  @Input() competition!: Competition;
  @Output() closeModal = new EventEmitter<void>();
  editCompetitionForm!: FormGroup;

  ngOnInit() {
    this.editCompetitionForm = new FormGroup({
      name: new FormControl(this.competition.name, [Validators.required]),
      school_year: new FormControl(this.competition.school_year, [Validators.required, Validators.pattern('[0-9]{4}')]),
      deadline: new FormControl(this.competition.deadline, [Validators.required]),
      prize: new FormControl(this.competition.prize, [Validators.required]),
      information_material: new FormControl(this.competition.information_material, [Validators.required]),
      submission_forms: new FormControl(this.competition.submission_forms, [Validators.required]),
      contact: new FormControl(this.competition.contact, [Validators.required]),
      link: new FormControl(this.competition.link, [Validators.required]),
    })
  }

  close() {
    this.closeModal.emit();
  }

  saveCompetition() {

  }
}
