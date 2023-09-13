import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalertComponent } from './calert.component';

describe('CalertComponent', () => {
  let component: CalertComponent;
  let fixture: ComponentFixture<CalertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalertComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
