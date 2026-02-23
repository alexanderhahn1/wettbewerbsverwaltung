import { provideHttpClientTesting } from '@angular/common/http/testing'
import { provideRouter } from '@angular/router'
import { KeycloakService } from 'keycloak-angular'
import { MockKeycloakService } from './mock-keycloak.service'
import {provideHttpClient} from '@angular/common/http';

export function provideTestCore() {
  return [
    provideHttpClient(),
    provideHttpClientTesting(),
    provideRouter([]),
    { provide: KeycloakService, useClass: MockKeycloakService }
  ]
}
