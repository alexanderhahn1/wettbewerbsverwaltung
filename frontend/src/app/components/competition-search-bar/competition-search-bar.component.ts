import {Component, inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {CompetitionService} from '../../services/competition/competition.service';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-competition-search-bar',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './competition-search-bar.component.html',
  styleUrl: './competition-search-bar.component.css'
})
export class CompetitionSearchBarComponent implements OnInit {
  competitionService: CompetitionService = inject(CompetitionService);
  searchCompetitionsForm!: FormGroup;
  isRelevantOnly = false

  showError = false;
  competitionName: string = "";

  ngOnInit() {
    this.searchCompetitionsForm = new FormGroup({
      competitionName: new FormControl('')
    });
  }

  searchCompetitions() {
    if (this.searchCompetitionsForm.valid) {
      const rawValue = this.searchCompetitionsForm.value.competitionName ?? '';
      this.competitionName = rawValue.trim();

      if (this.competitionName.length > 0) {
        this.competitionService.searchCompetitionsSubject.next(this.competitionName.toLowerCase());
      } else {
        this.resetSearch();
      }

      //console.log(this.competitionName);
    }
  }

  resetSearch() {
    this.searchCompetitionsForm.get('competitionName')?.setValue('');
    this.competitionService.resetSearchCompetitionsSubject.next(true);
  }

  toggleRelevanceFilter() {
    this.isRelevantOnly = !this.isRelevantOnly
    this.competitionService.isCompetitionRelevantSubject.next(this.isRelevantOnly);
  }
}
