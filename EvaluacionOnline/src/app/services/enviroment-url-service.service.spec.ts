import { TestBed } from '@angular/core/testing';

import { EnviromentUrlServiceService } from './enviroment-url-service.service';

describe('EnviromentUrlServiceService', () => {
  let service: EnviromentUrlServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnviromentUrlServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
