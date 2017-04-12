import { HttpModule } from '@angular/http';
import { TestBed, inject } from '@angular/core/testing';

import { APP_CONFIG, AppConfig } from './../../../shared/config/app.config';
import { ChangepasswordService } from './changepassword.service';

describe('ChangepasswordService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [ChangepasswordService, { provide: APP_CONFIG, useValue: AppConfig }]
    });
  });

  it('should ...', inject([ChangepasswordService], (service: ChangepasswordService) => {
    expect(service).toBeTruthy();
  }));
});
