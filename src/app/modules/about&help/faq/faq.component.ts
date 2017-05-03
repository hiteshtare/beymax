import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { FaqService } from "app/modules/about&help/faq/faq.service";
import { FAQ } from "app/modules/about&help/faq/faq.model";

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FaqComponent implements OnInit {

  faqs: FAQ[];

  constructor(private faqService: FaqService) {
  }

  ngOnInit() {
    this.loadFAQs();
  }

  loadFAQs() {
    this.faqs = this.faqService.getFAQs();
  }

}
