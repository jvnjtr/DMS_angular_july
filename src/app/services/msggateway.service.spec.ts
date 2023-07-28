import { TestBed } from '@angular/core/testing';

import { MsggatewayService } from './msggateway.service';

describe('MsggatewayService', () => {
  let service: MsggatewayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MsggatewayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
