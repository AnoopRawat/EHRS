import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './../app/Role/user/user.component'
import { DoctorComponent } from './../app/Role/doctor/doctor.component'
import { OperatorComponent } from './../app/Role/operator/operator.component'
import { TechnicianComponent } from './../app/Role/technician/technician.component'
import { AdminComponent } from './../app/Role/admin/admin.component'

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent
  },
  {
    path: 'technician',
    component: TechnicianComponent,
  },
  {
    path: 'operator',
    component: OperatorComponent,
  },
  {
    path: 'doctor',
    component: DoctorComponent,
  },
  {
    path: 'user',
    component: UserComponent,
  },
  {
    path: '',
    redirectTo: 'user',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'user',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
