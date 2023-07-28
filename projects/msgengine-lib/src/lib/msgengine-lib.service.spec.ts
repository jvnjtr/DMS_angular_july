import { TestBed } from '@angular/core/testing';

import { MsgengineLibService } from './msgengine-lib.service';

describe('MsgengineLibService', () => {
  let service: MsgengineLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MsgengineLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
