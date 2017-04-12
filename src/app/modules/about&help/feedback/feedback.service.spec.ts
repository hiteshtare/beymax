import { HttpModule } from '@angular/http';
import { TestBed, inject } from '@angular/core/testing';

import { AppConfig, APP_CONFIG } from './../../../shared/config/app.config';
import { FeedbackService } from './feedback.service';
import { NotifyService } from './../../../shared/services/notify.service';
import { FeedbackComponent } from './feedback.component';

describe('FeedbackService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [FeedbackService, { provide: APP_CONFIG, useValue: AppConfig }]
    });
  });

  it('should ...', inject([FeedbackService], (service: FeedbackService) => {
    expect(service).toBeTruthy();
  }));
});
