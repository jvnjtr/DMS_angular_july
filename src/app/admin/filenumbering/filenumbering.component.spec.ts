import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilenumberingComponent } from './filenumbering.component';

describe('FilenumberingComponent', () => {
  let component: FilenumberingComponent;
  let fixture: ComponentFixture<FilenumberingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilenumberingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilenumberingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
