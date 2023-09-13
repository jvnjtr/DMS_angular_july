import { TestBed } from '@angular/core/testing';

import { ConsoleservicesService } from './consoleservices.service';

describe('ConsoleservicesService', () => {
  let service: ConsoleservicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsoleservicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
