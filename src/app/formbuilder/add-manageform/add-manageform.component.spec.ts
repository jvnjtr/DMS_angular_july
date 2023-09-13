import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddManageformComponent } from './add-manageform.component';

describe('AddManageformComponent', () => {
  let component: AddManageformComponent;
  let fixture: ComponentFixture<AddManageformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddManageformComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddManageformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
