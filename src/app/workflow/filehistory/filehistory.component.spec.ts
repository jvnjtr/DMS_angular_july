import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilehistoryComponent } from './filehistory.component';

describe('FilehistoryComponent', () => {
  let component: FilehistoryComponent;
  let fixture: ComponentFixture<FilehistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilehistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilehistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
