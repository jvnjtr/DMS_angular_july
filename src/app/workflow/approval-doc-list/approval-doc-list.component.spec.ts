import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalDocListComponent } from './approval-doc-list.component';

describe('ApprovalDocListComponent', () => {
  let component: ApprovalDocListComponent;
  let fixture: ComponentFixture<ApprovalDocListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovalDocListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApprovalDocListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
