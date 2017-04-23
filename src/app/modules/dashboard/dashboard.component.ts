import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { Activity } from './activity.model';
import { DashboardService } from './dashboard.service';
import { NotifyService } from './../../shared/services/notify.service';

declare var $: any; // jquery

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

    $('header').show(); // show sidenav

    this.loadActivities();
  }

  loadActivities() {
    this.dashboardService.getActivities().subscribe((activities) => {
      if (activities.length > 0) {
        this.activity = activities;
      } else {
        console.log('beymax : zero recentdata fetched.');
      }
    });
  }
}
