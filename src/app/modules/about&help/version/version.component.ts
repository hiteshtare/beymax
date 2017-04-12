import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';

import { APP_CONFIG, IAppConfig } from './../../../shared/config/app.config';

@Component({
  selector: 'app-version',
  templateUrl: './version.component.html',
  styleUrls: ['./version.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class VersionComponent implements OnInit {

  version: string;

  constructor( @Inject(APP_CONFIG) private config: IAppConfig) {
    this.version = this.config.version;
  }

  ngOnInit() {
  }
}
