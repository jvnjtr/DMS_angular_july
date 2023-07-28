import { TestBed } from '@angular/core/testing';

import { VarlistService } from './varlist.service';

describe('VarlistService', () => {
  let service: VarlistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VarlistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
