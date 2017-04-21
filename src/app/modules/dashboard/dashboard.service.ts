import { environment } from './../../../environments/environment.prod';
import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { APP_CONFIG, IAppConfig } from './../../shared/config/app.config';
import { Activity } from './../../modules/dashboard/activity.model';

@Injectable()
export class DashboardService {

    phpEndpoint: string;

    constructor( @Inject(APP_CONFIG) private config: IAppConfig, private http: Http) {
        console.log(`ENVIRONMENT.PRODUCTION : ${environment.production}`);
        console.log(`ENVIRONMENT.phpEndpoint : ${environment.phpEndpoint}`);
        this.phpEndpoint = this.config.phpEndpoint;
    }

    public getActivityfromJson(obj: any): Activity {
        return new Activity(obj.room, obj.device, obj.no, obj.state, obj.timestamp);
    }

    getActivities(): Observable<Activity[]> {
        const url = `${this.phpEndpoint + 'getrecentdata.php'}`;

        return this.http.get(url).map((resp: Response) => {
            const fetchedActivities = [];
            if (resp.json().flag === 1) {
                for (const act of resp.json().message) {
                    fetchedActivities.push(this.getActivityfromJson(act));
                }
            }
            return fetchedActivities as Array<Activity>;
        });
    }
}
