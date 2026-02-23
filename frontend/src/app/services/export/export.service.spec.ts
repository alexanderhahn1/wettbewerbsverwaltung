import { TestBed } from '@angular/core/testing';

import { ExportService } from './export.service';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {KeycloakService} from 'keycloak-angular';
import {MockKeycloakService} from '../../../test/mock-keycloak.service';
import {provideTestCore} from '../../../test/test-providers';

describe('ExportService', () => {
  let service: ExportService;

  beforeEach(() => {
    TestBed.configureTestingModule({providers: [
        ExportService,
        provideTestCore(),
        { provide: KeycloakService, useClass: MockKeycloakService }
      ]});
    service = TestBed.inject(ExportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
