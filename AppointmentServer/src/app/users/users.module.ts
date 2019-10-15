import {  CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';





import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatIconModule, 
  MatTabsModule, MatToolbarModule, MatListModule, 
  MatStepperModule, MatInputModule, 
  MatExpansionModule, MatDatepickerModule, MatNativeDateModule,
   MatTableModule, MatPaginatorModule, MatSortModule, MatCheckboxModule,
    MatTooltipModule, MatChipsModule, MatButtonToggleModule, MatDialogModule, 
    MatAutocompleteModule, MatCardModule, MatGridListModule, MatMenuModule, 
    MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatRippleModule, 
    MatSelectModule, MatSidenavModule, MatSlideToggleModule, MatSliderModule, MatSnackBarModule, MatFormFieldModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
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
import { ToastrModule } from 'ngx-toastr';

import { UsersRoutingModule } from './users-routing.module';
import { UserroleListComponent } from './user_roles/userrole-list/userrole-list.component';
import { UserroleAddComponent } from './user_roles/userrole-add/userrole-add.component';
import { AccessListComponent } from './user_access/access-list/access-list.component';
import { AccessAddComponent } from './user_access/access-add/access-add.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from '../jwtinterceptor';
import { AppModule } from '../app.module';
import { UserAddComponent } from './newuser/user-add/user-add.component';
import { UserListComponent } from './newuser/user-list/user-list.component';


@NgModule({
  imports: [
    // AppModule,
    CommonModule,
    UsersRoutingModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatToolbarModule,
    MatListModule,
    MatSelectModule,
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
    ModalModule.forRoot(),
    ToastrModule.forRoot(),
    MatDialogModule,
    FormsModule
  ],
  entryComponents:[UserroleAddComponent,UserAddComponent],
  declarations: [UserroleListComponent, UserroleAddComponent, AccessListComponent, AccessAddComponent, UserAddComponent, UserListComponent],
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
    MatFormFieldModule,
    // Material
    // MatAutocompleteModule,
    // MatButtonModule,
    // MatButtonToggleModule,
   
    
    // MatCheckboxModule,
    // MatChipsModule,
    // MatDatepickerModule,
    // MatDialogModule,
    // MatExpansionModule,
    // MatGridListModule,
    // MatIconModule,
    // MatInputModule,
    // MatListModule,
    // MatMenuModule,
    // MatProgressBarModule,
    // MatProgressSpinnerModule,
    // MatRadioModule,
    // MatRippleModule,
    // MatSelectModule,
    // MatSidenavModule,
    // MatSlideToggleModule,
    // MatSliderModule,
    // MatSnackBarModule,
    // MatStepperModule,
    // MatTableModule,
    // MatTabsModule,
    // MatToolbarModule,
    // MatTooltipModule,
    // MatNativeDateModule,
    // HttpModule,
    // MatSortModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA
] ,providers:[
  { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  // { provide: HTTP_INTERCEPTORS, useClass: ErrorI, multi: true },
],
})
export class UsersModule { }
