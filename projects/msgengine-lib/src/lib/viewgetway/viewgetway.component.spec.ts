import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewgetwayComponent } from './viewgetway.component';

describe('ViewgetwayComponent', () => {
  let component: ViewgetwayComponent;
  let fixture: ComponentFixture<ViewgetwayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewgetwayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewgetwayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
