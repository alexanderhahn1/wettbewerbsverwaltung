import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportFilterBarComponent } from './export-filter-bar.component';
import {provideTestCore} from '../../../test/test-providers';

describe('ExportFilterBarComponent', () => {
  let component: ExportFilterBarComponent;
  let fixture: ComponentFixture<ExportFilterBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExportFilterBarComponent],
      providers: [
        ...provideTestCore()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExportFilterBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
