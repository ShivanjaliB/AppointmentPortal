import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DockListComponent } from './dock-list/dock-list.component';

const routes: Routes = [{path:'dock-list',component:DockListComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DockRoutingModule { }
