import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMetaComponent } from './view-meta.component';

describe('ViewMetaComponent', () => {
  let component: ViewMetaComponent;
  let fixture: ComponentFixture<ViewMetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewMetaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewMetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
