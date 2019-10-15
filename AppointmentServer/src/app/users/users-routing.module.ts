import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserroleListComponent } from './user_roles/userrole-list/userrole-list.component';
import { AccessListComponent } from './user_access/access-list/access-list.component';
import { UserListComponent } from './newuser/user-list/user-list.component';

const routes: Routes = [
  { path: 'userrole-list', component: UserroleListComponent },
  { path: 'useraccess-list', component: AccessListComponent },
  { path: 'user-list', component: UserListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
