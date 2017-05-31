import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  CheckboxModule, ConfirmDialogModule, ConfirmationService, ContextMenuModule, DataTableModule,
  DropdownModule, MenuModule, PanelModule
} from 'primeng/primeng';

import { APP_CONFIG, AppConfig } from './../../shared/config/app.config';
import { NotifyService } from './../../shared/services/notify.service';
import { SchedularService } from './schedular.service';
import { SchedularComponent } from './schedular.component';

describe('SchedularComponent', () => {
  let component: SchedularComponent;
  let fixture: ComponentFixture<SchedularComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SchedularComponent],
      imports: [BrowserAnimationsModule, CheckboxModule, ConfirmDialogModule, ContextMenuModule, DataTableModule,
        DropdownModule, FormsModule, HttpModule, MenuModule, PanelModule, ReactiveFormsModule, RouterTestingModule],
      providers: [SchedularService, NotifyService, ConfirmationService, { provide: APP_CONFIG, useValue: AppConfig }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
