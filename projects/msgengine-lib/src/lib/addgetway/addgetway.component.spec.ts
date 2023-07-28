import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddgetwayComponent } from './addgetway.component';

describe('AddgetwayComponent', () => {
  let component: AddgetwayComponent;
  let fixture: ComponentFixture<AddgetwayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddgetwayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddgetwayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
