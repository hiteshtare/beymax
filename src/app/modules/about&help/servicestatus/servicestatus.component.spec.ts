import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { MessagesModule } from 'primeng/primeng';

import { AppConfig, APP_CONFIG } from './../../../shared/config/app.config';
import { ServicestatusService } from 'app/modules/about&help/servicestatus/servicestatus.service';
import { ServicestatusComponent } from './servicestatus.component';

describe('ServicestatusComponent', () => {
  let component: ServicestatusComponent;
  let fixture: ComponentFixture<ServicestatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ServicestatusComponent],
      imports: [HttpModule, MessagesModule],
      providers: [ServicestatusService, { provide: APP_CONFIG, useValue: AppConfig }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicestatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
