import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageEmployeeTypeComponent } from './manage-employee-type.component';

describe('ManageEmployeeTypeComponent', () => {
  let component: ManageEmployeeTypeComponent;
  let fixture: ComponentFixture<ManageEmployeeTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageEmployeeTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageEmployeeTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
