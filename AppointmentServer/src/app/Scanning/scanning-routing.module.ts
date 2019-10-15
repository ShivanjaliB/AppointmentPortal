import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListMaterialComponent } from './list-material/list-material.component';
import { ListBinComponent } from './list-bin/list-bin.component';
import {ListLocationComponent} from './list-location/list-location.component'
import { ListMaterialtobinComponent } from './list-materialtobin/list-materialtobin.component';
import { ListAssignComponent } from './list-assign/list-assign.component';

const routes: Routes = [
  { path: 'material-list', component: ListMaterialComponent },
  { path: 'bin-list', component: ListBinComponent },
  { path: 'location-list', component: ListLocationComponent },
  { path: 'assigned-list', component: ListAssignComponent }
  // { path: 'assign-list', component: ListMaterialtobinComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScanningRoutingModule { }
