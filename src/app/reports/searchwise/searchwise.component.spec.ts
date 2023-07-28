import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchwiseComponent } from './searchwise.component';

describe('SearchwiseComponent', () => {
  let component: SearchwiseComponent;
  let fixture: ComponentFixture<SearchwiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchwiseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchwiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
