import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ExampleDatabase, ExampleDataSource } from '../../tables/fixed-table/helpers.data';
import { SelectionModel } from '@angular/cdk/collections';
import { TABLE_HELPERS } from '../../tables/feature-table/helpers.data';
import { MatPaginator, MatSort, MatDialog, MAT_DIALOG_DATA, MatSnackBar, MatDatepickerInputEvent, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { AppointmentAddComponent } from '../../appointment/appointment-add/appointment-add.component';
import { ToastrService } from 'ngx-toastr';
import {FormControl} from '@angular/forms';
import { VehicleAddComponent } from '../vehicle-add/vehicle-add.component';
import { AppointmentService } from '../../appointment/service/appointment.service';
import { VisitorService } from '../../visitors/service/visitor.service';
import { AmazingTimePickerService } from 'amazing-time-picker';
import { NewVisitorComponent } from '../../visitors/new-visitor/new-visitor.component';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.scss']
})

export class VehicleListComponent implements OnInit {
  message = new FormControl('Create Appointment');
  message1=new FormControl('Edit Vehicle Details');
  displayedColumns = ['vehicleNo','driverName','transportName','action','edit'];
  // dataSource:any=[]
  dataSource = new MatTableDataSource();
  i:number
  elementType: 'url' | 'canvas' | 'img' = 'url';
  value: string = 'Techiediaries';
  // displayedColumns = ['userId', 'user', 'userIntime', 'userDate', 'userMobileNumber', 'userHostname', 'userCity', 'userPurpose', 'userStatus'];
  // dataSource: any = [];
  exampleDatabase = new ExampleDatabase();
  selection = new SelectionModel<string>(true, []);
  statusarr: any = ["flight_takeoff", "flight_land"]
  // statusarr:any=["exit_to_app","exit_to_app"]
  // <mat-icon>mdi-logout</mat-icon>
  // <mat-icon matSuffix>exit_to_app</mat-icon>

  checkIn = new FormControl('Check In');
  checkOut = new FormControl('Check Out');
  //checkIn = new FormControl('Check In');


  appoint: any = {};
  // isenable:boolean=false;
  visitenable: boolean = false
  isenable1: boolean = false;
  isappointenable: boolean = false;
  Currentdate: any;
  currentStatus: any;
  constructor(public dialog: MatDialog,
    private router: Router,
    public appointmentService: AppointmentService,
    public visitorService: VisitorService,
    private atp: AmazingTimePickerService,
    private _snackBar: MatSnackBar,
    private toastr: ToastrService
  ) {
    // this.ChangeDateFormat( )
   
    }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;
  
  ngOnInit() {
    this.getVehicle(0)
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  //message: any = "hii"
  action: any = "hii"
  toggle(row) {
    let id = row.appont_id
    // this.toastr.success('Appointment Summary', 'Toastr fun!');
    this.router.navigate(['/auth/appointment/appointment-summary', id]);
  }

  personData: any = []
  isAppointment: any
  isVisitor: any


  getVehicle(pagno){
      this.appointmentService.getVehicleList(pagno).then(result=>{
        console.log(result)
        // this.dataSource = result
        this.dataSource = new MatTableDataSource(result);
        this.dataSource.paginator = this.paginator;
      })
  }


  // searchPerson() {
  //   var date = new Date()
  //   if ((typeof date) == 'object') {
  //     var date1 = new Date(date)
  //     date1.setDate(date.getDate())
  //     let splitDate = date1.toISOString().split("T")[0].split("-");
  //     var todaydate = splitDate[2] + '-' + splitDate[1] + '-' + splitDate[0]

  //     this.visitorService.getVisitorByMobileNumber(this.appoint.p_mobile_no).then(result => {
  //       this.personData = result
  //       if (result[0] !== undefined) {
  //         // if(this.personData.length!=0){
  //         this.personId = result.p_id
  //         this.appoint = result[0]

  //         this.appointmentService.findAppointmentByPId(this.appoint.p_id, todaydate, 2).then(result => {

  //           this.isAppointment = true
  //           if (result[0] !== undefined) {
  //             this.toastr.success('Todays Appointment Already Created !');
  //           }
  //           else {
  //             this.isVisitor = true
  //             this.isappointenable = true
  //             this.isenable1 = true
  //             this.toastr.success('Create Appointment!');
  //           }
  //         })

  //       }
  //       else {
  //         this.isVisitor = false
  //         this.isenable1 = true
  //         this.visitenable = true
  //         this.toastr.success('Vistor does not Exists,Create Vistor and Appointment!');
  //       }
  //     })
  //   }
  // }
  openVisitorComponent(id): void {

    const dialogRef = this.dialog.open(VehicleAddComponent, {
      height: '600px',
      width: '900px',
      data: this.personData[0]
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getVehicle(0)
      // this.ChangeDateFormat()
    });
  }

  openVisitorComponent1(): void {

    const dialogRef = this.dialog.open(VehicleAddComponent, {
      height: '600px',
      width: '900px',
      data: { "from": "newVisitor" }

    }); dialogRef.afterClosed().subscribe(result => {
      this.getVehicle(0)
      // this.ChangeDateFormat()
    });
  }



  personId: any

//   OnDateChange(date) {

//     if ((typeof date) == 'object') {
//       var date1 = new Date(date)
//       date1.setDate(date.getDate() + 1)
//       let splitDate = date1.toISOString().split("T")[0].split("-");
//       var strdate = splitDate[2] + '-' + splitDate[1] + '-' + splitDate[0]
//       this.Currentdate = strdate

//       this.appointmentService.getAppointListByDate(this.Currentdate, 2).then(result => {
// console.log(result)
//         this.dataSource = result
//         this.dataSource.forEach(element => {
//           element.persondetail = {}
//           element.vehicledetal = {}
//           this.appointmentService.getVisitorById(element.p_id).then(result => {

//             element.persondetail = result[0]
//             this.appointmentService.getVehicleById(element.vehicle_id).then(vehicle => {
//               element.vehicledetal = vehicle[0]
//             })
//           })
//         });

//       })

//     }
//   }

  // ChangeDateFormat() {


  //   var date = new Date()
  //   if ((typeof date) == 'object') {
  //     var date1 = new Date(date)
  //     date1.setDate(date.getDate())
  //     let splitDate = date1.toISOString().split("T")[0].split("-");
  //     var todaydate = splitDate[2] + '-' + splitDate[1] + '-' + splitDate[0]
  //     var monyear = splitDate[1] + '-' + splitDate[0]
  //     var year = splitDate[0]
  //     console.log(monyear)
  //     if (monyear == "04-2019") {
  //       console.log("ddddd")
  //     }
  //     else {
  //       var s1: any
  //       s1 = year.slice(2, 4)
  //       var s3 = s1
  //       console.log(s1)
  //       var s2: any
  //       s2 = ++s1
  //       console.log(s3 + "" + s2 + "00001")
  //     }
  //     this.appointmentService.getAppointListByDate(todaydate, 2).then(result => {

  //       console.log(result)

  //       this.dataSource = result
  //       this.dataSource.forEach(element => {
  //         element.persondetail = {}
  //         element.vehicledetal = {}
  //         this.appointmentService.getVisitorById(element.p_id).then(result => {

  //           element.persondetail = result[0]
  //           this.appointmentService.getVehicleById(element.vehicle_id).then(vehicle => {
  //             element.vehicledetal = vehicle[0]
  //             this.isenable1 == false
  //             this.isappointenable = false
  //             this.visitenable == false
  //           })
  //         })
  //       });

  //     })

  //   }

  // }



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
      this.appointmentService.updateAppointment(this.appoint).then(result => {

        this.ngOnInit()
      })
    }
    else {

      this.appoint.check_out = today.getHours() + ":" + today.getMinutes();
      this.appoint.status = 2
      this.appointmentService.updateAppointment(this.appoint).then(result => {

        this.ngOnInit()
      })
    }



  }

  navigateToAppointment(data): void {
  
		console.log(data)
		const dialogRef = this.dialog.open(VehicleAddComponent, {
			height: '600px',
			width: '900px',
            data:data
		});
		dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`); 
            if(result===undefined||Object.keys(result).length === 0)
            // this.router.navigate(['/auth/appointment/appointment-list',{cat:2}]);
            this.router.navigate(['/auth/vehicle/vehicle-list']);
          
            else 
            this.router.navigate(['/auth/appointment/appointment-list',{cat:2}]);
            // this.router.navigate(['/auth/vehicle/vehicle-list']);
            
          });
	}

  openDialog(): void {
    const dialogRef = this.dialog.open(VehicleAddComponent, {
      height: '600px',
      width: '900px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`); 
      this.router.navigate(['/auth/vehicle/vehicle-list']);
    });
  }

  openTimePicker() {
    const amazingTimePicker = this.atp.open();
    amazingTimePicker.afterClose().subscribe(time => {

    });
  }
  navigateTovehicleedit(row)
  {
    const dialogRef = this.dialog.open(VehicleAddComponent, {
      height: '600px',
      width: '900px',
      data: {dialogTitle: "edit", dialogText: row}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`); 
      this.router.navigate(['/auth/vehicle/vehicle-list']);
    });

  }
}
