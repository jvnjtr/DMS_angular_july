import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewmanageDesignationComponent } from './viewmanage-designation.component';

describe('ViewmanageDesignationComponent', () => {
  let component: ViewmanageDesignationComponent;
  let fixture: ComponentFixture<ViewmanageDesignationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewmanageDesignationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewmanageDesignationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
