import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Message } from 'primeng/primeng';

@Injectable()
export class NotifyService {

  // Observable navItem source
  private navItemSource = new BehaviorSubject<Message>('');
  // Observable navItem stream
  navItem$ = this.navItemSource.asObservable();
  // service command

  toastMessage(severity, summary, detail) {
    const message = {
      severity: severity, summary: summary, detail: detail
    };
    this.navItemSource.next(message);
  }

}
