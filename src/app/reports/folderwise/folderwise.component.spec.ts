import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FolderwiseComponent } from './folderwise.component';

describe('FolderwiseComponent', () => {
  let component: FolderwiseComponent;
  let fixture: ComponentFixture<FolderwiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FolderwiseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FolderwiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
