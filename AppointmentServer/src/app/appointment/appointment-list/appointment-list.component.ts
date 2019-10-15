import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AppointmentAddComponent } from '../appointment-add/appointment-add.component';
import { MatDialog, MatPaginator, MatSort, MatDatepickerInputEvent, MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { AppointmentService } from '../service/appointment.service';
import { ExampleDatabase } from '../../tables/fixed-table/helpers.data';
import { SelectionModel } from '@angular/cdk/collections';
import { VisitorService } from '../../visitors/service/visitor.service';
import { AmazingTimePickerService } from 'amazing-time-picker';
import { NewVisitorComponent } from '../../visitors/new-visitor/new-visitor.component';
import { FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { VehicleAddComponent } from '../../vehicle/vehicle-add/vehicle-add.component';
import {MatTableDataSource} from '@angular/material/table';



@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.scss']
})

export class AppointmentListComponent implements OnInit {
  elementType: 'url' | 'canvas' | 'img' = 'url';
  value: string = 'Techiediaries';
  @ViewChild(MatPaginator) paginator: MatPaginator;
  //displayedColumns = ['userId', 'user', 'userIntime', 'userDate', 'userMobileNumber', 'userHostname', 'userCity', 'userPurpose', 'userStatus'];
  displayedColumns = ['userId', 'user', 'userMobileNumber', 'userVehicleNo', 'userIntime', 'userHostname', 'userEstimatedtime', 'userStatus',];
  //displayedColumns = ['userId', 'user', 'userMobileNumber','userVehicle','userVehicleNo', 'userIntime',  'userHostname',  'userStatus',];
  // dataSource: any = [];
  dataSource = new MatTableDataSource();
  data:any={}
  exampleDatabase = new ExampleDatabase();
  selection = new SelectionModel<string>(true, []);
  statusarr: any = ["flight_takeoff", "flight_land"]
  // statusarr:any=["exit_to_app","exit_to_app"]
  // <mat-icon>mdi-logout</mat-icon>
  // <mat-icon matSuffix>exit_to_app</mat-icon>

  checkIn = new FormControl('Check In');
  checkOut = new FormControl('Check Out');
  

  appoint: any = {};
  // isenable:boolean=false;
  visitenable: boolean = false
  isenable1: boolean = false;
  isappointenable: boolean = false;
  Currentdate: any;
  currentStatus: any;
  selecteddata: any = {};
  appointCat: any = 2;
  cat: any = "Vehicle"
  message: any = "hii"
  action: any = "hii"
  personData: any = []
  isAppointment: any
  isVisitor: any
  personId: any
  startDate = new Date(1990, 0, 1);
  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString())
  minDate = new Date(2000, 0, 1);
  maxDate = new Date(2020, 0, 1);
  events: string[] = [];

    constructor(public dialog: MatDialog,
                private router: Router,
                public appointmentService: AppointmentService,
                public visitorService: VisitorService,
                private atp: AmazingTimePickerService,
                private _snackBar: MatSnackBar,
                private toastr: ToastrService,
                private route: ActivatedRoute) {

    console.log(this.route.snapshot.paramMap.get('cat'))
    var date = new Date()
    var date1 = new Date(date)
    date1.setDate(date.getDate())
    let splitDate = date1.toISOString().split("T")[0].split("-");
    var todaydate = splitDate[2] + '-' + splitDate[1] + '-' + splitDate[0]
    console.log("today", todaydate)
    this.Currentdate = todaydate
    console.log(this.Currentdate)

    this.appointCat = this.route.snapshot.paramMap.get('cat')
    console.log(this.appointCat)
    if (this.appointCat != null) {
      //this.OnDateChange(date1)
    }

    console.log(this.appointCat)
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
    this.getTodaysApointmentByDateandCat()
  }

  ngOnInit() {
    // this.dataSource.paginator = this.paginator;
    this.getTodaysApointmentByDateandCat()
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
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

 
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;


  toggle(row) {
    let id = row.appont_id
    // this.toastr.success('Appointment Summary', 'Toastr fun!');
    this.router.navigate(['/auth/appointment/appointment-summary', id]);
  }


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
            // this.dataSource = result
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
                  console.log(vehicle)
                  element.vehicledetal = vehicle[0]
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


  // openVisitorComponent(id): void {
  //   this.appointCat = 1
  //   const dialogRef = this.dialog.open(NewVisitorComponent, {
  //     height: '600px',
  //     width: '900px',
  //     data: this.personData[0]
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     this.getTodaysApointmentByDateandCat()
  //   });
  // }

  openVisitorComponent1(): void {
    this.appointCat = 1
    const dialogRef = this.dialog.open(NewVisitorComponent, {
      height: '600px',
      width: '900px',
      // data: { "from": "newVisitor" }
      data:this.dataSource[0]
    }); dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if(result!=undefined)
        this.appointCat = 1
        else
        this.appointCat = 2
      
      this.getTodaysApointmentByDateandCat()
    });
  }

  openVehicleComponent(): void {
    this.appointCat = 2
    const dialogRef = this.dialog.open(VehicleAddComponent, {
      height: '600px',
      width: '900px',
      data: { "from": "newVisitor" }
    }); dialogRef.afterClosed().subscribe(result => {
      this.getTodaysApointmentByDateandCat()
    });
  }

  OnDateChange(selecteddate) {
    this.appoint.p_mobile_no = ""
    var date1 = new Date(selecteddate)
    date1.setDate(selecteddate.getDate() + 1)
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
              console.log(vehicle)
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

  getTodaysApointmentByDateandCat() {
    console.log(this.route.snapshot.paramMap.get('cat'))
    console.log(this.Currentdate)
    this.appointmentService.getAppointListByDateandcat(this.Currentdate, this.appointCat).then(result => {
      console.log(result)
      // this.dataSource = result
      this.dataSource = new MatTableDataSource(result);
      this.dataSource.paginator = this.paginator;
      const tableFilters = [];
      tableFilters.push(result)
      
     result.forEach(element => {
        if (element.appoint_cat == "1") {
          element.appoint_cat = "Visitor"
        } else if (element.appoint_cat == "2") {
          element.appoint_cat = "Means of Transport"
        }
        element.persondetail = {}
        element.vehicledetal = {}
        this.appointmentService.getVisitorById(element.p_id).then(result => {
          console.log(result)
          element.persondetail = result[0]
          if (this.appointCat == 1) {
            this.appointmentService.getVehicleByID(result[0].vehicle_id).then(vehicle => {
              console.log(vehicle)
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
        // this.appointmentService.getVisitorById(element.p_id).then(result => {
        //   element.persondetail = result[0]
        //   this.appointmentService.getVehicleByID(element.vehicle_id).then(vehicle => {
        //     element.vehicledetal = vehicle[0]
        //     this.isenable1 == false
        //     this.isappointenable = false
        //     this.visitenable == false
        //   })
        // })
        tableFilters.push(element.persondetail)
        tableFilters.push(element.vehicledetal)
        
      });
      console.log(tableFilters)
  
    })
  }

  myFilter = (d: Date): boolean => {
    const day = d.getDay();
    return day !== 0 && day !== 6;
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
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
        this.ngOnInit()
      })
    }
    else {
      console.log(data, data.check_in)
      this.appoint.check_out = today.getHours() + ":" + today.getMinutes();
      this.appoint.status = 6
      this.appoint.check_in = data.check_in
      console.log(this.appoint)
      this.appointmentService.updateAppointment(this.appoint).then(result => {
        this.ngOnInit()
      })
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AppointmentAddComponent, {
      height: '600px',
      width: '900px',
    });
  }

  openTimePicker() {
    const amazingTimePicker = this.atp.open();
    amazingTimePicker.afterClose().subscribe(time => {
    });
  }

}

