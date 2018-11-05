import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConst } from '../AppConst';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  constructor(private httpClient: HttpClient) { }

  addPatient(patientData) {
    return this.httpClient.post(AppConst.API_ENDPOINT + "addPatient", patientData);
  }

}
