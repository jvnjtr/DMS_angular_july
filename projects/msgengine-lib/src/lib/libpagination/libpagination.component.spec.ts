import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibpaginationComponent } from './libpagination.component';

describe('LibpaginationComponent', () => {
  let component: LibpaginationComponent;
  let fixture: ComponentFixture<LibpaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibpaginationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibpaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
