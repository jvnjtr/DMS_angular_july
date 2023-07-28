import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewmsgreminderComponent } from './viewmsgreminder.component';

describe('ViewmsgreminderComponent', () => {
  let component: ViewmsgreminderComponent;
  let fixture: ComponentFixture<ViewmsgreminderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewmsgreminderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewmsgreminderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
