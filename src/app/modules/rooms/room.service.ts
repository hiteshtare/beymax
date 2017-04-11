import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { APP_CONFIG, IAppConfig } from './../../shared/config/app.config';
import { DeviceInfo } from './device-info.model';

@Injectable()
export class RoomService {

  phpEndpoint: string;
  userId: string;

  constructor( @Inject(APP_CONFIG) private config: IAppConfig, private http: Http) {
    this.phpEndpoint = this.config.phpEndpoint;
    this.userId = this.config.userId;
  }

  public getDeviceInfofromJson(obj: any): DeviceInfo {
    return new DeviceInfo(obj.userid, obj.room, obj.type, obj.no, obj.status, obj.updated_date, obj.ack);
  }

  getDeviceInfoByRoom(room: string): Observable<DeviceInfo[]> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

    const body = `userid=${this.userId}&&room=${room}`;
    const url = `${this.phpEndpoint + 'getdata.php'}`;

    return this.http.post(url, body, { headers: headers }).map((resp: Response) => {
      const fetchedDeviceInfo = [];
      for (const act of resp.json()) {
        fetchedDeviceInfo.push(this.getDeviceInfofromJson(act));
      }
      return fetchedDeviceInfo as Array<DeviceInfo>;
    });
  }

  postDeviceState(room: string, device: string, no: string, status: string) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

    const outletId = this.userId + room + device + no;
    const outletStatus = status;

    console.log(outletId + outletStatus);

    const body = `outletId=${outletId}&&outletStatus=${status}`;
    const url = `${this.phpEndpoint + 'toggle.php'}`;

    console.log(`url : ${url} | body : ${body}`);
    return this.http.post(url, body, { headers: headers }).map((resp: Response) => {
      return resp.json();
    });
  }

  getBoolCheckedValue(val: any): boolean {
    return val === '19' ? true : false;
  }

  getArrSlidedValue(val: any): number[] {
    const newVal = +val - 10;
    const numArray: number[] = [0, newVal];
    return numArray;
  }

  getStrCheckedValue(val: any): string {
    return val === true ? '19' : '18';
  }

  getStrSlidedValue(val: any): string {
    const strArray: string[] = String(val).split(',');
    return strArray[1].length === 2 ? strArray[1] : '1' + strArray[1];
  }
}
