import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitionSearchBarComponent } from './competition-search-bar.component';
import {provideTestCore} from '../../../test/test-providers';

describe('CompetitionSearchBarComponent', () => {
  let component: CompetitionSearchBarComponent;
  let fixture: ComponentFixture<CompetitionSearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompetitionSearchBarComponent],
      providers: [
        ...provideTestCore()
      ]
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
