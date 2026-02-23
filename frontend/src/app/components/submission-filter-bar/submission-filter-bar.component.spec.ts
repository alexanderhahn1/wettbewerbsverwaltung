import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmissionFilterBarComponent } from './submission-filter-bar.component';
import {provideTestCore} from '../../../test/test-providers';

describe('SubmissionFilterBarComponent', () => {
  let component: SubmissionFilterBarComponent;
  let fixture: ComponentFixture<SubmissionFilterBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmissionFilterBarComponent],
      providers: [
        ...provideTestCore()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmissionFilterBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
