import { TestBed } from '@angular/core/testing';

import { NbuService } from './nbu.service';

describe('NbuService', () => {
  let service: NbuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NbuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
