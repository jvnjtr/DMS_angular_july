import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NearretentionsComponent } from './nearretentions.component';

describe('NearretentionsComponent', () => {
  let component: NearretentionsComponent;
  let fixture: ComponentFixture<NearretentionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NearretentionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NearretentionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
