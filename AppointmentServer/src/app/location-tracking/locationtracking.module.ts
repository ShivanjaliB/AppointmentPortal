import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatIconModule, MatTabsModule, MatToolbarModule, MatListModule, MatStepperModule, MatFormFieldModule, MatInputModule, MatExpansionModule, MatDatepickerModule, MatNativeDateModule, MatTableModule, MatPaginatorModule, MatSortModule, MatCheckboxModule, MatTooltipModule, MatChipsModule, MatButtonToggleModule, MatDialogModule, MatAutocompleteModule, MatCardModule, MatGridListModule, MatMenuModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatSelectModule, MatSidenavModule, MatSlideToggleModule, MatSliderModule, MatSnackBarModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import * as hljs from 'highlight.js';
import { HighlightJsModule, HIGHLIGHT_JS } from 'angular-highlight-js';
import * as hljsTypescript from 'highlight.js/lib/languages/typescript';
import { Type } from '@angular/core';
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


import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler/src/core';
import { NO_ERRORS_SCHEMA } from '@angular/compiler/src/core';
import { LocationtrackingRoutingModule } from './locationtracking-routing.module';
import { LocationListComponent } from './location-list/location-list.component';

@NgModule({
  imports: [
    CommonModule,
    LocationtrackingRoutingModule,
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
  
    MatDialogModule,
  
  
  ],
  declarations: [LocationListComponent],
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
    MatSortModule
  ]
})
export class LocationtrackingModule { }
