import { TestBed } from '@angular/core/testing';

import { KeycloakOperationService } from './keycloak.service';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {KeycloakService} from 'keycloak-angular';
import {MockKeycloakService} from '../../../test/mock-keycloak.service';
import {provideTestCore} from '../../../test/test-providers';

describe('KeycloakService', () => {
  let service: KeycloakOperationService;

  beforeEach(() => {
    TestBed.configureTestingModule({providers: [
        KeycloakService,
        provideTestCore(),
        { provide: KeycloakService, useClass: MockKeycloakService }
      ]});
    service = TestBed.inject(KeycloakOperationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
