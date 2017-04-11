import { Component, OnInit, OnDestroy } from '@angular/core';
import { Message } from 'primeng/primeng';
import { Subscription } from 'rxjs/Subscription';

import { NotifyService } from './../../services/notify.service';

@Component({
  selector: 'app-msg',
  templateUrl: './msg.component.html',
  styleUrls: ['./msg.component.css']
})
export class MsgComponent implements OnInit, OnDestroy {

  msgs: Message[] = [];
  subscription: Subscription;

  constructor(private notifyservice: NotifyService) {
  }

  ngOnInit() {
    this.subscription = this.notifyservice.navItem$.subscribe(item => {
      if (item) {
        this.msgs.push(item);
      }
    });
  }

  ngOnDestroy() {
    // prevent memory leak when component is destroyed
    this.subscription.unsubscribe();
  }
}
