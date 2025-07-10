import {Component, inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {CompetitionService} from '../../services/competition/competition.service';

@Component({
  selector: 'app-competition-search-bar',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './competition-search-bar.component.html',
  styleUrl: './competition-search-bar.component.css'
})
export class CompetitionSearchBarComponent implements OnInit {
  competitionService: CompetitionService = inject(CompetitionService);
  searchCompetitionsForm!: FormGroup;
  showError = false;
  competitionName: string = "";
  ngOnInit() {
    this.searchCompetitionsForm = new FormGroup({
      competitionName: new FormControl('')
    });
  }

  searchCompetitions() {
    if (this.searchCompetitionsForm.valid) {
      this.competitionName = this.searchCompetitionsForm.value.competitionName;
      if(this.competitionName.length > 0){
        this.competitionService.searchCompetitionsSubject.next(this.competitionName);
      } else {
        this.resetSearch();
      }
      console.log(this.searchCompetitionsForm.value.competitionName);
    }
  }

  resetSearch() {
    this.searchCompetitionsForm.get('competitionName')?.setValue('');
    this.competitionService.resetSearchCompetitionsSubject.next(true);
  }
}
