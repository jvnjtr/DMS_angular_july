import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTemplateConfigComponent } from './view-template-config.component';

describe('ViewTemplateConfigComponent', () => {
  let component: ViewTemplateConfigComponent;
  let fixture: ComponentFixture<ViewTemplateConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTemplateConfigComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewTemplateConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
