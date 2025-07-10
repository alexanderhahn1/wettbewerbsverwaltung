import {Component, inject, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {KeycloakOperationService} from '../../services/keycloak/keycloak.service';

@Component({
  selector: 'app-nav-bar',
  imports: [
    RouterLink,
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
  userInitials: string | null = null;
  isUserAdmin: boolean = false;

  ngOnInit() {
    this.keycloakService.getUserProfile().then((data: any) => {
      this.userProfile = data;
      this.userInitials = this.userProfile.firstName.substring(0,1) + this.userProfile.lastName.substring(0,1);
      console.table(this.userProfile);
      if (this.userProfile.username == "admin") {
        this.isUserAdmin = true;
      }
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
