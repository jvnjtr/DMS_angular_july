import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicformspreviewComponent } from './dynamicformspreview.component';

describe('DynamicformspreviewComponent', () => {
  let component: DynamicformspreviewComponent;
  let fixture: ComponentFixture<DynamicformspreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicformspreviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicformspreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
