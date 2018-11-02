import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoleService } from '../../Service/role.service';
import { PatientService } from '../../Service/patient.service';
import { AppServiceService } from '../../Service/app-service.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  reportTypes: Array<string> = ["Pathology", "Radiology", "Laboratory", "Other"];
  selectedReport: string = "Pathology";
  genderType: Array<string> = ["Male", "Female"];
  roles: Array<string>;
  isLinear = true;
  PatientDetailsFG: FormGroup;
  PayDetailsFG: FormGroup;
  constructor(private _formBuilder: FormBuilder, private roleService: RoleService,
    private patientService: PatientService, private appService: AppServiceService)
  { }

  ngOnInit() {
    this.PatientDetailsFG = this._formBuilder.group({
      fullName: ['', Validators.required],
      age: [0, [Validators.required, Validators.min(0), Validators.max(150)]],
      gender: ['', Validators.required],
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

  AddPatient() {
    this.checkPayement();
    var roleIndex: number = this.roles.indexOf(this.appService.getRole());
    var patientData = {
      Name: this.PatientDetailsFG.get('fullName').value,
      Age: this.PatientDetailsFG.get('age').value,
      Gender: this.PatientDetailsFG.get('gender').value,
      Email: this.PatientDetailsFG.get('email').value,
      Phone: this.PatientDetailsFG.get('mobile').value,
      Address: this.PatientDetailsFG.get('address').value,
      CreatedBy: roleIndex
    }

    console.log(patientData);
    this.patientService.addPatient(patientData).subscribe(response => {
      console.log('response: ',response);
    });
  }

  checkPayement() {
    alert('payement success!!');
  }
}