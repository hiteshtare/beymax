import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CheckboxModule, PanelModule } from 'primeng/primeng';

import { AppConfig, APP_CONFIG } from './../../../shared/config/app.config';
import { FeedbackService } from './feedback.service';
import { NotifyService } from './../../../shared/services/notify.service';
import { FeedbackComponent } from './feedback.component';

describe('FeedbackComponent', () => {
  let component: FeedbackComponent;
  let fixture: ComponentFixture<FeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FeedbackComponent],
      imports: [CheckboxModule, FormsModule, HttpModule, PanelModule, ReactiveFormsModule],
      providers: [FeedbackService, NotifyService, { provide: APP_CONFIG, useValue: AppConfig }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
