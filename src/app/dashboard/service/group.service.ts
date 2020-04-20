import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BaseService} from "../../service/base.service";

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(
    private http: HttpClient,
    private baseService: BaseService,
  ) {
  }

  public getGroup(): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      })
    };
    return this.http.get<any>(this.baseService.apiURLGet() + '/api/v1/group', httpOptions)
      .toPromise()
      .then((r) => {
        return r;
      });
  }
}
