import {Component, inject, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {NgIf} from '@angular/common';
import {KeycloakOperationService} from '../../services/keycloak.service';

@Component({
  selector: 'app-nav-bar',
  imports: [
    RouterLink,
    NgIf,
    RouterLinkActive
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit{
  isProfileOpen = false
  isMobileMenuOpen = false
  keycloakService: KeycloakOperationService = inject(KeycloakOperationService);
  userProfile: any | null = null;

  ngOnInit() {
    this.keycloakService.getUserProfile().then((data: any) => {
      this.userProfile = data;
      console.table(this.userProfile);
    })
  }

  toggleProfileDropdown() {
    this.isProfileOpen = !this.isProfileOpen
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen
  }

  logout() {
    this.keycloakService.logout();
  }
}
