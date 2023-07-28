import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanuploadComponent } from './scanupload.component';

describe('ScanuploadComponent', () => {
  let component: ScanuploadComponent;
  let fixture: ComponentFixture<ScanuploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScanuploadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScanuploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
