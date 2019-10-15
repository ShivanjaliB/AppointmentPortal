import { Component, OnInit, ViewChild } from '@angular/core';
import { AppointmentService } from './../service/appointment.service';
import { MatTableDataSource, MatPaginator, MatDialog, MatDatepickerInputEvent } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { ScanningService } from '../../Scanning/service/scanning.service';
import { VisitorService } from '../../visitors/service/visitor.service';
import { NewVisitorComponent } from '../../visitors/new-visitor/new-visitor.component';

@Component({
  selector: 'app-appointment-invoice',
  templateUrl: './appointment-invoice.component.html',
  styleUrls: ['./appointment-invoice.component.scss']
})
export class AppointmentInvoiceComponent implements OnInit {
  visitenable: boolean = false
  isenable1: boolean = false;
  isappointenable: boolean = false;
  selecteddata: any = {};
  Currentdate:any;
  dataSource = new MatTableDataSource();
  selection = new SelectionModel<string>(true, []);
  displayedColumns = ['userId','userIntime','userVehicleNo','userStatus','status']
  statusarray:any=["Expected Today","CheckedIn","Loading Start","Loading Complete","Documentation Start",
  "Invoicing Complete","CheckOut"]

  checkIn = new FormControl('Check In');
  checkOut = new FormControl('Check Out');
  invoice=new FormControl('Completet Your Invoice ');
  appoint: any = {};
  currentStatus: any;
  personData: any = []
  isAppointment: any
  isVisitor: any
  personId: any
  date = new FormControl(new Date());
  @ViewChild(MatPaginator) paginator: MatPaginator;
    // 'userIntime', 'userHostname', 'userEstimatedtime', 'userStatus'];
  constructor(public appointmentService:AppointmentService, 
    public visitorService: VisitorService,public dialog: MatDialog,
              private toastr: ToastrService,private scanningService:ScanningService,
              private router:Router, private route: ActivatedRoute) { 
               

    var date = new Date()
    var date1 = new Date(date)
    date1.setDate(date.getDate())
    let splitDate = date1.toISOString().split("T")[0].split("-");
    var todaydate = splitDate[2] + '-' + splitDate[1] + '-' + splitDate[0]
    console.log("today", todaydate)
    this.Currentdate =todaydate
    
    // todaydate
    console.log(this.Currentdate) 
    if(localStorage.getItem('userrole')!="A-101") 
    this.getTodaysApointmentByDateandCat()
    else
    this.logout()
    
    if (this.appointCat == 1) {
      this.cat = "Visitor"
      this.selecteddata = 1
    }
    else if (this.appointCat == 2) {
      this.cat = "Vehicle"
      this.selecteddata = 2
    }
    else {
      this.appointCat = 2
      this.selecteddata = 2
    }
    
  }
  
  /*Access Control */
  logout(){
    this.scanningService.dologout().then(result=>{
      console.log(result)
      if(result.success == true){
        console.log("Logged Out")
      this.router.navigate(['/']);
      }
      else{
        console.log("Something Went Wrong")
      }
    })
  
  
  }
  ngOnInit() {
  }

  //table row click
  toggle(row){
     let id =  row.appont_id
     this.toastr.success('Appointment Summary', '');
     this.router.navigate(['/auth/appointment/appointment-summary', id]);
  }
  getTodaysApointmentByDateandCat(){
    this.appointmentService.getAppointListByDateandcat(this.Currentdate,this.appointCat).then(result=>{
      console.log(result)
      this.dataSource = new MatTableDataSource(result);
      this.dataSource.paginator = this.paginator;
      console.log(this.dataSource)
      result.forEach(element => {
        element.persondetail = {}
         element.vehicledetal = {}
        this.appointmentService.getVehicleByID(element.vehicle_id).then(vehicle => {
          console.log(vehicle)
          if(vehicle.msg!="No not found")     
          element.vehicledetal = vehicle[0]
          else
         element.vehicledetal.vehicle_no = "----"
        })
      });
     
    })
   
  }


  UpdateAppointment(data) {
    var today = new Date();
    this.appoint.appont_id = data.appont_id
    this.currentStatus = data.status
    if (data.status == 0) {
      this.appoint.check_in = today.getHours() + ":" + today.getMinutes();
      this.appoint.status = 1
      console.log(this.appoint)
      this.appointmentService.updateAppointment(this.appoint).then(result => {
        if(result.msg!=" Appointment Update ")
            this.toastr.error('Update Failed');
        else
           this.toastr.success('Updated Successfully!');
           this.getTodaysApointmentByDateandCat()
      })
    }
    else  if (data.status == 5) {
      console.log(data, data.check_in)
      this.appoint.check_out = today.getHours() + ":" + today.getMinutes();
      this.appoint.status = 6
      this.appoint.check_in = data.check_in
      console.log(this.appoint)
      this.appointmentService.updateAppointment(this.appoint).then(result => {
        if(result.msg!=" Appointment Update ")
        this.toastr.error('Update Failed');
    else
       this.toastr.success('Updated Successfully!');
       this.getTodaysApointmentByDateandCat()
      })
    }
    else  if (data.status == 3) {
      this.appoint.status = 5
      this.appoint.check_in = data.check_in
      console.log(this.appoint)
      this.appointmentService.updateAppointment(this.appoint).then(result => {
        if(result.msg!=" Appointment Update ")
            this.toastr.error('Update Failed');
        else
           this.toastr.success('Updated Successfully!');
           this.getTodaysApointmentByDateandCat()
      })
    }
  }

  //dropdown select
  // getTodaysApointmentByDateCat(data) {

  // }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  cat:any;
  appointCat: any = 2;
  ddl(data) {
    console.log(data)
    this.appointCat = data
    this.getTodaysApointmentByDateandCat()

    if (data == 1) {
      this.cat = "Visitor"
    } else if (data == 2) {
      this.cat = "Vehicle"
    }
  }
datasearch:any=[]
  searchPerson() {
    console.log("this.appoint.p_mobile_no", this.appoint.p_mobile_no)
    this.visitorService.getVisitorByMobileNumber(this.appoint.p_mobile_no).then(result => {
      console.log("getVisitorByMobileNumber", result)
      this.personData = result
      if (result[0] !== undefined) {
        console.log("if")
        this.personId = result.p_id
        this.appoint = result[0]
        this.appointmentService.findAppointmentByPId(this.appoint.p_id, this.Currentdate, 2).then(result => {
          console.log("findAppointmentByPId", result)
          this.isAppointment = true
          if (result[0] !== undefined) {
             this.datasearch = result
            this.dataSource = new MatTableDataSource(result);
            this.dataSource.paginator = this.paginator;
            result.forEach(element => {
              console.log(element.appoint_cat)
              if (element.appoint_cat == "1") {
                element.appoint_cat = "Visitor"
              } else if (element.appoint_cat == "2") {
                element.appoint_cat = "Means of Transport"
              }
              element.persondetail = {}
              element.vehicledetal = {}
              this.appointmentService.getVisitorById(element.p_id).then(result => {
                element.persondetail = result[0]
                this.appointmentService.getVehicleByID(element.vehicle_id).then(vehicle => {
                  if(vehicle.msg!="No not found")     
                  element.vehicledetal = vehicle[0]
                  else
                 element.vehicledetal.vehicle_no = "----"
                })
              })
            });
          }
          else {
            this.visitenable = true
            this.isVisitor = true
            this.isappointenable = true
            this.isenable1 = true
            this.toastr.success('Create Appointment');
          }
        })
      }
      else {
        //         this.isVisitor = false
        // this.isenable1 = true
        // this.visitenable = true
        this.visitenable = true
        this.isVisitor = true
        this.isappointenable = true
        this.isenable1 = true
        this.toastr.success('Person Dose Not Exist');
      }
    })

  }
  openVisitorComponent1(): void {
    console.log(this.datasearch[0])
    this.appointCat = 1
    if(this.datasearch[0]!=null||this.datasearch[0]!=undefined)
  {
      const dialogRef = this.dialog.open(NewVisitorComponent, {
      height: '600px',
      width: '900px',
      // data: { "from": "newVisitor" }
      data:  this.datasearch[0]
    }); dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if(result!=undefined)
        this.appointCat = 1
        else
        this.appointCat = 2
      
      this.getTodaysApointmentByDateandCat()
    });
  }else{
      const dialogRef = this.dialog.open(NewVisitorComponent, {
        height: '600px',
        width: '900px'
      }); dialogRef.afterClosed().subscribe(result => {
        console.log(result)
        if(result!=undefined)
          this.appointCat = 1
          else
          this.appointCat = 2
        
        this.getTodaysApointmentByDateandCat()
      });
  }
}
addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
  // alert(event.value);
  this.OnDateChange(event.value)
}
  OnDateChange(selecteddate) {
    //  alert(new Date(selecteddate))
    this.appoint.p_mobile_no = ""
    var date1 = new Date(selecteddate)
    // alert(date1.setMinutes( date1.getMinutes() + date1.getTimezoneOffset() ))
    console.log(date1.toISOString())
    date1.setDate(selecteddate.getDate()+1)
    let splitDate = date1.toISOString().split("T")[0].split("-");
    var strdate = splitDate[2] + '-' + splitDate[1] + '-' + splitDate[0]
    this.Currentdate = strdate
    console.log(this.Currentdate, strdate, selecteddate)
    console.log(this.route.snapshot.paramMap.get('cat'))
    this.appointmentService.getAppointListByDateandcat(this.Currentdate, this.appointCat).then(result => {
      console.log(result)
      // this.dataSource = result
      this.dataSource = new MatTableDataSource(result);
      this.dataSource.paginator = this.paginator;
      const tableFilters = [];
      tableFilters.push(result)
      console.log(this.dataSource)
      // this.dataSource = new MatTableDataSource(result);/*New Change */
      result.forEach(element => {
        console.log(element.appoint_cat)
        if (element.appoint_cat == "1") {
          element.appoint_cat = "Visitor"
        } else if (element.appoint_cat == "2") {
          element.appoint_cat = "Means of Transport"
        }
        element.persondetail = {}
        element.vehicledetal = {}
        console.log(element.p_id)
        this.appointmentService.getVisitorById(element.p_id).then(result => {
          console.log(result)
          element.persondetail = result[0]
          if (this.appointCat == 1) {
            this.appointmentService.getVehicleByID(result[0].vehicle_id).then(vehicle => {
              
              if(vehicle.msg!="No not found")     
              element.vehicledetal = vehicle[0]
              else
              element.vehicledetal.vehicle_no = "----"

              if (vehicle.success == false) {
                console.log("vehicle.success == false")
                element.vehicledetal.vehicle_name = "-"
                element.vehicledetal.vehicle_no = "-"
              }
              else {
                console.log("vehicle.success == true")
                element.vehicledetal = vehicle[0]
              }
            })
          } else if (this.appointCat == 2) {
            this.appointmentService.getVehicleByID(element.vehicle_id).then(vehicle => {
              console.log(vehicle)
              if(vehicle.msg!="No not found")     
               element.vehicledetal = vehicle[0]
              else
               element.vehicledetal.vehicle_no = "----"

              if (vehicle.success == false) {
                console.log("vehicle.success == false")
                element.vehicledetal.vehicle_name = "-"
                element.vehicledetal.vehicle_no = "-"
              }
              else {
                console.log("vehicle.success == true")
                element.vehicledetal = vehicle[0]
              }
            })
          }

        })
        
      });
     
      
    })
  }
}
