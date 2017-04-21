import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { APP_CONFIG, IAppConfig } from './../../../shared/config/app.config';
import { CheckboxInfo, RevokeInfo } from './checkbox-info.model';

@Injectable()
export class RevokeAccessService {

  phpEndpoint = '';
  userId = '';
  fetchedCheckboxInfo: CheckboxInfo[] = [];

  constructor( @Inject(APP_CONFIG) private config: IAppConfig, private http: Http) {
    this.phpEndpoint = this.config.phpEndpoint;
    this.userId = this.config.userId;
  }

  public getCheckboxInfofromJson(obj: any): CheckboxInfo {
    obj.room = obj.room.length === '1' ? '0' + obj.room : obj.room;
    obj.device = obj.device.length === '1' ? '0' + obj.device : obj.device;
    obj.value = this.userId + obj.room + obj.device + obj.no;
    return new CheckboxInfo(obj.room, obj.alias, obj.device, obj.name, obj.no, obj.nameno, obj.isdim, obj.value);
  }


  public getRevokeInfofromJson(obj: RevokeInfo): string {
    return obj.deviceid;
  }

  getCheckBoxData(): Observable<CheckboxInfo[]> {
    const url = `${this.phpEndpoint + 'getcheckboxdata.php'}`;

    return this.http.get(url).map((resp: Response) => {
      this.fetchedCheckboxInfo = [];
      if (resp.json().flag === 1) {
        for (const checkbox of resp.json().message) {
          this.fetchedCheckboxInfo.push(this.getCheckboxInfofromJson(checkbox));
        }
      }
      return this.fetchedCheckboxInfo as Array<CheckboxInfo>;
    });
  }

  getRevokeData(): Observable<string[]> {
    const url = `${this.phpEndpoint + 'getrevokedata(ng).php'}`;

    return this.http.get(url).map((resp: Response) => {
      const fetchedRevokeInfo = [];
      if (resp.json().flag === 1) {
        for (const revoke of resp.json().message) {
          fetchedRevokeInfo.push(this.getRevokeInfofromJson(revoke));
        }
      }
      return fetchedRevokeInfo as Array<string>;
    });
  }

  saveRevokeData(selectedCheckboxes: string[]) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

    const body = { 'o_deviceId': selectedCheckboxes };
    const url = `${this.phpEndpoint + 'revokecheck(ng).php'}`;

    return this.http.post(url, body, { headers: headers }).map((resp: Response) => {
      return resp.json();
    });
  }

  getCheckBoxDataByRoomNo(roomNo: string): any {
    const checkboxInfoByRoomNo = [];
    const checkboxes = this.fetchedCheckboxInfo.filter(
      item => item.room === roomNo);
    for (const checkbox of checkboxes) {
      checkboxInfoByRoomNo.push(checkbox.value);
    }
    return checkboxInfoByRoomNo as Array<string[]>;
  }

  arrayUnique(array) {
    const a = array.concat();
    for (let i = 0; i < a.length; ++i) {
      for (let j = i + 1; j < a.length; ++j) {
        if (a[i] === a[j]) {
          a.splice(j--, 1);
        }
      }
    }
    return a;
  }

}
