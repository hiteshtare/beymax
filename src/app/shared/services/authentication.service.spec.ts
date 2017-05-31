import { RouterTestingModule } from '@angular/router/testing';
import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { AppConfig, APP_CONFIG } from './../../shared/config/app.config';
import { AuthenticationService } from './authentication.service';
import { SidenavService } from 'app/shared/components/sidenav/sidenav.service';

describe('AuthenticationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule, RouterTestingModule],
      providers: [AuthenticationService, SidenavService, { provide: APP_CONFIG, useValue: AppConfig }]
    });
  });

  it('should ...', inject([AuthenticationService], (service: AuthenticationService) => {
    expect(service).toBeTruthy();
  }));
});
