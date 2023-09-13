import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewsetRolePermissionComponent } from './viewset-role-permission.component';

describe('ViewsetRolePermissionComponent', () => {
  let component: ViewsetRolePermissionComponent;
  let fixture: ComponentFixture<ViewsetRolePermissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewsetRolePermissionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewsetRolePermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
