import { TestBed } from '@angular/core/testing';

import { EncrypyDecrpyService } from './encrypy-decrpy.service';

describe('EncrypyDecrpyService', () => {
  let service: EncrypyDecrpyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EncrypyDecrpyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
