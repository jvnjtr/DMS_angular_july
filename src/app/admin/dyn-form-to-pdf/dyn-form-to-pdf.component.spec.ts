import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynFormToPdfComponent } from './dyn-form-to-pdf.component';

describe('DynFormToPdfComponent', () => {
  let component: DynFormToPdfComponent;
  let fixture: ComponentFixture<DynFormToPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynFormToPdfComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynFormToPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
