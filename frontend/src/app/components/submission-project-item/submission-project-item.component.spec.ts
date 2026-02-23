import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmissionProjectItemComponent } from './submission-project-item.component';
import {provideTestCore} from '../../../test/test-providers';
import {ProjectService} from '../../services/project/project.service';
import {of} from 'rxjs';

describe('SubmissionProjectItemComponent', () => {
  let component: SubmissionProjectItemComponent;
  let fixture: ComponentFixture<SubmissionProjectItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmissionProjectItemComponent],
      providers: [
        ...provideTestCore(),
        {
          provide: ProjectService,
          useValue: {
            getImagesForProject: () => of([])
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmissionProjectItemComponent);
    component = fixture.componentInstance;

    // prevent ngOnInit crash (userOUs undefined in test env)
    component.userOUs = [] as any;
    component.project = {
      id: 1,
      name: 'Test Project',
      status: 'ACTIVE',
      next_step: 'Next step',
      contributors: 'Tester',
      competition_id: 1
    } as any

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
