import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllsharedfilesComponent } from './allsharedfiles.component';

describe('AllsharedfilesComponent', () => {
  let component: AllsharedfilesComponent;
  let fixture: ComponentFixture<AllsharedfilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllsharedfilesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllsharedfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
