import { ErrorHandler, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { NotifyService } from './notify.service';

@Injectable()
export class CustomErrorHandlerService implements ErrorHandler {

    constructor(private notifyService: NotifyService) { }

    handleError(error) {
        console.log('#Error Occurred : ');
        console.log(error);
        this.notifyService.toastMessage('error', '#Error Occurred !', error);
        return Observable.throw(error);
    }
}
