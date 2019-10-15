import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { VehicleSummaryComponent } from './vehicle-summary/vehicle-summary.component';

const routes: Routes = [
  { path: 'vehicle-list', component: VehicleListComponent },
  { path: 'vehicle-summary/:id', component: VehicleSummaryComponent },
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehicleRoutingModule { }
