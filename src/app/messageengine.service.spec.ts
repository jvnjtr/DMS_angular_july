import { TestBed } from '@angular/core/testing';

import { MessageengineService } from './messageengine.service';

describe('MessageengineService', () => {
  let service: MessageengineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageengineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
