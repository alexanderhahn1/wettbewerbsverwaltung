import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { SubmissionService } from './submission.service';
import {KeycloakService} from 'keycloak-angular';
import {MockKeycloakService} from '../../../test/mock-keycloak.service';
import {provideTestCore} from '../../../test/test-providers';

describe('SubmissionService', () => {
  let service: SubmissionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SubmissionService,
        provideTestCore(),
        { provide: KeycloakService, useClass: MockKeycloakService }
      ]
    });
    service = TestBed.inject(SubmissionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
