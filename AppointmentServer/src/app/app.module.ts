import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LazyLoadModule } from './lazy-load/lazy-load.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { Http, HttpModule } from '@angular/http';
import { ToastrModule } from 'ngx-toastr';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationDialogServiceComponent } from './Scanning/confirmation-dialog-service/confirmation-dialog-service.component';
import { ScanningModule } from './Scanning/scanning.module';
//import { BatchlistComponent } from './dock/batchlist/batchlist.component';



@NgModule({
  declarations: [
    AppComponent,
       
  ],
  imports: [
    BrowserModule,
    LazyLoadModule,
    CoreModule,
    BrowserAnimationsModule,
    HttpModule,
    ToastrModule.forRoot(),
    NgxQRCodeModule,
    // MatFormFieldModule,
    // MatInputModule,    
    FlexLayoutModule,
    NgbModule.forRoot(),
    ScanningModule

  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[ConfirmationDialogServiceComponent],
  exports: [
    MatFormFieldModule,
    MatInputModule]
})
export class AppModule { }
