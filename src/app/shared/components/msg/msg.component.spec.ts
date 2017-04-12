import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { GrowlModule } from 'primeng/primeng';

import { NotifyService } from './../../services/notify.service';

import { MsgComponent } from './msg.component';

describe('MsgComponent', () => {
  let component: MsgComponent;
  let fixture: ComponentFixture<MsgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MsgComponent],
      imports: [GrowlModule],
      providers: [NotifyService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
