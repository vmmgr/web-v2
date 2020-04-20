import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BaseService} from "./base.service";
import {environment} from "../../environments/environment";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private defalutHttpOptions = {
    headers: new HttpHeaders('application/json')
  };

  constructor(
    private _snackBar: MatSnackBar,
    private http: HttpClient,
    private router: Router,
    private baseService: BaseService,
  ) {
  }

  public verifyUser(data: any): Promise<boolean> {
    return this.http.post(this.baseService.apiURLGet() + '/api/v1/token', {
      user: data.user,
      pass: data.pass
    }, this.defalutHttpOptions)
      .toPromise()
      .then((result: any) => {
        if (result.result) {
          localStorage.setItem('token', result.token);
          localStorage.setItem('user', result.username);
          localStorage.setItem('userid', result.userid);
          localStorage.setItem('logintime', String(new Date().getTime()));
          this.router.navigate(['/dashboard']);
          this.openBar('認証成功');
          return true;
        } else {
          this.openBar('Wrong username or password !!!');
          return false;
        }
      })
      .catch((err) => {
        this.openBar('error: ' + err);
        return false;
      });
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('userid');
    localStorage.removeItem('token');
    localStorage.removeItem('logintime');
    this.openBar('ログアウト');
    this.router.navigate(['/login']);
  }

  public tokenCheck(): Promise<boolean> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      })
    };

    return this.http.post(this.baseService.apiURLGet() + '/api/v1/token/check', {}, httpOptions)
      .toPromise()
      .then(() => {
        return true;
      })
      .catch((err) => {
          console.log('Error occured.', err);
          return false;
        }
      );
  }

  loginCheck(): boolean {
    if (parseInt(localStorage.getItem('logintime')) + environment.timeout < new Date().getTime() || localStorage.getItem('token') == undefined) {
      this.openBar('Token失効');
      this.logout();
      return false;
    } else {
      return true;
    }
  }

  openBar(result: string) {
    this._snackBar.open(result, 'Done', {
      duration: 2000,
    });
  }
}
