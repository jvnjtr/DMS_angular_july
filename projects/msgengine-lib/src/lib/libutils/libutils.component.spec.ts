import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibutilsComponent } from './libutils.component';

describe('LibutilsComponent', () => {
  let component: LibutilsComponent;
  let fixture: ComponentFixture<LibutilsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibutilsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibutilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
