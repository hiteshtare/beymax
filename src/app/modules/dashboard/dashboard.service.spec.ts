import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { APP_CONFIG, AppConfig } from './../../shared/config/app.config';
import { DashboardService } from './dashboard.service';

describe('DashboardService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [DashboardService, { provide: APP_CONFIG, useValue: AppConfig }],
        });
    });

    it('should ...', inject([DashboardService], (service: DashboardService) => {
        expect(service).toBeTruthy();
    }));
});
