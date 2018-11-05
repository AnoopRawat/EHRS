import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AppConst } from '../AppConst';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private httpClient: HttpClient) { }
  
  getRoles() {
    return this.httpClient.get(AppConst.API_ENDPOINT + "getRoles");
  }
}
