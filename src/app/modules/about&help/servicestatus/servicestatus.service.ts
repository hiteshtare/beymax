import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { APP_CONFIG, IAppConfig } from './../../../shared/config/app.config';

@Injectable()
export class ServicestatusService {

  phpEndpoint = '';

  constructor( @Inject(APP_CONFIG) private config: IAppConfig, private http: Http) {
    this.phpEndpoint = this.config.phpEndpoint;
  }

  getServiceStatus() {
    const url = `${this.phpEndpoint + 'getstatus.php'}`;

    return this.http.get(url).map((resp: Response) => {
      return resp.json();
    });
  }
}
