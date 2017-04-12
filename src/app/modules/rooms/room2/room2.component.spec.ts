import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By, BrowserModule } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { APP_CONFIG, AppConfig } from './../../../shared/config/app.config';
import { RoomService } from './../room.service';
import { InputSwitchModule, SliderModule, DialogModule } from 'primeng/primeng';

import { Room2Component } from './room2.component';

describe('Room2Component', () => {
  let component: Room2Component;
  let fixture: ComponentFixture<Room2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [Room2Component],
      imports: [BrowserModule, DialogModule, FormsModule, HttpModule, InputSwitchModule, SliderModule],
      providers: [RoomService, { provide: APP_CONFIG, useValue: AppConfig }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Room2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
