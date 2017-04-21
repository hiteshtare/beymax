import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  returnUrl: string;
  isError: boolean;
  errorMessage: string;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private loginService: LoginService) {
    this.createForm();
  }

  ngOnInit() {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // Initialise form with validations
  createForm() {
    this.loginForm = this.fb.group({
      'user': ['', Validators.compose([Validators.required])],
      'pwd': ['', Validators.compose([Validators.required])]
    });
  }

  onSubmit(formValue) {
    this.loginService.validateUser(formValue.user, formValue.pwd).subscribe((response) => {
      if (response.flag === 1) {
        this.isError = false;
        this.errorMessage = '';
        this.router.navigate(['dashboard']);
      } else {
        this.isError = true;
        this.errorMessage = response.message;
      }
    });
  }

}
