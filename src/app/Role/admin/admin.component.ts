import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoleService } from '../../Service/role.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  reportTypes: Array<string> = ["Pathology", "Radiology", "Laboratory", "Other"];
  selectedReport: string = "Pathology";
  roles: Array<string>;
  selectedRole: string = "";
  isLinear = true;
  PatientDetailsFG: FormGroup;
  PayDetailsFG: FormGroup;
  constructor(private _formBuilder: FormBuilder, private roleService: RoleService) { }

  ngOnInit() {
    this.PatientDetailsFG = this._formBuilder.group({
      fullName: ['', Validators.required],
      mobile: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required]
    });
    this.PayDetailsFG = this._formBuilder.group({
      payMode: ['', Validators.required]
    });
    this.roleService.getRoles().subscribe((data: Array<string>) => {
      this.roles = data.slice(1);
    });
  }
}