import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguagelabelsComponent } from './languagelabels.component';

describe('LanguagelabelsComponent', () => {
  let component: LanguagelabelsComponent;
  let fixture: ComponentFixture<LanguagelabelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LanguagelabelsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LanguagelabelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
