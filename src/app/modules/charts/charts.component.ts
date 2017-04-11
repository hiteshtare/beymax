import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { IAppConfig, APP_CONFIG } from './../../shared/config/app.config';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {

  chartsEndpoint: string;
  type: string;

  constructor( @Inject(APP_CONFIG) private config: IAppConfig, private route: ActivatedRoute) {
    this.chartsEndpoint = this.config.chartsEndpoint;
  }

  ngOnInit() {
    this.route.params.map(params => params['type']).subscribe((chartType) => {
      this.type = chartType;
      console.log(chartType);
    });
  }
}
