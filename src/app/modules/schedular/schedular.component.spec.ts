import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  CheckboxModule, ConfirmDialogModule, ConfirmationService, ContextMenuModule, DataTableModule, DropdownModule,
  MenuModule, PanelModule
} from 'primeng/primeng';

import { APP_CONFIG, AppConfig } from './../../shared/config/app.config';
import { SchedularService } from './schedular.service';
import { NotifyService } from './../../shared/services/notify.service';

import { SchedularComponent } from './schedular.component';

describe('SchedularComponent', () => {
  let component: SchedularComponent;
  let fixture: ComponentFixture<SchedularComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SchedularComponent],
      imports: [CheckboxModule, ConfirmDialogModule, ContextMenuModule, DataTableModule, DropdownModule, FormsModule, HttpModule,
        MenuModule, PanelModule, ReactiveFormsModule, RouterTestingModule],
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
