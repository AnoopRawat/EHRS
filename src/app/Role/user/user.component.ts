import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReportService } from '../../Service/report.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  hide = true;
  downloadReportFG: FormGroup;
  constructor(private _formBuilder: FormBuilder, private reportService: ReportService) { }

  ngOnInit() {
    this.downloadReportFG = this._formBuilder.group({
      dwnReportUserid: ['', Validators.required],
      dwnReportUserPwd:['', Validators.required]
    });
  }

  downloadReport() {
    var reportUserId = this.downloadReportFG.get('dwnReportUserid').value;
     var reportUserPwd = this.downloadReportFG.get('dwnReportUserPwd').value;
    if (!reportUserId || !reportUserPwd) {
      alert("Please fill User id and Password");
    } else {
      this.reportService.downloadReport(reportUserId).subscribe(
        (data: any) => {
          console.log(data);
          var objectUrl = URL.createObjectURL(data);
          window.open(objectUrl);
        },
        (error) => console.log(error)
      )
    }
  }

}
