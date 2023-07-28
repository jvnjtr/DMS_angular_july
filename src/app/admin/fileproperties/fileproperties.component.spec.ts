import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilepropertiesComponent } from './fileproperties.component';

describe('FilepropertiesComponent', () => {
  let component: FilepropertiesComponent;
  let fixture: ComponentFixture<FilepropertiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilepropertiesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilepropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
