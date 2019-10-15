import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardCrmComponent } from './dashboard-crm.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { DashboardWidgetModule } from '../dashboard-widget/dashboard-widget.module';
import { TodayAppointComponent } from './today-appoint/today-appoint.component';

import { MatDialogModule, MatButtonModule, MatIconModule, MatTabsModule, MatToolbarModule, MatListModule, MatStepperModule, MatFormFieldModule, MatInputModule, MatExpansionModule, MatDatepickerModule, MatNativeDateModule, MatTableModule, MatPaginatorModule, MatSortModule, MatCheckboxModule, MatTooltipModule, MatChipsModule, MatButtonToggleModule, MatSnackBarModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AmazingTimePickerModule } from 'amazing-time-picker';

import { VisitorsModule } from '../visitors/visitors.module';
import { ToastrModule } from 'ngx-toastr';
import { ListstatusComponent } from './liststatus/liststatus.component';

export const appRoutes: Routes = [
    { path: '', component: DashboardCrmComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(appRoutes),
    FlexLayoutModule,
    MatCardModule,
    DashboardWidgetModule,
  
    MatDialogModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatToolbarModule,
    MatListModule,
    MatStepperModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    AmazingTimePickerModule ,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatChipsModule,
    MatButtonToggleModule,
  
    MatSnackBarModule,
    VisitorsModule,
    ToastrModule.forRoot()
  ],
  declarations: [DashboardCrmComponent, TodayAppointComponent, ListstatusComponent],
  exports: [ ]
})
export class DashboardCrmModule { }
