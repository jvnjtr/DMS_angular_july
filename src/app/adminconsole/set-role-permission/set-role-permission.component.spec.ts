import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetRolePermissionComponent } from './set-role-permission.component';

describe('SetRolePermissionComponent', () => {
  let component: SetRolePermissionComponent;
  let fixture: ComponentFixture<SetRolePermissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetRolePermissionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetRolePermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
