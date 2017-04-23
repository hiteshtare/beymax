import { SidenavService } from './../components/sidenav/sidenav.service';
import { Router } from '@angular/router';
import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { APP_CONFIG, IAppConfig } from './../../shared/config/app.config';

@Injectable()
export class AuthenticationService {

  phpEndpoint: string;

  constructor( @Inject(APP_CONFIG) private config: IAppConfig, private http: Http, private router: Router
    , private sidenavService: SidenavService) {
    this.phpEndpoint = this.config.phpEndpoint;
  }

  login(username: string, password: string) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

    const body = `username=${username}&&password=${password}`;

    const url = `${this.phpEndpoint + 'validateuser.php'}`;

    return this.http.post(url, body, { headers: headers }).map((resp: Response) => {
      if (resp.json().flag === 1) {
        localStorage.setItem('currentUser', resp.json().message[0].name);
        this.sidenavService.showSidenav.emit(true);
      }
      return resp.json();
    });
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.sidenavService.showSidenav.emit(false);
    this.router.navigate(['login']);
  }

}
