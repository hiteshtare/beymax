import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { APP_CONFIG, AppConfig } from './../../../shared/config/app.config';
import { RevokeAccessService } from './revokeaccess.service';

describe('RevokeAccessService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [RevokeAccessService, { provide: APP_CONFIG, useValue: AppConfig }]
    });
  });

  it('should ...', inject([RevokeAccessService], (service: RevokeAccessService) => {
    expect(service).toBeTruthy();
  }));
});
