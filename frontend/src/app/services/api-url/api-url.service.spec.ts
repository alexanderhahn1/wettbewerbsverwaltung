import { TestBed } from '@angular/core/testing';

import { ApiUrlService } from './api-url.service';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {KeycloakService} from 'keycloak-angular';
import {MockKeycloakService} from '../../../test/mock-keycloak.service';
import {provideTestCore} from '../../../test/test-providers';

describe('ApiUrlService', () => {
  let service: ApiUrlService;

  beforeEach(() => {
    TestBed.configureTestingModule({providers: [
        ApiUrlService,
        provideTestCore(),
        { provide: KeycloakService, useClass: MockKeycloakService }
      ]});
    service = TestBed.inject(ApiUrlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
