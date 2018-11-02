import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  constructor(private httpClient: HttpClient) { }

  addPatient(patientData) {
    return this.httpClient.post("http://localhost:58120/api/addPatient", patientData);
  }

}
