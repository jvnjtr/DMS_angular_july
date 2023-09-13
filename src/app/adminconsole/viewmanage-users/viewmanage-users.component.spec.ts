import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewmanageUsersComponent } from './viewmanage-users.component';

describe('ViewmanageUsersComponent', () => {
  let component: ViewmanageUsersComponent;
  let fixture: ComponentFixture<ViewmanageUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewmanageUsersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewmanageUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
