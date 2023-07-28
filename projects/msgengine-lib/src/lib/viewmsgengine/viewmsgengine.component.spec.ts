import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewmsgengineComponent } from './viewmsgengine.component';

describe('ViewmsgengineComponent', () => {
  let component: ViewmsgengineComponent;
  let fixture: ComponentFixture<ViewmsgengineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewmsgengineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewmsgengineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
