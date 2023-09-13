import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewmanageEmployeeTypeComponent } from './viewmanage-employee-type.component';

describe('ViewmanageEmployeeTypeComponent', () => {
  let component: ViewmanageEmployeeTypeComponent;
  let fixture: ComponentFixture<ViewmanageEmployeeTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewmanageEmployeeTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewmanageEmployeeTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
