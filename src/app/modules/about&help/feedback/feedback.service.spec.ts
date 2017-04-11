import { FeedbackComponent } from './feedback.component';
import { TestBed, inject } from '@angular/core/testing';
import { FeedbackService } from './feedback.service';

import { HttpModule } from '@angular/http';

import { APP_CONFIG, AppConfig } from './../../../shared/config/app.config';

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
