import { TestBed, inject } from '@angular/core/testing';
import { RevokeAccessService } from './revokeaccess.service';

describe('RevokeAccessService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RevokeAccessService]
    });
  });

  it('should ...', inject([RevokeAccessService], (service: RevokeAccessService) => {
    expect(service).toBeTruthy();
  }));
});
