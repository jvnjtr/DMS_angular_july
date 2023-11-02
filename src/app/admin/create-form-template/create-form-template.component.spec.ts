import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFormTemplateComponent } from './create-form-template.component';

describe('CreateFormTemplateComponent', () => {
  let component: CreateFormTemplateComponent;
  let fixture: ComponentFixture<CreateFormTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateFormTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateFormTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
