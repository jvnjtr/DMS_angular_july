import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewmanageRoleComponent } from './viewmanage-role.component';

describe('ViewmanageRoleComponent', () => {
  let component: ViewmanageRoleComponent;
  let fixture: ComponentFixture<ViewmanageRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewmanageRoleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewmanageRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
