import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BaseService} from "./base.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private defalutHttpOptions = {
    headers: new HttpHeaders('application/json')
  };

  private isLogin = false;
  private result: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private baseService: BaseService,
  ) {
  }

  public verifyUser(data: any): Promise<boolean> {
    return this.http.post(this.baseService.urlGet() + '/api/v1/token', {
      user: data.user,
      pass: data.pass
    }, this.defalutHttpOptions)
      .toPromise()
      .then((result: any) => {
        if (result.result) {
          localStorage.setItem('token', result.token);
          localStorage.setItem('user', result.username);
          localStorage.setItem('userid', result.userid);
          this.isLogin = true;
          this.router.navigate(['/dashboard']);
          return true;
        } else {
          this.isLogin = false;
          return false;
        }
      })
      .catch((err) => {
        console.log('error: ' + err)
        return false;
      });
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('userid');
    localStorage.removeItem('token');
    this.isLogin = false;
    alert('ログアウト')
    this.router.navigate(['/login']);
  }

  public tokenCheck(): Promise<boolean> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      })
    };

    return this.http.post(this.baseService.urlGet() + '/api/v1/token/check', {}, httpOptions)
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
    if (localStorage.getItem('token') == undefined && this.isLogin == false) {
      return false;
    } else {
      return true;
    }
  }
}
