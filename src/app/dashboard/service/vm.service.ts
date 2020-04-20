import {Injectable} from '@angular/core';
import {AuthService} from "../../service/auth.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BaseService} from "../../service/base.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class VmService {

  constructor(
    private http: HttpClient,
    private _snackBar: MatSnackBar,
    private authService: AuthService,
    private baseService: BaseService,
    private router: Router,
  ) {
  }

  public getUserVM(): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
        // 'Accept': '*/*',
      })
    };

    return this.http.get<any>(this.baseService.apiURLGet() + '/api/v1/vm', httpOptions)
      .toPromise()
      .then((r) => {
        return r;
      });
  }

  public getVM(id): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
        // 'Accept': '*/*',
      })
    };
    return this.http.get<any>(this.baseService.apiURLGet() + '/api/v1/vm/' + id, httpOptions)
      .toPromise()
      .then((r) => {
        console.log(r)
        return r
      });
  }

  public deleteVM(id): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
      body: {}
    };
    return this.http.delete<any>(this.baseService.apiURLGet() + '/api/v1/vm/' + id, httpOptions)
      .toPromise()
      .then((r) => {
        this.openBar(r.info, 5000);
        return r;
      });
  }

  public startVM(id): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
        // 'Accept': '*/*',
      })
    };
    return this.http.put<any>(this.baseService.apiURLGet() + '/api/v1/vm/' + id + '/power', {}, httpOptions)
      .toPromise()
      .then((r) => {
        this.openBar(r.info, 2000);
        return r;
      });
  }

  public stopVM(id): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
      body: {
        force: true
      }
    };
    return this.http.delete<any>(this.baseService.apiURLGet() + '/api/v1/vm/' + id + '/power', httpOptions)
      .toPromise()
      .then((r) => {
        this.openBar(r.info, 2000);
        return r;
      });
  }

  public shutdownVM(id): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
      body: {
        force: false
      }
    };
    return this.http.delete<any>(this.baseService.apiURLGet() + '/api/v1/vm/' + id + '/power', httpOptions)
      .toPromise()
      .then((r) => {
        this.openBar(r.info, 2000);
        return r;
      });
  }

  public resetVM(id): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
        // 'Accept': '*/*',
      })
    };
    return this.http.put<any>(this.baseService.apiURLGet() + '/api/v1/vm/' + id + '/reset', {}, httpOptions)
      .toPromise()
      .then((r) => {
        return r;
      });
  }

  public pauseVM(id): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
        // 'Accept': '*/*',
      })
    };
    return this.http.put<any>(this.baseService.apiURLGet() + '/api/v1/vm/' + id + '/pause', {}, httpOptions)
      .toPromise()
      .then((r) => {
        return r;
      });
  }

  public resumeVM(id): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
        // 'Accept': '*/*',
      })
    };
    return this.http.delete<any>(this.baseService.apiURLGet() + '/api/v1/vm/' + id + '/pause', httpOptions)
      .toPromise()
      .then((r) => {
        return r;
      });
  }

  public createVM(data: CreateVM): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      })
    };
    const body: any = {
      nodeid: data['nodeid'],
      vmname: data['vmname'],
      group: data['group'],
      cpu: data['cpu'],
      mem: data['mem'],
      storagetype: data['storagetype'],
      storage: data['storage'],
      autostart: data['autostart'],
      imagename: data['imagename'],
      imagetype: data['imagetype'],
    };

    return this.http.put<any>(this.baseService.apiURLGet() + '/api/v1/vm', body, httpOptions)
      .toPromise()
      .then((r) => {
        this.openBar(r.info, 5000);
        this.router.navigate(['/dashboard']);
        return r;
      });
  }

  openBar(result: string, time: number,) {
    this._snackBar.open(result, 'Done', {
      duration: time,
    });
  }
}

interface CreateVM {
  nodeid: number;
  vmname: string;
  group: string;
  cpu: number;
  mem: number;
  storage: number;
  storagetype: number;
  autostart: number;
  imagename: string;
  imagetype: string;
}
