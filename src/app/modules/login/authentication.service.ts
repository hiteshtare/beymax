import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { APP_CONFIG, IAppConfig } from './../../shared/config/app.config';

@Injectable()
export class AuthenticationService {

  phpEndpoint: string;

  constructor( @Inject(APP_CONFIG) private config: IAppConfig, private http: Http) {
    this.phpEndpoint = this.config.phpEndpoint;
  }

  login(username: string, password: string) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

    const body = `username=${username}&&password=${password}`;

    const url = `${this.phpEndpoint + 'validateuser.php'}`;

    return this.http.post(url, body, { headers: headers }).map((resp: Response) => {
      return resp.json();
    });
  }

  logout() {

  }

}
