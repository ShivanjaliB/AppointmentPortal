//import { Component, OnInit } from '@angular/core';
//import { MatDialog } from '@angular/material';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDatepickerInputEvent, MatDialog, MatSnackBar, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { FormControl } from '@angular/forms';
import { ExampleDatabase } from '../../tables/fixed-table/helpers.data';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { AppointmentService } from '../../appointment/service/appointment.service';
import { VisitorService } from '../../visitors/service/visitor.service';
import { AmazingTimePickerService } from 'amazing-time-picker';
import { ToastrService } from 'ngx-toastr';
import { BatchlistComponent } from '../batchlist/batchlist.component';


@Component({
  selector: 'app-dock-list',
  templateUrl: './dock-list.component.html',
  styleUrls: ['./dock-list.component.scss']
})

export class DockListComponent implements OnInit {
  // dataSource: any = [];
  dataSource = new MatTableDataSource();
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns = ['sr_no', 'vehicle_no', 'loading_location', 'view_batch', 'invoice', 'status'];
  Currentdate: any;
  loc_id: any;
  indexes: any=[];
  constructor(private dialog: MatDialog, private appointmentService: AppointmentService,private toaster:ToastrService) 
  {
    var date = new Date()
    var date1 = new Date(date)
    date1.setDate(date.getDate())
    let splitDate = date1.toISOString().split("T")[0].split("-");
    // this.Currentdate = splitDate[2] + '-' + splitDate[1] + '-' + splitDate[0]
    this.Currentdate="19-08-2019"
  
   }
   applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ngOnInit() {
    this.getAppointmentByCatDateandStatus()
  }
//   openBatchComponent(row){
// console.log(row)
//   }

  openBatchComponent(row): void {
    console.log(row.batch_id)
    const dialogRef = this.dialog.open(BatchlistComponent, {
      height: '600px',
      width: '900px',
      data: row
    });}
    
  persondetail: any = {}
  vehicle_id: any

  appoint: any = {};

  updateAppointment(data){
console.log(data)
this.appoint.appont_id = data.appont_id
this.appoint.status = 5
// this.appoint.batch_id =data.batch_id
// this.appoint.check_in = data.check_in
// this.appoint.check_out =data.check_out
// this.appoint.host_id=data.host_id
this.appointmentService.updateAppointment(this.appoint).then(result => {
  console.log(result)
  if(result.success == true){
    this.getAppointmentByCatDateandStatus()
    this.toaster.success("Updated")}
  
  

})
  }

  getAppointmentByCatDateandStatus() {
   
      this.appointmentService.getAppointListByDateStatusCat(this.Currentdate,3,2).then(result => {
        console.log(result)
        // this.dataSource = result
        this.dataSource = new MatTableDataSource(result);
        this.dataSource.paginator = this.paginator;
    // result.forEach((element,index) => {
     
    //   if(element.status == 1){
    //      //console.log(index)
    //     // console.log(element,result)
    //     // this.dataSource=result
    //     this.indexes.push(result[0])
    //     this.dataSource = this.indexes
    //    console.log(this.dataSource)
    //   }
    //   // else{ console.log("Else",element.vehicle_id)}
    // });
  
   

   
       result.forEach(element => {
         // console.log(element.location[0] )
                     if (element.location[0] != undefined) {
             // console.log(element.location[0].loc_id)
              this.loc_id = element.location[0].loc_id
              this.appointmentService.getlocationById(this.loc_id).then(result=>{
              //  console.log(result.loc_name,result[0].loc_name)
                element.loading_location =result[0].loc_name
              })
             }
          else{
            element.loading_location = "-"
          }
                 console.log(element.status)
this.appointmentService.getStatusById(element.status).then(result=>{
  console.log(result,result[0].status_name)
  element.status=result[0].status_name
})

          element.persondetail = {}
          element.vehicledetal = {}
          this.appointmentService.getVisitorById(element.p_id).then(result => {
            element.persondetail = result[0]
            console.log(element.vehicle_id)
            this.appointmentService.getVehicleByID(element.vehicle_id).then(vehicle => {
              console.log(vehicle, vehicle.success)
              if (vehicle.success == undefined) {
                element.vehicledetal = vehicle[0]
              }
              else{
                element.vehicledetal.vehicle_no = "-"
              }
            })

          })
        });

        
      });


  }



  startDate = new Date(1990, 0, 1);
  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString())
  minDate = new Date(2000, 0, 1);
  maxDate = new Date(2020, 0, 1);
  events: string[] = [];

  myFilter = (d: Date): boolean => {
    const day = d.getDay();

    return day !== 0 && day !== 6;

  }

}
