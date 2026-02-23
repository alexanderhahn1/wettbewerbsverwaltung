import { TestBed } from '@angular/core/testing';

import { ProjectService } from './project.service';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {KeycloakService} from 'keycloak-angular';
import {MockKeycloakService} from '../../../test/mock-keycloak.service';
import {provideTestCore} from '../../../test/test-providers';

describe('ProjectService', () => {
  let service: ProjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProjectService,
        provideTestCore(),
        { provide: KeycloakService, useClass: MockKeycloakService }
      ]
    });
    service = TestBed.inject(ProjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
