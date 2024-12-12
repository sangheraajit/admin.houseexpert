/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GoogleAddressService } from './google-address.service';

describe('Service: GoogleAddress', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GoogleAddressService]
    });
  });

  it('should ...', inject([GoogleAddressService], (service: GoogleAddressService) => {
    expect(service).toBeTruthy();
  }));
});
