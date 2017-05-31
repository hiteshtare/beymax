import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthenticationService } from './../../shared/services/authentication.service';
import { SidenavService } from './../../shared/components/sidenav/sidenav.service';

declare var $: any; // jquery

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

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private router: Router,
    private authenticationService: AuthenticationService, private sidenavService: SidenavService) {
    this.createForm();
  }

  ngOnInit() {
    $('header').hide();  // hide sidenav

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'dashboard';
    // this.returnUrl = 'dashboard';
  }

  // Initialise form with validations
  createForm() {
    this.loginForm = this.fb.group({
      'user': ['', Validators.compose([Validators.required])],
      'pwd': ['', Validators.compose([Validators.required])]
    });
  }

  onSubmit(formValue) {
    this.authenticationService.login(formValue.user, formValue.pwd).subscribe((response) => {
      if (response.flag === 1) {
        this.isError = false;
        this.errorMessage = '';
        this.router.navigate([this.returnUrl]);
      } else {
        this.isError = true;
        this.errorMessage = response.message;
      }
    });
  }

}
