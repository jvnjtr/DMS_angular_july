import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDocInputsComponent } from './create-doc-inputs.component';

describe('CreateDocInputsComponent', () => {
  let component: CreateDocInputsComponent;
  let fixture: ComponentFixture<CreateDocInputsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateDocInputsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateDocInputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
