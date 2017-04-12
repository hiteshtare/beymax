import { TestBed, inject } from '@angular/core/testing';
import { SidenavService } from './sidenav.service';

import { APP_CONFIG, AppConfig } from './../../config/app.config';

describe('SidenavService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SidenavService, { provide: APP_CONFIG, useValue: AppConfig }]
    });
  });

  it('should ...', inject([SidenavService], (service: SidenavService) => {
    expect(service).toBeTruthy();
  }));
});
