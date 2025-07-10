import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitionSearchBarComponent } from './competition-search-bar.component';

describe('CompetitionSearchBarComponent', () => {
  let component: CompetitionSearchBarComponent;
  let fixture: ComponentFixture<CompetitionSearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompetitionSearchBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompetitionSearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
