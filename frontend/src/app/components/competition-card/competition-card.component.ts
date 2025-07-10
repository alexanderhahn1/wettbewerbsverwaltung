import {Component, Input} from '@angular/core';
import {Competition} from '../../models/competition';
import {LinkifyPipe} from '../../pipes/linkify/linkify.pipe';
import {FormatSchoolYearPipe} from '../../pipes/format-school-year/format-school-year.pipe';

@Component({
  selector: 'app-competition-card',
  imports: [
    LinkifyPipe,
    FormatSchoolYearPipe
  ],
  templateUrl: './competition-card.component.html',
  styleUrl: './competition-card.component.css'
})
export class CompetitionCardComponent {
  @Input() competition!: Competition;
}
