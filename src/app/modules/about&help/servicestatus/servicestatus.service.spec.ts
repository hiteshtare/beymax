import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { AppConfig, APP_CONFIG } from './../../../shared/config/app.config';
import { ServicestatusService } from './servicestatus.service';

describe('ServicestatusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [ServicestatusService, { provide: APP_CONFIG, useValue: AppConfig }]
    });
  });

  it('should ...', inject([ServicestatusService], (service: ServicestatusService) => {
    expect(service).toBeTruthy();
  }));
});
