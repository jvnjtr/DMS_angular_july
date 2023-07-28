import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleFolderdetailsComponent } from './single-folderdetails.component';

describe('SingleFolderdetailsComponent', () => {
  let component: SingleFolderdetailsComponent;
  let fixture: ComponentFixture<SingleFolderdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleFolderdetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleFolderdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
