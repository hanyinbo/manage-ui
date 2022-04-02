import { TestBed } from '@angular/core/testing';

import { KnightErrantService } from './knight-errant.service';

describe('KnightErrantService', () => {
  let service: KnightErrantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KnightErrantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
