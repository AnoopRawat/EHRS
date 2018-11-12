import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConst } from '../AppConst';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private httpClient: HttpClient) { }

  saveReport(reportData: any) {
    return this.httpClient.post(AppConst.API_ENDPOINT + "saveReport", reportData);
  }
}
