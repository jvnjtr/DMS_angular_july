import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewmanageLinksComponent } from './viewmanage-links.component';

describe('ViewmanageLinksComponent', () => {
  let component: ViewmanageLinksComponent;
  let fixture: ComponentFixture<ViewmanageLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewmanageLinksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewmanageLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
