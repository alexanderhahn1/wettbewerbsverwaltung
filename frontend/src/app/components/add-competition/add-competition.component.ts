import {Component, inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CompetitionService} from '../../services/competition/competition.service';
import {Competition} from '../../models/competition';

@Component({
  selector: 'app-add-competition',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './add-competition.component.html',
  styleUrl: './add-competition.component.css'
})
export class AddCompetitionComponent implements OnInit{
  competitionService : CompetitionService = inject(CompetitionService);
  addCompetitionForm!: FormGroup;

  ngOnInit() {
    this.addCompetitionForm = new FormGroup({
      name: new FormControl('', Validators.required),
      schoolYear: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]{4}'),
      ]),
      deadline: new FormControl('', [Validators.required]),
      prize: new FormControl('', [Validators.required]),
      informationMaterial: new FormControl('', [Validators.required]),
      submissionForms: new FormControl('', [Validators.required]),
      contact: new FormControl('', [Validators.required]),
      link: new FormControl('', [Validators.required])
    })
  }

  addCompetition(): void {
    const competition: Competition = this.addCompetitionForm.value;
    console.log(this.competitionService.addCompetition(competition).subscribe());
    console.log(this.addCompetitionForm.value);
  }
}
