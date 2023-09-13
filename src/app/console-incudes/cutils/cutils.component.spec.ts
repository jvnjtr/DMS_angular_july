import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CutilsComponent } from './cutils.component';

describe('CutilsComponent', () => {
  let component: CutilsComponent;
  let fixture: ComponentFixture<CutilsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CutilsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CutilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
