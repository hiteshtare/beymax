import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { Activity } from './activity.model';
import { DashboardService } from './dashboard.service';
import { NotifyService } from './../../shared/services/notify.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class DashboardComponent implements OnInit {

  activity: Activity[];

  constructor(private dashboardService: DashboardService, private notifyService: NotifyService) {
  }

  ngOnInit() {
    this.loadActivities();
  }

  loadActivities() {
    this.dashboardService.getActivities().subscribe((activities) => {
      this.activity = activities;
    });
  }
}
