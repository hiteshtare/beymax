import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { AppConfig, APP_CONFIG } from './../../../shared/config/app.config';
import { FaqService } from './faq.service';

describe('FaqService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [FaqService, { provide: APP_CONFIG, useValue: AppConfig }]
    });
  });

  it('should ...', inject([FaqService], (service: FaqService) => {
    expect(service).toBeTruthy();
  }));
});
