import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigSignatureComponent } from './config-signature.component';

describe('ConfigSignatureComponent', () => {
  let component: ConfigSignatureComponent;
  let fixture: ComponentFixture<ConfigSignatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigSignatureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigSignatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
