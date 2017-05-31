import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccordionModule, PanelModule } from 'primeng/primeng';

import { AppConfig, APP_CONFIG } from './../../../shared/config/app.config';
import { FaqService } from 'app/modules/about&help/faq/faq.service';
import { FaqComponent } from './faq.component';

describe('FaqComponent', () => {
  let component: FaqComponent;
  let fixture: ComponentFixture<FaqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AccordionModule, BrowserAnimationsModule, HttpModule, PanelModule],
      declarations: [FaqComponent],
      providers: [FaqService, { provide: APP_CONFIG, useValue: AppConfig }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
