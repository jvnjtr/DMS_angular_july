import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminconsoledashboardComponent } from './adminconsoledashboard.component';

describe('AdminconsoledashboardComponent', () => {
  let component: AdminconsoledashboardComponent;
  let fixture: ComponentFixture<AdminconsoledashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminconsoledashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminconsoledashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
