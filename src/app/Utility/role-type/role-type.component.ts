import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AppServiceService } from '../../Service/app-service.service';
import { RoleService } from '../../Service/role.service';
import { AppConst } from '../../AppConst';

@Component({
  selector: 'app-role-type',
  templateUrl: './role-type.component.html',
  styleUrls: ['./role-type.component.css']
})
export class RoleTypeComponent implements OnInit {
  router: Router;
  appService: AppServiceService;
  roleService: RoleService;
  roles: Array<string>;
  selectedRole: string = "";
  constructor(router: Router, appService: AppServiceService, roleService: RoleService) {
    this.router = router;
    this.appService = appService;
    this.roleService = roleService;
  }

  ngOnInit() {
    this.roleService.getRoles().subscribe((data:Array<string>)  => {
      console.log("roles: ",data);
      this.roles = data;
    });
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.selectedRole = event.urlAfterRedirects.substring(1, event.urlAfterRedirects.length);
        this.appService.setRole(this.selectedRole);
      }
    })
  }

    onChange(evnt) {
    console.log(evnt.value);
    this.appService.setRole(evnt.value);
    if (evnt.value == AppConst.Roles.Admin) {
      this.router.navigate(["/admin"]);
    }
    if (evnt.value == AppConst.Roles.Doctor) {
      this.router.navigate(["/doctor"]);
    }
    if (evnt.value == AppConst.Roles.Operator) {
      this.router.navigate(["/operator"]);
    }
    if (evnt.value == AppConst.Roles.Technician) {
      this.router.navigate(["/technician"]);
    }
    if (evnt.value == AppConst.Roles.User) {
      this.router.navigate(["/user"]);
    }
  }

}
