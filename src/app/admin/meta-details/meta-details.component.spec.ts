import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetaDetailsComponent } from './meta-details.component';

describe('MetaDetailsComponent', () => {
  let component: MetaDetailsComponent;
  let fixture: ComponentFixture<MetaDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MetaDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MetaDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
