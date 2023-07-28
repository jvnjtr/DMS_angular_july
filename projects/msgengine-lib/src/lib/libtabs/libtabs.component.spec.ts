import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibtabsComponent } from './libtabs.component';

describe('LibtabsComponent', () => {
  let component: LibtabsComponent;
  let fixture: ComponentFixture<LibtabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibtabsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibtabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
