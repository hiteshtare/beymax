import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';

import { APP_CONFIG, IAppConfig } from './../../../shared/config/app.config';
import { DeviceInfo } from './../device-info.model';
import { RoomService } from './../room.service';

@Component({
  selector: 'app-room2',
  templateUrl: './room2.component.html',
  styleUrls: ['./room2.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class Room2Component implements OnInit {
  roomno: string;

  checked11 = false;
  slider21: number[] = [0, 0];
  checked341 = false;
  slider341: number[] = [0, 16];

  acDialog = false;

  deviceInfo: DeviceInfo[];

  constructor( @Inject(APP_CONFIG) private config: IAppConfig, private roomService: RoomService) {
    this.roomno = this.config.roomDetails[1].roomNo;
  }

  ngOnInit() {
    this.loadDeviceInfo();
  }

  showACDialog() {
    this.acDialog = true;
  }


  loadDeviceInfo() {
    this.roomService.getDeviceInfoByRoom(this.roomno).subscribe((deviceInfos) => {
      this.deviceInfo = deviceInfos;
      console.log(this.deviceInfo);
      this.loadDeviceLastState();
    });
  }

  loadDeviceLastState() {
    for (const device of this.deviceInfo) {
      let device_ngModel_name = device.type + device.no;
      const device_ngModel_value = device.status;

      if (device.type === '1') {
        device_ngModel_name = 'checked' + device_ngModel_name;
        const new_device_ngModel_value = this.roomService.getBoolCheckedValue(device_ngModel_value);
        if (device_ngModel_name === 'checked11') {
          this.checked11 = new_device_ngModel_value;
        }
      } else if (device.type === '2') {
        device_ngModel_name = 'slider' + device_ngModel_name;
        const new_device_ngModel_value = this.roomService.getArrSlidedValue(device_ngModel_value);
        console.log(new_device_ngModel_value);
        if (device_ngModel_name === 'slider21') {
          this.slider21 = new_device_ngModel_value;
        }
      }
    }
  }


  onChecked11Change(e) {
    const val = this.roomService.getStrCheckedValue(e);
    this.postDeviceState('01', '1', val);
  }

  onChecked12Change(e) {
    const val = this.roomService.getStrCheckedValue(e);
    this.postDeviceState('01', '2', val);
  }

  onSlider21Change(e) {
    const val = this.roomService.getStrSlidedValue(e);
    this.postDeviceState('02', '1', val);
  }

  onChecked341Change(e) {
    const val = this.roomService.getStrCheckedValue(e);
    this.postDeviceState('34', '1', val);
  }

  onSlider341Change(e) {
    const val = this.roomService.getStrSlidedValue(e);
    this.postDeviceState('34', '1', val);
  }

  onACbuttonsClicked(event) {
    const target = event.target || event.srcElement || event.currentTarget;
    const nameAttr = target.attributes.name;
    const val = nameAttr.nodeValue;
    this.postDeviceState('34', '1', val);
  }

  postDeviceState(device: string, no: string, status: string) {
    this.roomService.postDeviceState(this.roomno, device, no, status).subscribe((response) => {
      console.log(response);
    });
  }
}
