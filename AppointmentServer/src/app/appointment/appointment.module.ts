import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppointmentRoutingModule } from './appointment-routing.module';
import { AppointmentListComponent } from './appointment-list/appointment-list.component';
import { AppointmentAddComponent } from './appointment-add/appointment-add.component';
//import { MatDialogModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatIconModule, MatTabsModule,
   MatToolbarModule, MatListModule, MatStepperModule, MatInputModule, MatExpansionModule, MatDatepickerModule, MatNativeDateModule, MatTableModule, MatPaginatorModule, MatSortModule, MatCheckboxModule, MatTooltipModule, MatChipsModule, MatButtonToggleModule, MatDialogModule, MatAutocompleteModule, MatCardModule, MatGridListModule, MatMenuModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatSelectModule, MatSidenavModule, MatSlideToggleModule, MatSliderModule, MatSnackBarModule, MatFormFieldModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import * as hljs from 'highlight.js';
import { HighlightJsModule, HIGHLIGHT_JS } from 'angular-highlight-js';
import * as hljsTypescript from 'highlight.js/lib/languages/typescript';
import { A11yModule } from '@angular/cdk/a11y';
import { BidiModule } from '@angular/cdk/bidi';
import { ObserversModule } from '@angular/cdk/observers';
import { OverlayModule } from '@angular/cdk/overlay';
import { PlatformModule } from '@angular/cdk/platform';
import { PortalModule } from '@angular/cdk/portal';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CdkTableModule } from '@angular/cdk/table';
import { AppointSummaryComponent } from './appoint-summary/appoint-summary.component';
import { AmazingTimePickerModule } from 'amazing-time-picker';
import { ModalModule, BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { VisitorsModule } from '../visitors/visitors.module';
import { ToastrModule } from 'ngx-toastr';
import { QRCodeModule } from 'angularx-qrcode';
import {NgxQRCodeModule} from 'ngx-qrcode2';
import { PersonappointmentlistComponent } from './personappointmentlist/personappointmentlist.component';
import { VehicleappointmentlistComponent } from './vehicleappointmentlist/vehicleappointmentlist.component';
import { PersonappointmentaddComponent } from './personappointmentadd/personappointmentadd.component';
import { VehicleappointmentaddComponent } from './vehicleappointmentadd/vehicleappointmentadd.component'
import { VehicleModule } from '../vehicle/vehicle.module';
import { JwtInterceptor } from '../jwtinterceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppointmentInvoiceComponent } from './appointment-invoice/appointment-invoice.component';
import { BatchlistComponent } from '../dock/batchlist/batchlist.component';
import { NewVisitorComponent } from '../visitors/new-visitor/new-visitor.component';


@NgModule({
  imports: [
    VehicleModule,
    CommonModule,
    AppointmentRoutingModule,
    QRCodeModule,
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
    ModalModule.forRoot(),
    MatSnackBarModule,
    VisitorsModule,
    ToastrModule.forRoot(),
    NgxQRCodeModule
  ],
  declarations: [AppointmentListComponent, AppointmentAddComponent, BatchlistComponent,AppointSummaryComponent, PersonappointmentlistComponent, VehicleappointmentlistComponent, PersonappointmentaddComponent, VehicleappointmentaddComponent, AppointmentInvoiceComponent],
  entryComponents:[AppointmentAddComponent,NewVisitorComponent,
    PersonappointmentaddComponent,BatchlistComponent,
    VehicleappointmentaddComponent],
  exports:[AppointmentAddComponent,],
  providers:[
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: ErrorI, multi: true },
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA
]
})
export class AppointmentModule { }
