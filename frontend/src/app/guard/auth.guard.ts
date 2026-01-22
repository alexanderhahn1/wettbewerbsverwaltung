import {inject, Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot, UrlTree,
} from '@angular/router';
import {KeycloakAuthGuard, KeycloakService} from 'keycloak-angular';
import {KeycloakOperationService} from '../services/keycloak/keycloak.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard extends KeycloakAuthGuard {
  keycloakService: KeycloakOperationService = inject(KeycloakOperationService);
  constructor(
    protected override readonly router: Router,
    protected readonly keycloak: KeycloakService
  ) {
    super(router, keycloak);
  }

  public async isAccessAllowed(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    if (!this.authenticated) {
      await this.keycloak.login({
        redirectUri: window.location.origin + state.url,
      });
      return false;
    }

    const requiredRoles = route.data['roles'] as string[];
    const userOUS = this.keycloakService.getUserOUS()
    if (!Array.isArray(requiredRoles) || requiredRoles.length === 0) {
      return true;
    }
    let isRouteAllowed = false;
    for (let ou of userOUS) {
      if (ou == "Students") {
        isRouteAllowed = true;
      }
    }
    if (!isRouteAllowed) {
      this.router.navigate(['/not-authorized']);
      return false;
    }

    return true;
  }
}
