import { Component, Injectable, Inject, OnInit, ViewEncapsulation } from '@angular/core';

import { APP_CONFIG, IAppConfig } from './../../../shared/config/app.config';
import { CheckboxInfo } from './checkbox-info.model';
import { RevokeAccessService } from './revokeaccess.service';
import { NotifyService } from './../../../shared/services/notify.service';

@Component({
  selector: 'app-revokeaccess',
  templateUrl: './revokeaccess.component.html',
  styleUrls: ['./revokeaccess.component.css']
  , encapsulation: ViewEncapsulation.None // applying custom styles to ngPrime components,
})
export class RevokeaccessComponent implements OnInit {

  roomDetails: any = [];

  overall = false;
  room1 = false;
  room2 = false;

  room1checkboxes: string[] = [];
  room2checkboxes: string[] = [];
  selectedCheckboxes: string[] = [];

  room1activecheckboxes: number;
  room2activecheckboxes: number;

  checkboxinfo: CheckboxInfo[] = [];

  constructor( @Inject(APP_CONFIG) private config: IAppConfig, private revokeaccessService: RevokeAccessService,
    private notifyService: NotifyService) {
    this.roomDetails = this.config.roomDetails;
  }

  ngOnInit() {
    this.loadCheckBoxData();
    this.loadRevokeData();
  }

  checkActiveCheckboxesRooms() {
    this.room1activecheckboxes = this.selectedCheckboxes.filter(item => item.substring(2, 4) // extract roomno from revokedata
      === this.config.roomDetails[0].roomNo).length;
    this.room2activecheckboxes = this.selectedCheckboxes.filter(item => item.substring(2, 4)
      === this.config.roomDetails[1].roomNo).length;

    if (this.room1activecheckboxes === this.config.roomDetails[0].noOfDevices) {
      this.room1 = true;
    } else {
      this.room1 = false;
    }

    if (this.room2activecheckboxes === this.config.roomDetails[1].noOfDevices) {
      this.room2 = true;
    } else {
      this.room2 = false;
    }

    if (this.room1 && this.room2) {
      this.overall = true;
    } else {
      this.overall = false;
    }
  }

  onCheckboxChange(event) {
    this.checkActiveCheckboxesRooms();
  }

  onOverallChange(event) {
    this.room1 = false;
    this.room2 = false;
    this.selectedCheckboxes = [];

    if (event) {
      this.room1 = true;
      this.room2 = true;
      this.selectedCheckboxes = this.room1checkboxes.concat(this.room2checkboxes);
    }
  }

  onRoom1Change(event) {
    if (event) {
      this.selectedCheckboxes = this.revokeaccessService.arrayUnique(this.selectedCheckboxes.concat(this.room1checkboxes));
    } else {
      this.selectedCheckboxes = this.selectedCheckboxes.filter(x => this.room1checkboxes.indexOf(x) < 0);
    }
    this.checkActiveCheckboxesRooms();
  }

  onRoom2Change(event) {
    if (event) {
      this.selectedCheckboxes = this.revokeaccessService.arrayUnique(this.selectedCheckboxes.concat(this.room2checkboxes));
    } else {
      this.selectedCheckboxes = this.selectedCheckboxes.filter(x => this.room2checkboxes.indexOf(x) < 0);
    }
    this.checkActiveCheckboxesRooms();
  }

  loadCheckBoxData() {
    this.revokeaccessService.getCheckBoxData().subscribe((checkboxdata) => {
      if (checkboxdata.length > 0) {
        this.checkboxinfo = checkboxdata;
        this.room1checkboxes = this.revokeaccessService.getCheckBoxDataByRoomNo(this.config.roomDetails[0].roomNo);
        this.room2checkboxes = this.revokeaccessService.getCheckBoxDataByRoomNo(this.config.roomDetails[1].roomNo);
      } else {
        this.notifyService.toastMessage('error', 'Revoke Access', '0 checkboxdata fetched.');
      }
    });
  }

  loadRevokeData() {
    this.revokeaccessService.getRevokeData().subscribe((revokedata) => {
      if (revokedata.length > 0) {
        this.selectedCheckboxes = revokedata;
        this.checkActiveCheckboxesRooms();
      } else {
        console.log('beymax : zero revokedata fetched.');
      }
    });
  }

  saveRevokeData() {
    this.revokeaccessService.saveRevokeData(this.selectedCheckboxes).subscribe((response) => {
      if (response.flag === 1) {
        this.notifyService.toastMessage('success', 'Revoke Access', 'Records updated successfully.');
      } else {
        this.notifyService.toastMessage('error', 'Revoke Access', response.message);
      }
    });
  }
}
