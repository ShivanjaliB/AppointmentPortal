import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatIconModule, MatTabsModule, MatToolbarModule, MatListModule, MatStepperModule, MatFormFieldModule, MatInputModule, MatExpansionModule, MatDatepickerModule, MatNativeDateModule, MatTableModule, MatPaginatorModule, MatSortModule, MatCheckboxModule, MatTooltipModule, MatChipsModule, MatButtonToggleModule, MatDialogModule, MatAutocompleteModule, MatCardModule, MatGridListModule, MatMenuModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatSelectModule, MatSidenavModule, MatSlideToggleModule, MatSliderModule, MatSnackBarModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule, FormGroup } from '@angular/forms';

import { A11yModule } from '@angular/cdk/a11y';
import { BidiModule } from '@angular/cdk/bidi';
import { ObserversModule } from '@angular/cdk/observers';
import { OverlayModule } from '@angular/cdk/overlay';
import { PlatformModule } from '@angular/cdk/platform';
import { PortalModule } from '@angular/cdk/portal';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CdkTableModule } from '@angular/cdk/table';

import { Http, HttpModule } from '@angular/http';
import { AppointmentModule } from '../appointment/appointment.module';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

import { ScanningRoutingModule } from './scanning-routing.module';
import { AddMaterialComponent } from './add-material/add-material.component';
import { ListMaterialComponent } from './list-material/list-material.component';

import { AddBinComponent } from './add-bin/add-bin.component';
import { ListBinComponent } from './list-bin/list-bin.component';
import { ListLocationComponent } from './list-location/list-location.component';
import { AddLocationComponent } from './add-location/add-location.component';
import { AddMaterialtobinComponent } from './add-materialtobin/add-materialtobin.component';
import { ListMaterialtobinComponent } from './list-materialtobin/list-materialtobin.component';
import { ListAssignComponent } from './list-assign/list-assign.component';
import { AddAssignComponent } from './add-assign/add-assign.component';
import { ConfirmationDialogServiceComponent } from './confirmation-dialog-service/confirmation-dialog-service.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SummaryAssignComponent } from './summary-assign/summary-assign.component';
import { NgxQRCodeModule } from 'ngx-qrcode2';



@NgModule({
  imports: [
    CommonModule,
    ScanningRoutingModule,
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
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatCardModule,
    MatChipsModule,
    MatButtonToggleModule,
    ToastrModule.forRoot(),
    MatSelectModule,
    MatDialogModule,
    FormsModule,
    NgbModule.forRoot(),
    NgxQRCodeModule
    
  ],
  entryComponents:[AddMaterialComponent,
                    AddBinComponent,
                    AddLocationComponent,
                    AddMaterialtobinComponent,
                    AddAssignComponent,SummaryAssignComponent,
                    ConfirmationDialogServiceComponent
                    ],

  declarations: [AddMaterialComponent, 
                ListMaterialComponent, 
                AddBinComponent, 
                ListBinComponent, 
                ListLocationComponent, 
                AddLocationComponent, 
                AddMaterialtobinComponent, 
                ListMaterialtobinComponent, 
                ListAssignComponent, 
                AddAssignComponent, SummaryAssignComponent,
                ConfirmationDialogServiceComponent, SummaryAssignComponent
                ],
  exports: [
    // CDK
    A11yModule,
    BidiModule,
    ObserversModule,
    OverlayModule,
    PlatformModule,
    PortalModule,
    ScrollDispatchModule,
    CdkStepperModule,
    CdkTableModule,
    ConfirmationDialogServiceComponent,
    // Material
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatSnackBarModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatNativeDateModule,
    HttpModule,
    MatSortModule,
    ConfirmationDialogServiceComponent
  ]
  ,
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA
]
})
export class ScanningModule { }
