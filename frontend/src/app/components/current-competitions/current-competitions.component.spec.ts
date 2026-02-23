import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentCompetitionsComponent } from './current-competitions.component';
import {provideTestCore} from '../../../test/test-providers';

describe('CurrentCompetitionsComponent', () => {
  let component: CurrentCompetitionsComponent;
  let fixture: ComponentFixture<CurrentCompetitionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrentCompetitionsComponent],
      providers: [
        ...provideTestCore()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentCompetitionsComponent);
    component = fixture.componentInstance;

    component.competitions = []

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
