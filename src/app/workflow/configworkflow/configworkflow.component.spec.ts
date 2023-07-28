import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigworkflowComponent } from './configworkflow.component';

describe('ConfigworkflowComponent', () => {
  let component: ConfigworkflowComponent;
  let fixture: ComponentFixture<ConfigworkflowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigworkflowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigworkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
