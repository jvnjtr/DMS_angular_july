import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocPrevOnlyComponent } from './doc-prev-only.component';

describe('DocPrevOnlyComponent', () => {
  let component: DocPrevOnlyComponent;
  let fixture: ComponentFixture<DocPrevOnlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocPrevOnlyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocPrevOnlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
