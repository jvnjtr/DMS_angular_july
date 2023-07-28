import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsgengineLibComponent } from './msgengine-lib.component';

describe('MsgengineLibComponent', () => {
  let component: MsgengineLibComponent;
  let fixture: ComponentFixture<MsgengineLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MsgengineLibComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MsgengineLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
