import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WindowPrevComponent } from './window-prev.component';

describe('WindowPrevComponent', () => {
  let component: WindowPrevComponent;
  let fixture: ComponentFixture<WindowPrevComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WindowPrevComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WindowPrevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
