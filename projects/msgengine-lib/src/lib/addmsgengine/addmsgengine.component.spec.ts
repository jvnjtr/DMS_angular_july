import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddmsgengineComponent } from './addmsgengine.component';

describe('AddmsgengineComponent', () => {
  let component: AddmsgengineComponent;
  let fixture: ComponentFixture<AddmsgengineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddmsgengineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddmsgengineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
