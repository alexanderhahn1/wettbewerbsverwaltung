import {Component, inject, Input, OnInit} from '@angular/core';
import {Competition} from '../../models/competition';
import {LinkifyPipe} from '../../pipes/linkify/linkify.pipe';
import {FormatSchoolYearPipe} from '../../pipes/format-school-year/format-school-year.pipe';
import {KeycloakService} from 'keycloak-angular';
import {EditCompetitionComponent} from '../edit-competition/edit-competition.component';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-competition-card',
  imports: [
    LinkifyPipe,
    FormatSchoolYearPipe,
    EditCompetitionComponent,
    RouterLink
  ],
  templateUrl: './competition-card.component.html',
  styleUrl: './competition-card.component.css'
})
export class CompetitionCardComponent implements OnInit {
  @Input() competition!: Competition;
  @Input() isEditable!: boolean;
  keycloakService: KeycloakService = inject(KeycloakService);
  showEditImage: boolean = false;
  isModalOpen: boolean = false;

  ngOnInit() {
    if (this.keycloakService.getUserRoles().includes('admin') && this.isEditable) {
      this.showEditImage = true;
    }
  }

  handleBtnEditCompetition() {
    this.isModalOpen = true;
  }
}
