import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { APP_CONFIG, AppConfig } from './../../shared/config/app.config';
import { AuthenticationService } from 'app/shared/services/authentication.service';
import { SidenavService } from 'app/shared/components/sidenav/sidenav.service';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [HttpModule, FormsModule, ReactiveFormsModule, RouterTestingModule],
      providers: [AuthenticationService, SidenavService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: Observable.of({ queryParams: '24h', returnUrl: '' })
          }
        }, { provide: APP_CONFIG, useValue: AppConfig }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
