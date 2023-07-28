import { TestBed } from '@angular/core/testing';

import { ValidationchecklistService } from './validationchecklist.service';

describe('ValidationchecklistService', () => {
  let service: ValidationchecklistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidationchecklistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
