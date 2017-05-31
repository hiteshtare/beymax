import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { APP_CONFIG, IAppConfig } from 'app/shared/config/app.config';
import { FAQ } from 'app/modules/about&help/faq/faq.model';

@Injectable()
export class FaqService {

  phpEndpoint: string;

  constructor( @Inject(APP_CONFIG) private config: IAppConfig, private http: Http) {
    this.phpEndpoint = this.config.phpEndpoint;
  }

  public getFAQfromJson(obj: any): FAQ {
    return new FAQ(obj.header, obj.body_content);
  }

  getFAQs(): FAQ[] {
    const faqs = [new FAQ('What is Beymax?', 'Beymax is your <b>personal home automation system.</b>'),
    new FAQ('I\'\m getting "Error -Service has stopped working!" when I navigate to Service Status page, "what should I do?',
      'This error is caused when your raspberry pi device is <b>turned off</b>.Please <b>turn on</b> the device.'),
    new FAQ('What is a schedular? Why do I need to configure it?',
      'Schedular is <u>automated activity</u> use to change <i>the state of the device installed in a room.</i>')];

    return faqs;
  }

}
