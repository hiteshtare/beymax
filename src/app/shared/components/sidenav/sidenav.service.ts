import { Injectable, Inject } from '@angular/core';

import { Link } from './link.model';
import { APP_CONFIG, IAppConfig } from './../../config/app.config';

@Injectable()
export class SidenavService {

  roomDetails: any = [];

  constructor( @Inject(APP_CONFIG) private config: IAppConfig) {
    this.roomDetails = this.config.roomDetails;
  }

  getParentLinks(): Array<Link> {
    return [new Link(
      1,
      'Dashboard',
      'dashboard',
      'dashboard',
      false
    ), new Link(
      2,
      'Rooms',
      'rooms',
      'rooms',
      true
    ), new Link(
      3,
      'Schedular',
      'schedular',
      'schedule',
      false
    ), new Link(
      4,
      'Charts',
      'show_chart',
      'show_chart',
      true
    ), new Link(
      5,
      'Settings',
      'settings',
      'settings',
      true
    ), new Link(
      6,
      'About & Help',
      'help outline',
      'help outline',
      true
    )];
  }


  getChildLinks(): Array<Link> {

    return [new Link(
      2,
      this.roomDetails[0] ? this.roomDetails[0].name : 'Room 1',
      'room1'
    ), new Link(
      2,
      this.roomDetails[1] ? this.roomDetails[1].name : 'Room 2',
      'room2'
    ), new Link(
      4,
      'Last 6 Hours',
      'charts/6h'
    ), new Link(
      4,
      'Last 24 Hours',
      'charts/24h'
    ), new Link(
      4,
      'Last 2 Days',
      'charts/2d'
    ), new Link(
      4,
      'Last Week',
      'charts/1w'
    ), new Link(
      4,
      'Last Month',
      'charts/1m'
    ), new Link(
      5,
      'Revoke Access',
      'revokeaccess'
    ), new Link(
      5,
      'Change Password',
      'changepassword'
    )
      , new Link(
        6,
        'Version',
        'version'
      )
      , new Link(
        6,
        'FAQ',
        'faq'
      )
      , new Link(
        6,
        'Service Status',
        'servicestatus'
      )
      , new Link(
        6,
        'Feedback',
        'feedback'
      )];
  }
}
