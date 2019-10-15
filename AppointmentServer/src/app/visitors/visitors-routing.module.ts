import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VisitorListComponent } from './visitor-list/visitor-list.component';
import { VendorSummaryComponent } from './vendor-summary/vendor-summary.component';

// const routes: Routes = [];
const routes: Routes = [
  { path: 'visitor-list', component: VisitorListComponent },
  { path: 'visitor-summary/:id', component: VendorSummaryComponent },

  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule] 
})
export class VisitorsRoutingModule { }
