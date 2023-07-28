import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportindexComponent } from './reportindex.component';

describe('ReportindexComponent', () => {
  let component: ReportindexComponent;
  let fixture: ComponentFixture<ReportindexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportindexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportindexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
