import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitionsListComponent } from './competitions-list.component';
import {provideTestCore} from '../../../test/test-providers';

describe('CompetitionsListComponent', () => {
  let component: CompetitionsListComponent;
  let fixture: ComponentFixture<CompetitionsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompetitionsListComponent],
      providers: [
        ...provideTestCore()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompetitionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
