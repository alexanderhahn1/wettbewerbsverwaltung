import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentCompetitionsComponent } from './current-competitions.component';

describe('CurrentCompetitionsComponent', () => {
  let component: CurrentCompetitionsComponent;
  let fixture: ComponentFixture<CurrentCompetitionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrentCompetitionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentCompetitionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
