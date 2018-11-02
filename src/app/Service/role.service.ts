import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private httpClient: HttpClient) { }
  
  getRoles() {
    return this.httpClient.get("http://localhost:58120/api/getRoles");
  }
}
