import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewdraftdocumentComponent } from './viewdraftdocument.component';

describe('ViewdraftdocumentComponent', () => {
  let component: ViewdraftdocumentComponent;
  let fixture: ComponentFixture<ViewdraftdocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewdraftdocumentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewdraftdocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
