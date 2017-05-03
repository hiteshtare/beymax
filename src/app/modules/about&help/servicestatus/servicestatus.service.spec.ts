import { TestBed, inject } from '@angular/core/testing';
import { ServicestatusService } from './servicestatus.service';

describe('ServicestatusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServicestatusService]
    });
  });

  it('should ...', inject([ServicestatusService], (service: ServicestatusService) => {
    expect(service).toBeTruthy();
  }));
});
