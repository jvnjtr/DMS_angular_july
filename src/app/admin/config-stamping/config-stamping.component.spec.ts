import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigStampingComponent } from './config-stamping.component';

describe('ConfigStampingComponent', () => {
  let component: ConfigStampingComponent;
  let fixture: ComponentFixture<ConfigStampingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigStampingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigStampingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
