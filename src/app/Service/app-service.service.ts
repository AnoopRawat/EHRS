import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {
  private newRole = new BehaviorSubject<string>("");
  public newRole$ = this.newRole.asObservable();
  private selectedRole: string = "";
  constructor() { }

  setRole(role: string) {
    this.selectedRole = role;
    this.newRole.next(role);
  }

  getRole() {
    return this.selectedRole;
  }
}
