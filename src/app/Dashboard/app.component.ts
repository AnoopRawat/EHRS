import { Component, OnInit } from '@angular/core';

import { AppServiceService } from '../Service/app-service.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'EHRS';
  selectedRole = "";
  appService: AppServiceService;
  constructor(appService: AppServiceService) {
    this.appService = appService;    
  }
    ngOnInit() {
      this.appService.newRole$.subscribe(newRole => this.selectedRole = newRole);
  }
}