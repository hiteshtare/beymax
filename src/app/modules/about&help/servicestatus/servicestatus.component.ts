import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servicestatus',
  templateUrl: './servicestatus.component.html',
  styleUrls: ['./servicestatus.component.css']
})
export class ServicestatusComponent implements OnInit {

  status: string;

  constructor() { }

  ngOnInit() {
    this.status = 'Service is running (Dummy).';
  }
}
