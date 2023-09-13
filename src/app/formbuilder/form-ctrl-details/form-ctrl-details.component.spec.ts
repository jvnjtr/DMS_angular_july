import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCtrlDetailsComponent } from './form-ctrl-details.component';

describe('FormCtrlDetailsComponent', () => {
  let component: FormCtrlDetailsComponent;
  let fixture: ComponentFixture<FormCtrlDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCtrlDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCtrlDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
