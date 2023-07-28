import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewalllanguagesComponent } from './viewalllanguages.component';

describe('ViewalllanguagesComponent', () => {
  let component: ViewalllanguagesComponent;
  let fixture: ComponentFixture<ViewalllanguagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewalllanguagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewalllanguagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
