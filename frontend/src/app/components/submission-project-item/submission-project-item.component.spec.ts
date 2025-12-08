import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmissionProjectItemComponent } from './submission-project-item.component';

describe('SubmissionProjectItemComponent', () => {
  let component: SubmissionProjectItemComponent;
  let fixture: ComponentFixture<SubmissionProjectItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmissionProjectItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmissionProjectItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
