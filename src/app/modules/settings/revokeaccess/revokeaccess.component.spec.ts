import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckboxModule, PanelModule } from 'primeng/primeng';

import { APP_CONFIG, AppConfig } from './../../../shared/config/app.config';
import { RevokeAccessService } from './revokeaccess.service';
import { NotifyService } from './../../../shared/services/notify.service';
import { RoomNoPipe } from './../../../shared/pipes/room-no.pipe';

import { RevokeaccessComponent } from './revokeaccess.component';

describe('RevokeaccessComponent', () => {
  let component: RevokeaccessComponent;
  let fixture: ComponentFixture<RevokeaccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RevokeaccessComponent, RoomNoPipe],
      imports: [CheckboxModule, FormsModule, HttpModule, PanelModule, ReactiveFormsModule],
      providers: [RevokeAccessService, NotifyService, { provide: APP_CONFIG, useValue: AppConfig }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevokeaccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
