import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCompetitionComponent } from './edit-competition.component';
import {provideTestCore} from '../../../test/test-providers';
import { of } from 'rxjs'
import { CompetitionService } from '../../services/competition/competition.service'

describe('EditCompetitionComponent', () => {
  let component: EditCompetitionComponent;
  let fixture: ComponentFixture<EditCompetitionComponent>;



  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditCompetitionComponent],
      providers: [
        ...provideTestCore(),
        {
          provide: CompetitionService,
          useValue: {
            getImagesForCompetition: () => of([]),
            updateCompetition: () => of({ id: 1, name: 'Test Competition' }),
            addImagesToCompetition: () => of(null),
            deleteCompetition: () => {},
            deleteImage: () => of(null),
            refreshCompetitionList: { next: () => {} }
          }
        }
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(EditCompetitionComponent)
    component = fixture.componentInstance

    // REQUIRED INPUT
    component.competition = {
      id: 1,
      name: 'Test Competition',
      is_active: true,
      is_relevant: true,
      is_not_relevant_info: false,
      school_year: '2025',
      deadline: 'Soon',
      deadline_date: new Date().toISOString(),
      prize: 'Prize',
      information_material: 'Info',
      submission_forms: 'Forms',
      contact: 'Contact',
      link: 'https://test.com'
    } as any

    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
