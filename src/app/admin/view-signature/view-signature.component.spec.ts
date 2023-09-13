import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSignatureComponent } from './view-signature.component';

describe('ViewSignatureComponent', () => {
  let component: ViewSignatureComponent;
  let fixture: ComponentFixture<ViewSignatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSignatureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewSignatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
