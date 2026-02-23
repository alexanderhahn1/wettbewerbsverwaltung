import { TestBed } from '@angular/core/testing';

import { CompetitionService } from './competition.service';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {KeycloakService} from 'keycloak-angular';
import {MockKeycloakService} from '../../../test/mock-keycloak.service';
import {provideTestCore} from '../../../test/test-providers';

describe('CompetitionService', () => {
  let service: CompetitionService;

  beforeEach(() => {
    TestBed.configureTestingModule({providers: [
        CompetitionService,
        provideTestCore(),
        { provide: KeycloakService, useClass: MockKeycloakService }
      ]});
    service = TestBed.inject(CompetitionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
