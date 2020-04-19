import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor() {
  }

  urlGet(): string {
    let tmp: string;
    if (environment.https) {
      tmp = 'https'
    } else {
      tmp = 'http'
    }
    return tmp + '://' + environment.domain
  }
}
