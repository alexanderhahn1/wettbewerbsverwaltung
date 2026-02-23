import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProjectComponent } from './edit-project.component';
import {provideTestCore} from '../../../test/test-providers';

import { of } from 'rxjs'
import { CompetitionService } from '../../services/competition/competition.service'
import { ProjectService } from '../../services/project/project.service'

describe('EditProjectComponent', () => {
  let component: EditProjectComponent;
  let fixture: ComponentFixture<EditProjectComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditProjectComponent],
      providers: [
        ...provideTestCore(),
        {
          provide: CompetitionService,
          useValue: {
            getAllCompetitions: () => of([])
          }
        },
        {
          provide: ProjectService,
          useValue: {
            getImagesForProject: () => of([]),
            updateProject: () => of({ id: 1, name: 'Test Project' }),
            addImagesToProject: () => of(null),
            deleteProject: () => {},
            deleteImage: () => of(null),
            refreshProjectList: { next: () => {} }
          }
        }
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(EditProjectComponent)
    component = fixture.componentInstance

    // REQUIRED INPUT
    component.project = {
      id: 1,
      name: 'Test Project',
      status: 'ACTIVE',
      next_step: 'Next step',
      contributors: 'Tester',
      competition_id: 1
    } as any

    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
