import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor() {
  }

  apiURLGet(): string {
    let tmp: string;
    if (environment.api.https) {
      tmp = 'https'
    } else {
      tmp = 'http'
    }
    return tmp + '://' + environment.api.domain
  }

  consoleURLGet(): string {
    let tmp: string;
    if (environment.console.https) {
      tmp = 'https'
    } else {
      tmp = 'http'
    }
    return tmp + '://' + environment.console.domain
  }

}
