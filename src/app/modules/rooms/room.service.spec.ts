import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { APP_CONFIG, AppConfig } from './../../shared/config/app.config';
import { RoomService } from './room.service';

describe('RoomService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [RoomService, { provide: APP_CONFIG, useValue: AppConfig }],
    });
  });

  it('should ...', inject([RoomService], (service: RoomService) => {
    expect(service).toBeTruthy();
  }));
});
