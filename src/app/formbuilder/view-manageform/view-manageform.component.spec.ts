import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewManageformComponent } from './view-manageform.component';

describe('ViewManageformComponent', () => {
  let component: ViewManageformComponent;
  let fixture: ComponentFixture<ViewManageformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewManageformComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewManageformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
