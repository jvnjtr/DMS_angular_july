import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilemodifyComponent } from './filemodify.component';

describe('FilemodifyComponent', () => {
  let component: FilemodifyComponent;
  let fixture: ComponentFixture<FilemodifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilemodifyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilemodifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
