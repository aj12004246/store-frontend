import { TestBed } from '@angular/core/testing';

import { AlertErrorService } from './alert-error.service';

describe('AlertErrorService', () => {
  let service: AlertErrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertErrorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
