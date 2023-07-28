import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovetofolderComponent } from './movetofolder.component';

describe('MovetofolderComponent', () => {
  let component: MovetofolderComponent;
  let fixture: ComponentFixture<MovetofolderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovetofolderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovetofolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
