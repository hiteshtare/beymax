import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { SelectItem } from 'primeng/primeng';

import { APP_CONFIG, IAppConfig } from './../../shared/config/app.config';
import { Dropdown, DropdownData, Schedular, Value } from './schedular.model';

@Injectable()
export class SchedularService {

  phpEndpoint: string;
  deviceData = [];
  name: string;

  constructor( @Inject(APP_CONFIG) private config: IAppConfig, private http: Http) {
    this.phpEndpoint = this.config.phpEndpoint;
  }

  public getSchedularfromJson(obj: Schedular): Schedular {
    return new Schedular(obj.room, obj.type, obj.no, obj.status, obj.timeslice, obj.comment, obj.isactive,
      obj.frequency, obj.prev_schedule, obj.next_schedule);
  }

  getSchedulars(): Observable<Schedular[]> {
    const url = `${this.phpEndpoint + 'getscheddata.php'}`;

    return this.http.get(url).map((resp: Response) => {
      const fetchedSchedulars = [];
      if (resp.json().flag === 1) {
        for (const sched of resp.json().message) {
          fetchedSchedulars.push(this.getSchedularfromJson(sched));
        }
      }
      return fetchedSchedulars as Array<Schedular>;
    });
  }

  public getDropDownfromJson(obj: any): Dropdown {
    return new Dropdown(obj.label, new Value(obj.value, obj.label));
  }

  public getDropdownDatafromJson(obj: any): DropdownData {
    return new DropdownData(obj.room, obj.device, obj.name, obj.no, obj.isdim);
  }

  getDropdownData(name: string, param: string): Observable<Dropdown[]> {
    this.name = name;
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

    let body = '';
    if (name === 'room') {
      body = `select=${name}`;
    } else if (name === 'device') {
      body = `select=${name}&&room=${param}`;
    } else if (name === 'state') {
      body = `select=${name}&&device=${param}`;
    }
    const url = `${this.phpEndpoint + 'getselectdata.php'}`;

    return this.http.post(url, body, { headers: headers }).map((resp: Response) => {
      let fetchedData = [];

      if (this.name === 'room') {// for Room Dropdown
        if (resp.json().flag === 1) {
          for (const opt of resp.json().message) {
            fetchedData.push(this.getDropDownfromJson(opt));
          }
        }
      } else if (this.name === 'device') {// for Device Dropdown
        if (resp.json().flag === 1) {
          for (const opt of resp.json().message) {
            fetchedData.push(this.getDropdownDatafromJson(opt));
          }
        }
        // Remove duplicate devices in each room & create separate JSON obj
        const lookup = {};

        const items = fetchedData;
        this.deviceData = fetchedData;

        const type_response = [];

        for (let item, i = 0; item = items[i++]; ) {

          const device = item.device;
          // tslint:disable-next-line:no-shadowed-variable
          const name = item.name;

          if (!(name in lookup)) {
            lookup[name] = 1;

            item = {};
            item['value'] = device;
            item['label'] = name;

            type_response.push(item);
          }
        }

        fetchedData = [];
        for (const opt of type_response) {
          fetchedData.push(this.getDropDownfromJson(opt));
        }
      } else if (this.name === 'state') {
        if (resp.json().flag === 1) {
          for (const opt of resp.json().message) {
            fetchedData.push(this.getDropDownfromJson(opt));
          }
        }
      }

      return fetchedData as Array<SelectItem>;
    });
  }

  getNoData(deviceno: number): Array<SelectItem> {
    const fetchedData = [];

    const no_response = this.deviceData.filter(function (el) {
      return el.device === deviceno;
    });

    // tslint:disable-next-line:forin
    for (const i in no_response) {
      const obj = no_response[i];
      const index = 0;
      let key, val;

      // tslint:disable-next-line:forin
      for (const prop in obj) {
        key = obj.no;
        val = obj.isdim === '0' ? obj.no : obj.no + ' (Dim)';
      }

      const item = new Dropdown(val, new Value(key, val));
      fetchedData.push(item);
    }
    return fetchedData as Array<SelectItem>;
  }

  getLightDeviceData(no: string): Array<SelectItem> {
    let fetchedData = [];
    const onOffValues = [new Dropdown('Off', new Value('10', 'Off')), new Dropdown('On', new Value('11', 'On'))];
    const dimingValues = [new Dropdown('Off', new Value('10', 'Off')), new Dropdown('Level 1', new Value('11', 'Level 1')),
    new Dropdown('Level 2', new Value('12', 'Level 2')), new Dropdown('Level 3', new Value('13', 'Level 3')),
    new Dropdown('Level 4', new Value('14', 'Level 4')), new Dropdown('Level 5', new Value('15', 'Level 5')),
    new Dropdown('Level 6', new Value('16', 'Level 6')), new Dropdown('Level 7', new Value('17', 'Level 7'))];

    if (no.toLowerCase().indexOf('dim') >= 0) {
      fetchedData = dimingValues;
    } else {
      fetchedData = onOffValues;
    }

    return fetchedData as Array<SelectItem>;
  }

  insertOrUpdateSchedular(operation: number, param: string) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

    const body = `operation=${operation}&&param=${param}`;

    const url = `${this.phpEndpoint + 'runsched.php'}`;

    return this.http.post(url, body, { headers: headers }).map((resp: Response) => {
      return resp.json();
    });
  }
}
