import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitionCardComponent } from './competition-card.component';
import {provideTestCore} from '../../../test/test-providers';

describe('CompetitionCardComponent', () => {
  let component: CompetitionCardComponent;
  let fixture: ComponentFixture<CompetitionCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompetitionCardComponent],
      providers: [
        ...provideTestCore()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompetitionCardComponent);
    component = fixture.componentInstance;

    // prevent ngOnInit crash (userOUs undefined in test env)
    component.userOUs = [] as any;
    component.competition = {
      id: 1,
      name: 'TestCompetition'
    } as any

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
