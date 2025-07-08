import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  imports: [
    RouterLink,
    NgIf
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  isProfileOpen = false
  isMobileMenuOpen = false

  toggleProfileDropdown() {
    this.isProfileOpen = !this.isProfileOpen
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen
  }
}
