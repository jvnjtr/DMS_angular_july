import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfdemoComponent } from './pdfdemo.component';

describe('PdfdemoComponent', () => {
  let component: PdfdemoComponent;
  let fixture: ComponentFixture<PdfdemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PdfdemoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PdfdemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
