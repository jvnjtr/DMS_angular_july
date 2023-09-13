import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CkeditornewComponent } from './ckeditornew.component';

describe('CkeditornewComponent', () => {
  let component: CkeditornewComponent;
  let fixture: ComponentFixture<CkeditornewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CkeditornewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CkeditornewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
