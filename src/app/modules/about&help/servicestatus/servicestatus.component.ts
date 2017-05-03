import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Message } from 'primeng/primeng';

import { ServicestatusService } from "app/modules/about&help/servicestatus/servicestatus.service";

@Component({
  selector: 'app-servicestatus',
  templateUrl: './servicestatus.component.html',
  styleUrls: ['./servicestatus.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ServicestatusComponent implements OnInit {

  //status: string;
  status: Message[] = [];

  constructor(private servicestatusService: ServicestatusService) { }

  ngOnInit() {
    this.loadServiceStatus();
  }

  loadServiceStatus() {
    this.servicestatusService.getServiceStatus().subscribe((response) => {
      if (response.flag === 1) {
        this.status = [];
        this.status.push({ severity: 'success', summary: 'Success', detail: response.message });
      } else {
        this.status = [];
        this.status.push({ severity: 'error', summary: 'Error', detail: response.message });
      }
    });
  }
}
