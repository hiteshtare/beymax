import { Component, ElementRef, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  SelectItem, MenuItem, ContextMenu, ContextMenuModule, MenuModule, ConfirmDialogModule, ConfirmationService,
  InputTextModule, CheckboxModule
} from 'primeng/primeng';
import { MaterializeAction } from 'angular2-materialize';

import { APP_CONFIG, IAppConfig } from './../../shared/config/app.config';
import { Dropdown, Schedular } from './schedular.model';
import { SchedularService } from './schedular.service';
import { NotifyService } from './../../shared/services/notify.service';

declare var $: any; // jquery

@Component({
  selector: 'app-schedular',
  templateUrl: './schedular.component.html',
  styleUrls: ['./schedular.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SchedularComponent implements OnInit {

  // status_color = 'green';

  userId: string;

  room = false;
  device = true;
  no = true;
  state = true;
  comment = true;
  comments: string;
  addmode = true;
  updatemode = false;
  isActive = false;

  rooms: SelectItem[];
  devices: SelectItem[];
  nos: SelectItem[];
  states: SelectItem[];

  schedular: Schedular[];
  selectedschedular: Schedular;

  schedularForm: FormGroup;

  items: MenuItem[];

  constructor(private fb: FormBuilder, @Inject(APP_CONFIG) private config: IAppConfig,
    private schedularService: SchedularService, private notifyService: NotifyService,
    private confirmationService: ConfirmationService) {
    this.createForm();
    this.userId = this.config.userId;
  }


  ngOnInit() {
    this.loadSchedulars();

    this.items = [
      { label: 'View', icon: 'fa-pencil', command: (event) => this.viewSchedular(this.selectedschedular) },
      { label: 'Delete', icon: 'fa-trash', command: (event) => this.deleteSchedular(this.selectedschedular) }
    ];

    this.loadRoomData();
    this.clearFields();

    $('#divcron').empty();
    $('#divcron').cron({ // reset the cron
      initial: '0 * * * *',
      onChange: function () {
        $('#spancron').text($(this).cron('value'));
      },
      useGentleSelect: true
    });
  }

  viewSchedular(sched: Schedular) {
    this.notifyService.toastMessage('info', 'Schedular Selected', sched.comment);

    this.rooms = [new Dropdown(sched.room, null)];
    this.room = true;
    this.devices = [new Dropdown(sched.type, null)];
    this.device = true;
    this.nos = [new Dropdown('' + sched.no, null)];
    this.no = true;
    this.states = [new Dropdown(sched.status, null)];
    this.state = true;

    this.comments = sched.comment;
    this.comment = true;

    this.isActive = sched.isactive === 'Active' ? true : false;

    this.addmode = false;
    this.updatemode = true;

    $('#divcron').empty();
    $('#divcron').cron({ // reset the cron
      initial: sched.timeslice,
      onChange: function () {
        $('#spancron').text($(this).cron('value'));
      },
      useGentleSelect: true
    });
  }

  updateSchedular(formValue) {

    let operation = 0;
    if (formValue.isActive) {
      operation = 2; // enable
    } else {
      operation = 3; // disable
    }
    const cronentry = $('#divcron').cron('value');
    const param = this.comments + ',' + cronentry;

    this.schedularService.insertOrUpdateSchedular(operation, param).subscribe((response) => {
      console.log(response);
      if (response === 'success') {
        this.notifyService.toastMessage('success', 'Schedular Form', 'Schedular updated successfully.');
      } else {
        this.notifyService.toastMessage('error', 'Schedular Form', 'Schedular updation failed!');
      }
    });
  }

  deleteSchedular(sched: Schedular) {

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this record?',
      accept: () => {

        const operation = 5; // delete
        const param = sched.comment;

        this.schedularService.insertOrUpdateSchedular(operation, param).subscribe((response) => {
          console.log(response);
          if (response === 'success') {
            this.notifyService.toastMessage('success', 'Schedular Form', 'Schedular deleted successfully.');
          } else {
            this.notifyService.toastMessage('error', 'Schedular Form', 'Schedular deleted failed!');
          }
        });
      }
    });
  }

  loadSchedulars() {
    this.schedularService.getSchedulars().subscribe((schedulars) => {
      if (schedulars.length > 0) {
        this.schedular = schedulars;
      } else {
        console.log('beymax : zero scheddata fetched.');
      }
    });
  }

  // Load room dropdown
  loadRoomData() {
    this.schedularService.getDropdownData('room', '').subscribe((dropdown) => {
      if (dropdown.length > 0) {
        this.rooms = dropdown;
        this.rooms.unshift(new Dropdown('Select Room', null));
      } else {
        console.log('beymax : zero selectdata fetched for room.');
      }
    });
  }

  // clear all input fields
  clearFields() {
    this.clearDropDown('devices');
    this.clearDropDown('nos');
    this.clearDropDown('states');
    this.createForm();

    $('#divcron').empty();
    $('#divcron').cron({ // reset the cron
      initial: '0 * * * *',
      onChange: function () {
        $('#spancron').text($(this).cron('value'));
      },
      useGentleSelect: true
    });

    this.addmode = true;
    this.updatemode = false;

    this.room = false;
    this.loadRoomData();
  }

  // Initialise form with validations
  createForm() {
    this.schedularForm = this.fb.group({
      'room': [null, Validators.required],
      'device': [null, Validators.required],
      'no': [null, Validators.required],
      'state': [null, Validators.required],
      'comment': ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(150)])],
      'isActive': [false]
    });
  }

  onSubmit(formValue) {

    const comment = formValue.comment;
    const cronentry = $('#divcron').cron('value');
    // Extracting values from all inputs

    let command = 'python /var/www/vw/codesend.py ';
    command = command + this.userId + formValue.room.id + formValue.device.id + formValue.no.id + formValue.state.id;

    const devicestat = formValue.room.name + '.' + formValue.device.name + '.' + formValue.no.name + '.' + formValue.state.name;

    const operation = 1; // insert
    const param = comment + ',' + cronentry + ',' + command + ',' + devicestat;

    this.schedularService.insertOrUpdateSchedular(operation, param).subscribe((response) => {
      console.log(response);
      if (response === 'success') {
        this.notifyService.toastMessage('success', 'Schedular Form', 'Schedular insert/update successfully.');
      } else {
        this.notifyService.toastMessage('error', 'Schedular Form', 'Schedular failed!');
      }
    });
  }

  // clear dropdown on name basis
  clearDropDown(name: string) {
    if (name === 'devices') {
      this.devices = [new Dropdown('Select Device', null)];
      this.device = true;
    } else if (name === 'nos') {
      this.nos = [new Dropdown('Select No', null)];
      this.no = true;
    } else if (name === 'states') {
      this.states = [new Dropdown('Select State', null)];
      this.state = true;
    }
  }

  // On room change bind devices data
  onRoomChange(room) {

    if (room) {// check for null
      this.clearDropDown('devices');
      this.clearDropDown('nos');
      this.clearDropDown('states');

      this.schedularService.getDropdownData('device', room.id).subscribe((dropdown) => {
        if (dropdown.length > 0) {
          this.devices = this.devices.concat(dropdown);
          if (this.devices.length > 1) {
            this.device = false;
          }
        } else {
          console.log('beymax : zero selectdata fetched for device.');
        }
      });
    }
  }

  // On device change bind nos and states data
  onDeviceChange(device) {

    if (device) {// check for null
      this.clearDropDown('nos');
      this.clearDropDown('states');

      this.nos = this.nos.concat(this.schedularService.getNoData(device.id));
      if (this.nos.length > 1) {
        this.no = false;
      }

      this.schedularService.getDropdownData('state', device.id).subscribe((dropdown) => {
        if (dropdown.length > 0) {
          this.states = this.states.concat(dropdown);
          if (this.states.length > 1) {
            this.state = false;
          }
        } else {
          console.log('beymax : zero selectdata fetched for state.');
        }
      });
    }
  }

  // On no change bind nos and states data
  onNoChange(no) {

    if (no) {// check for null
      const device_value = this.schedularForm.controls['device'].value;

      if (device_value.id === '1' && no.name != null)// device type - light
      // tslint:disable-next-line:one-line
      {
        this.states = this.schedularService.getLightDeviceData(no.name);
        this.states.unshift(new Dropdown('Select State', null));
      }
    }
  }
}
