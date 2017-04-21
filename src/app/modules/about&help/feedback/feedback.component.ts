import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FeedbackService } from './feedback.service';
import { NotifyService } from './../../../shared/services/notify.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FeedbackComponent implements OnInit {

  feedbackForm: FormGroup;

  constructor(private fb: FormBuilder, private feedbackService: FeedbackService, private notifyService: NotifyService) {
    this.createForm();
  }

  ngOnInit() {
  }

  // Initialise form with validations
  createForm() {
    this.feedbackForm = this.fb.group({
      'message': ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(250)])],
      'isattach': [false]
    });
  }

  onSubmit(formValue) {
    this.feedbackService.submitFeedback(formValue.message, formValue.isattach).subscribe((response) => {
      if (response.flag === 1) {
        this.notifyService.toastMessage('success', 'Feedback', 'Feedback submitted successfully.');
        this.createForm();
      } else {
        this.notifyService.toastMessage('error', 'Feedback', response.message);
      }
    });
  }
}
