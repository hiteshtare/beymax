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

  checkboxinfo: CheckboxInfo[] = [];

  constructor( @Inject(APP_CONFIG) private config: IAppConfig, private revokeaccessService: RevokeAccessService,
    private notifyService: NotifyService) {
    this.roomDetails = this.config.roomDetails;
  }

  ngOnInit() {
    this.loadCheckBoxData();
    this.loadRevokeData();
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
  }

  onRoom2Change(event) {
    if (event) {
      this.selectedCheckboxes = this.revokeaccessService.arrayUnique(this.selectedCheckboxes.concat(this.room2checkboxes));
    } else {
      this.selectedCheckboxes = this.selectedCheckboxes.filter(x => this.room2checkboxes.indexOf(x) < 0);
    }
  }

  loadCheckBoxData() {
    this.revokeaccessService.getCheckBoxData().subscribe((checkboxdata) => {
      this.checkboxinfo = checkboxdata;
      this.room1checkboxes = this.revokeaccessService.getCheckBoxDataByRoomNo(this.config.roomDetails[0].roomNo);
      this.room2checkboxes = this.revokeaccessService.getCheckBoxDataByRoomNo(this.config.roomDetails[1].roomNo);
    });
  }

  loadRevokeData() {
    this.revokeaccessService.getRevokeData().subscribe((revokedata) => {
      this.selectedCheckboxes = revokedata;
    });
  }

  saveRevokeData() {
    this.revokeaccessService.saveRevokeData(this.selectedCheckboxes).subscribe((response) => {
      this.notifyService.toastMessage('success', 'Revoke Access', 'Records updated successfully.');
    });
  }
}
