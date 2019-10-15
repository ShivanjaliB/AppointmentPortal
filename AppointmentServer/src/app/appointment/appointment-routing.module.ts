import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppointmentListComponent } from './appointment-list/appointment-list.component';
import { AppointmentAddComponent } from './appointment-add/appointment-add.component';
import { AppointSummaryComponent } from './appoint-summary/appoint-summary.component';
import { PersonappointmentlistComponent } from './personappointmentlist/personappointmentlist.component';
import { VehicleappointmentlistComponent } from './vehicleappointmentlist/vehicleappointmentlist.component';
import { AppointmentInvoiceComponent } from './appointment-invoice/appointment-invoice.component';

const routes: Routes = [ 
{ path: 'appointment-list', component:AppointmentListComponent },
{ path: 'personappointment-list', component:PersonappointmentlistComponent },
{ path: 'vehicleappointment-list', component:VehicleappointmentlistComponent },
{ path: 'appointment-add', component:AppointmentAddComponent },
{ path: 'appointment-summary/:id', component:AppointSummaryComponent },
{ path: 'appointment-invoice', component:AppointmentInvoiceComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule] 
})

export class AppointmentRoutingModule { }
