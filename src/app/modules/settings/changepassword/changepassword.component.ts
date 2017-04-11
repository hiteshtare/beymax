import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ChangepasswordService } from './changepassword.service';
import { NotifyService } from './../../../shared/services/notify.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class ChangepasswordComponent implements OnInit {

  chngpwdForm: FormGroup;

  constructor(private fb: FormBuilder, private changepasswordService: ChangepasswordService, private notifyService: NotifyService) {
    this.createForm();
  }

  ngOnInit() {
  }

  // Initialise form with validations
  createForm() {
    this.chngpwdForm = this.fb.group({
      'oldpwd': ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(10)])],
      'newpwd': ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(10)])],
      'confirmpwd': ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(10)])]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('newpwd').value === g.get('confirmpwd').value
      ? null : { 'mismatch': true };
  }

  onSubmit(formValue) {

    this.changepasswordService.changePassword(formValue.oldpwd, formValue.newpwd).subscribe((response) => {
      console.log(response);

      if (response === 1) {
        this.notifyService.toastMessage('success', 'Change Password', 'Password changed successfully.');
      } else {
        this.notifyService.toastMessage('error', 'Change Password', 'Password change failed!');
      }
    });
  }
}
