import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material';
import { MatDividerModule, MatListModule, MatExpansionModule, MatStepperModule } from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './Dashboard/app.component';
import { HeaderComponent } from './Dashboard/header/header.component';
import { FooterComponent } from './Dashboard/footer/footer.component';
import { UserComponent } from './Role/user/user.component';
import { DoctorComponent } from './Role/doctor/doctor.component';
import { OperatorComponent } from './Role/operator/operator.component';
import { TechnicianComponent } from './Role/technician/technician.component';
import { AdminComponent } from './Role/admin/admin.component';

import { AppServiceService } from './Service/app-service.service';
import { RoleService } from './Service/role.service';
import { RoleTypeComponent } from './Utility/role-type/role-type.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    UserComponent,
    DoctorComponent,
    OperatorComponent,
    TechnicianComponent,
    AdminComponent,
    RoleTypeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatDividerModule,
    MatExpansionModule,
    MatStepperModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [AppServiceService, RoleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
