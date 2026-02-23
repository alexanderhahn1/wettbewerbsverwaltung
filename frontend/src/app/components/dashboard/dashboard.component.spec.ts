import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import {provideTestCore} from '../../../test/test-providers';
import {CompetitionService} from '../../services/competition/competition.service';
import {of} from 'rxjs';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [
        ...provideTestCore(),
        {
          provide: CompetitionService,
          useValue: {
            getRandomCompetition: () =>
              of({id: 1, name: 'TestCompetition'}),
            getImagesForCompetition: () => of([])
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;

    // prevent ngOnInit crash (userOUs undefined in test env)
    component.userOUs = [] as any;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
