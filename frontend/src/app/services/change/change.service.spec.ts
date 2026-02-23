import { TestBed } from '@angular/core/testing';

import { ChangeService } from './change.service';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {KeycloakService} from 'keycloak-angular';
import {MockKeycloakService} from '../../../test/mock-keycloak.service';
import {provideTestCore} from '../../../test/test-providers';

describe('ChangeService', () => {
  let service: ChangeService;

  beforeEach(() => {
    TestBed.configureTestingModule({providers: [
        ChangeService,
        provideTestCore(),
        { provide: KeycloakService, useClass: MockKeycloakService }
      ]});
    service = TestBed.inject(ChangeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
