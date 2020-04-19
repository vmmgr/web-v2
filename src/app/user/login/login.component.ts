import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {MediaMatcher} from "@angular/cdk/layout";
import {FormControl, Validators} from "@angular/forms";
import {AuthService} from "../../service/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  constructor(
    private authService: AuthService,
    private _snackBar: MatSnackBar,
  ) {
  }

  public hide: boolean = true;
  public result: string = '';
  user = new FormControl('', [Validators.required]);
  password = new FormControl();

  getErrorMessage() {
    if (this.user.hasError('required')) {
      return 'You must enter a value';
    }

    return this.user.hasError('email') ? 'Not a valid user' : '';
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
    this.authService.verifyUser({user: this.user.value, pass: this.password.value})
      .then((r)=>{
        if (r){
          this.result = '認証成功';
        }else{
          this.result = 'Wrong username or password !!'
        }
        this.openBar()
      })

  }

  openBar() {
    this._snackBar.open(this.result, '', {
      duration: 2000,
    });

  }
}
