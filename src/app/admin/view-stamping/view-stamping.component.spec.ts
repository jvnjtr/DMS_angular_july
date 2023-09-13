import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStampingComponent } from './view-stamping.component';

describe('ViewStampingComponent', () => {
  let component: ViewStampingComponent;
  let fixture: ComponentFixture<ViewStampingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewStampingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewStampingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
