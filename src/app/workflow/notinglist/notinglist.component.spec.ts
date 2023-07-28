import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotinglistComponent } from './notinglist.component';

describe('NotinglistComponent', () => {
  let component: NotinglistComponent;
  let fixture: ComponentFixture<NotinglistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotinglistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotinglistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
