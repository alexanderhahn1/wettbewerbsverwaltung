import {Component, inject, OnInit} from '@angular/core';
import {KeycloakOperationService} from '../../services/keycloak/keycloak.service';
import {NavBarComponent} from '../nav-bar/nav-bar.component';
import {RouterOutlet} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  keycloakService: KeycloakOperationService = inject(KeycloakOperationService);
  userProfile: any | null = null;

  ngOnInit() {
    this.keycloakService.getUserProfile().then((data: any) => {
      this.userProfile = data;
      console.table(this.userProfile);
    })
  }

  logout() {
    this.keycloakService.logout();
  }
}
