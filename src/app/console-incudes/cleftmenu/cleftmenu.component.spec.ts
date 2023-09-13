import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CleftmenuComponent } from './cleftmenu.component';

describe('CleftmenuComponent', () => {
  let component: CleftmenuComponent;
  let fixture: ComponentFixture<CleftmenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CleftmenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CleftmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
