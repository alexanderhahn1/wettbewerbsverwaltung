import {Component, ElementRef, HostListener, inject, OnInit} from '@angular/core';
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

  constructor(private eRef: ElementRef) {}

  ngOnInit() {
    this.keycloakService.getUserProfile().then((data: any) => {
      this.userProfile = data;
      this.userInitials = this.userProfile.firstName.substring(0,1) + this.userProfile.lastName.substring(0,1);
      //console.table(this.userProfile);
      if (this.keycloakService.getUserRoles().includes('admin')) {
        this.isUserAdmin = true;
      }
    })
  }

  toggleProfileDropdown() {
    this.isProfileOpen = !this.isProfileOpen
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.isProfileOpen = false;
    }
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen
  }

  logout() {
    this.keycloakService.logout();
  }

  closeLogoutIfOpened() {
    if (this.isProfileOpen) {
      this.isProfileOpen = false;
    }
  }
}
