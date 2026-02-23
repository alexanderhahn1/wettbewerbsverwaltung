import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangesComponent } from './changes.component';
import {provideTestCore} from '../../../test/test-providers';

describe('ChangesComponent', () => {
  let component: ChangesComponent;
  let fixture: ComponentFixture<ChangesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangesComponent],
      providers: [
        ...provideTestCore()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
