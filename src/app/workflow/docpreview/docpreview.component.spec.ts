import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocpreviewComponent } from './docpreview.component';

describe('DocpreviewComponent', () => {
  let component: DocpreviewComponent;
  let fixture: ComponentFixture<DocpreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocpreviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocpreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
