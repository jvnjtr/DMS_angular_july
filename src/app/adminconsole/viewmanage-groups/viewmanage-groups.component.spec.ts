import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewmanageGroupsComponent } from './viewmanage-groups.component';

describe('ViewmanageGroupsComponent', () => {
  let component: ViewmanageGroupsComponent;
  let fixture: ComponentFixture<ViewmanageGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewmanageGroupsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewmanageGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
