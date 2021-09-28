import { TestBed } from '@angular/core/testing';

import { GapiServiceService } from './gapi-service.service';

describe('GapiServiceService', () => {
  let service: GapiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GapiServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
