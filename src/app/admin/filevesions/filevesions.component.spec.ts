import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilevesionsComponent } from './filevesions.component';

describe('FilevesionsComponent', () => {
  let component: FilevesionsComponent;
  let fixture: ComponentFixture<FilevesionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilevesionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilevesionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
