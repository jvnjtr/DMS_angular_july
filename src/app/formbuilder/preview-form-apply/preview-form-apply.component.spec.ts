import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewFormApplyComponent } from './preview-form-apply.component';

describe('PreviewFormApplyComponent', () => {
  let component: PreviewFormApplyComponent;
  let fixture: ComponentFixture<PreviewFormApplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewFormApplyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviewFormApplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
