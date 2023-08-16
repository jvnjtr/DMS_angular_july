import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigOCRComponent } from './config-ocr.component';

describe('ConfigOCRComponent', () => {
  let component: ConfigOCRComponent;
  let fixture: ComponentFixture<ConfigOCRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigOCRComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigOCRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
