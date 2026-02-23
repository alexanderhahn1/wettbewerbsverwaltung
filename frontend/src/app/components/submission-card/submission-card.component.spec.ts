import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmissionCardComponent } from './submission-card.component';
import {provideTestCore} from '../../../test/test-providers';

describe('SubmissionCardComponent', () => {
  let component: SubmissionCardComponent;
  let fixture: ComponentFixture<SubmissionCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmissionCardComponent],
      providers: [
        ...provideTestCore()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmissionCardComponent);
    component = fixture.componentInstance;

    // provide required @Input to prevent template crash
    component.submission = {
      id: 1,
      name: 'Test Submission',
      projects: [{
        id: 1,
        name: 'Test Project',
        status: 'ACTIVE',
        next_step: '',
        contributors: '',
        competition_id: 1,
        images: []
      }],
      school_year: '00/01',
      last_update: Date.now()
    } as any;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
