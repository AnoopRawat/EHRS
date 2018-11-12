import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoleService } from '../../Service/role.service';
import { PatientService } from '../../Service/patient.service';
import { PaymentService } from '../../Service/payment.service';
import { AppServiceService } from '../../Service/app-service.service';
import { ReportService } from '../../Service/report.service';
import { MatStepper } from '@angular/material';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  reportTypes: Array<string> = ["Pathology", "Radiology", "Laboratory", "Other"];
  selectedReport: string = "Pathology";
  genderType: Array<string> = ["Male", "Female"];
  fileName: string = "";
  tempReader: any;
  reportFile: File;
  base64textStringFile: String = "";
  roles: Array<string>;
  isLinear = true;
  PatientDetailsFG: FormGroup;
  uploadReportFG: FormGroup;
  PayDetailsFG: FormGroup;
  newPatientData: any;
  @ViewChild('stepper') private myStepper: MatStepper;

  constructor(private _formBuilder: FormBuilder, private roleService: RoleService, private patientService: PatientService,
    private appService: AppServiceService, private paymentService: PaymentService, private reportService: ReportService)
  { }

  ngOnInit() {
    this.uploadReportFG = this._formBuilder.group({
      reportUserId: ['', Validators.required],
      reportType: ['', Validators.required]
    });
    this.PatientDetailsFG = this._formBuilder.group({
      fullName: ['', Validators.required],
      age: [0, [Validators.required, Validators.min(0), Validators.max(150)]],
      gender: ['', Validators.required],
      mobile: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required]
    });
    this.PayDetailsFG = this._formBuilder.group({
      cardNumber: ['', [Validators.required, Validators.minLength(4)]],
      amount: [1, [Validators.required, Validators.min(1), Validators.max(100000)]],
      cardExpiry: ['', Validators.required],
      cardCvv: ['', Validators.required]
    });
    this.roleService.getRoles().subscribe((data: Array<string>) => {
      this.roles = data.slice(1);
    });
  }

  AddPatient(stepper: MatStepper) {
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

    this.patientService.addPatient(patientData).subscribe(response => {
      this.newPatientData = response;
      stepper.next();
      this.PatientDetailsFG.reset();
      this.PayDetailsFG.reset();
    });
  }

  uploadReport(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      this.reportFile = file;
      if (file) {
        var reader = new FileReader();
        if (FileReader.prototype.readAsBinaryString === undefined) {
          FileReader.prototype.readAsBinaryString = function (fileData) {
            var binary = "";
            var pt = this;
            var reader = new FileReader();
            reader.onload = function (e) {
              var bytes = new Uint8Array(reader.result);
              var length = bytes.byteLength;
              for (var i = 0; i < length; i++) {
                binary += String.fromCharCode(bytes[i]);
              }
              pt.content = binary;
              pt.onload();
            }

            reader.readAsArrayBuffer(fileData);
          }
        }
        this.tempReader = reader;
        reader.onload = this._handleReaderLoaded.bind(this);
        reader.readAsBinaryString(file);
        this.fileName = file.name;
      }
    }
  }

  _handleReaderLoaded(readerEvt) {
    if (readerEvt == undefined) {
      var binaryString = this.tempReader.content;
    } else {
      var binaryString = readerEvt.target.result;
    }
    this.base64textStringFile = btoa(binaryString);
  }

  submitReport() {
    var reportUserId = this.uploadReportFG.get('reportUserId').value;
    var reportType = this.uploadReportFG.get('reportType').value;
    if (!reportUserId) {
      alert("Please fill user id.");
    } else if (!reportType) {
      alert("Please fill report type.");
    } else {
      let formData: FormData = new FormData();
      formData.append('image', this.reportFile);
      formData.append('reportUserId', reportUserId);
      formData.append('reportType', reportType);
      this.reportService.saveReport(formData).subscribe(
        (data) => console.log(data),
        (err) => console.log(err));
    }
  }

  MakePayement(stepper: MatStepper) {
    var paymentData = {
      createTransactionRequest: {
        merchantAuthentication: {
          name: "", //tobe filled in service
          transactionKey: "" //tobe filled in service
        },
        transactionRequest: {
          transactionType: "authCaptureTransaction",
          amount: this.PayDetailsFG.get('amount').value, //"199",
          payment: {
            creditCard: {
              cardNumber: this.PayDetailsFG.get('cardNumber').value,      // "4111111111111111",
              expirationDate: this.PayDetailsFG.get('cardExpiry').value, //"2040-12"
            }
          }
        }
      }
    }
    this.paymentService.makePayment(paymentData).subscribe((data: any) => {
      // add patient if successfull payment done (response code =1).
      if (data!.transactionResponse!.responseCode != "1") {
        alert(data.transactionResponse.errors[0].errorText);
      } else if (data!.transactionResponse!.responseCode == "1") {
        alert(data.transactionResponse.messages[0].description);
        this.AddPatient(stepper);
      } else {
        alert('Credit card must contain minimum 4 digit');
      }

    }, error => {
      alert("Transaction failed !! Try later !!");
      console.log(error);
    });
  }
}