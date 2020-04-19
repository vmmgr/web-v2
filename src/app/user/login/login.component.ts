import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {MediaMatcher} from "@angular/cdk/layout";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  constructor() {
  }

  public hide = true;

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl();

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }


  ngOnDestroy(): void {
  }

  ngOnInit(): void {
  }

  loginGoogle(): void {

  }

  loginTwitter(): void {

  }

  loginMail(): void {

  }

}
