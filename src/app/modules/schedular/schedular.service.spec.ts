import { HttpModule } from '@angular/http';
import { TestBed, inject } from '@angular/core/testing';

import { APP_CONFIG, AppConfig } from './../../shared/config/app.config';
import { SchedularService } from './schedular.service';

describe('SchedularService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [SchedularService, { provide: APP_CONFIG, useValue: AppConfig }],
    });
  });

  it('should ...', inject([SchedularService], (service: SchedularService) => {
    expect(service).toBeTruthy();
  }));
});
