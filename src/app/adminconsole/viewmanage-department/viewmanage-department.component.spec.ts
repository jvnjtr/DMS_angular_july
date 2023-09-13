import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewmanageDepartmentComponent } from './viewmanage-department.component';

describe('ViewmanageDepartmentComponent', () => {
  let component: ViewmanageDepartmentComponent;
  let fixture: ComponentFixture<ViewmanageDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewmanageDepartmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewmanageDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
