import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormToPdfComponent } from './dynamic-form-to-pdf.component';

describe('DynamicFormToPdfComponent', () => {
  let component: DynamicFormToPdfComponent;
  let fixture: ComponentFixture<DynamicFormToPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicFormToPdfComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicFormToPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
