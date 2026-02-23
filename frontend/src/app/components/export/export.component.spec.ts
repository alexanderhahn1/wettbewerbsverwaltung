import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportComponent } from './export.component';
import {provideTestCore} from '../../../test/test-providers';

describe('ExportComponent', () => {
  let component: ExportComponent;
  let fixture: ComponentFixture<ExportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExportComponent],
      providers: [
        ...provideTestCore()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
