import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingDoclistComponent } from './pending-doclist.component';

describe('PendingDoclistComponent', () => {
  let component: PendingDoclistComponent;
  let fixture: ComponentFixture<PendingDoclistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingDoclistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingDoclistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
