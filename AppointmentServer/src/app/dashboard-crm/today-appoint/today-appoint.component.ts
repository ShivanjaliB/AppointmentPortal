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

@Component({
  selector: 'app-today-appoint',
  templateUrl: './today-appoint.component.html',
  styleUrls: ['./today-appoint.component.scss']
})
export class TodayAppointComponent implements OnInit {

       
  displayedColumns = [ 'userId', 'user','userIntime','userCheckIntime','userDate','userMobileNumber','userHostname','userCity','userStatus'];
  // dataSource: any=[];
  dataSource = new MatTableDataSource();
  exampleDatabase = new ExampleDatabase();
  selection = new SelectionModel<string>(true, []);
 // statusarr:any=["Check In","Check Out","Exit"]
  statusarr:any=["flight_takeoff","flight_land"]
  
  checkIn = new FormControl('Check In');
  checkOut = new FormControl('Check Out');
  appoint: any={};
  // isenable:boolean=false;
  visitenable:boolean=false
  isenable1:boolean=false;
  isappointenable:boolean=false;
  Currentdate: any;
  constructor(public dialog:MatDialog,
    private router:Router,
    public appointmentService:AppointmentService,
    public visitorService:VisitorService,
    private atp: AmazingTimePickerService,
    private _snackBar: MatSnackBar,
    private toastr: ToastrService
    ) { 
      
    }
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild('filter') filter: ElementRef;
  ngOnInit() {
    // this.getAppointList()
    this.ChangeDateFormat()
  }

  // getAppointList(){
  //   this.appointmentService.getAppointList(0).then(result=>{
  //     this.dataSource = result
  //     this.dataSource.forEach(element => {
  //       element.persondetail={}
  //       element.vehicledetal={}
  //         this.appointmentService.getVisitorById(element.p_id).then(result=>{
  //           console.log(result[0])
  //           element.persondetail = result[0]
  //           this.appointmentService.getVehicleById(element.vehicle_id).then(vehicle=>{
  //             element.vehicledetal = vehicle[0]
  //           })
  //         })
  //     });
  //     console.log(this.dataSource)
  // })
  // }
  message:any="hii"
  action:any="hii"
  toggle(row){
    let id =  row.appont_id
   

      this.toastr.success('Appointment Summary', 'Toastr fun!');
     this.router.navigate(['/auth/appointment/appointment-summary', id]);
  }



  personData:any=[]
  isAppointment:any
  isVisitor:any
  // searchPerson(){
     
  //   console.log(this.appoint.p_mobile_no)

  //   this.visitorService.getVisitorByMobileNumber(this.appoint.p_mobile_no).then(result=>{
  //       console.log(result)
  //       this.personData = result
  //       // console.log(this.personData,this.personData.length!=0)
        
  //       if(result[0]!==undefined){
  //         // if(this.personData.length!=0){
  //           this.personId=result.p_id
  //         this.appoint = result[0]
  //         alert(this.appoint.p_id)
  //         this.appointmentService.findAppointmentByPId(this.appoint.p_id).then(result=>{
  //           alert("this.isAppointment=true ")
  //           this.isAppointment=true
  //           if(result[0]!==undefined){
  //                           alert("appintment ready")
  //           }
  //           else{
  //             this.isVisitor=true
              
  //             alert("not exit"+this.personId)
  //              this.isappointenable=true
  //              this.isenable1=true
               
               
  //           }
  //         })
         
  //       }    
  //       else{
  //         console.log("hhh")
  //        this.isVisitor=false
  //         this.isenable1=true
  //         this.visitenable=true
  //       }
  //     })
  //   }
    personId:any    

   

ChangeDateFormat(){
   var date = new Date()
   if ((typeof date) == 'object') {
    var date1 = new Date(date)
    date1.setDate(date.getDate() )
    let splitDate = date1.toISOString().split("T")[0].split("-");
    this.Currentdate = splitDate[2] + '-' + splitDate[1]+'-'+ splitDate[0]
    console.log(this.Currentdate)
           this.appointmentService.getAppointListByDate(this.Currentdate,2).then(result=>{
           
            // this.dataSource = result
            this.dataSource = new MatTableDataSource(result);
		    	this.dataSource.paginator = this.paginator;
            console.log(this.dataSource)
           result.forEach(element => {
              console.log(element.status)
              this.appointmentService.getStatusList().then(result=>{
                result.forEach(element1 => {
                  if(element1.status_id == element.status){
                    element.status = element1.status_name
                  }
                });
              })
              element.persondetail={}
              element.vehicledetal={}
                this.appointmentService.getVisitorById(element.p_id).then(result=>{
               
                  element.persondetail = result[0]
                  this.appointmentService.getVehicleById(element.vehicle_id).then(vehicle=>{
                    element.vehicledetal = vehicle[0]
                  })
                })
                console.log(element)
            });
            });
            //console.log(this.dataSource)
   
  }

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

	addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
		this.events.push(`${type}: ${event.value}`);
  }
  
  // UpdateAppointment(data){
  //  console.log(data)
  //   var today = new Date();
  //   this.appoint.appont_id = data.appont_id
  //   console.log(this.appoint.status)
  //    if(data.status==0){
  //     this.appoint.check_in = today.getHours() + ":" + today.getMinutes();
  //     this.appoint.status = 1
  //     this.appointmentService.updateAppointment(this.appoint).then(result=>{
  //       console.log(result)
  //       this.getAppointList()
  //      })
  //    }
  //    else{
  //      console.log("hii")
  //     this.appoint.check_out = today.getHours() + ":" + today.getMinutes();
  //     this.appoint.status = 2
  //     this.appointmentService.updateAppointment(this.appoint).then(result=>{
  //       console.log(result)
  //       this.getAppointList()
  //      })
  //    }
     
  //    console.log(this.appoint)
   
  // }
      // openTimePicker() {
      //   const amazingTimePicker = this.atp.open();
      //   amazingTimePicker.afterClose().subscribe(time => {
      //     console.log(time);
      //   });
      // }


      // OnDateChange(date) {
      //   console.log(date)
      //   if ((typeof date) == 'object') {
      //     var date1 = new Date(date)
      //     date1.setDate(date.getDate() + 1)
      //     let splitDate = date1.toISOString().split("T")[0].split("-");
      //     var strdate = splitDate[2] + '-' + splitDate[1]+'-'+ splitDate[0]
      //     this.Currentdate = strdate
      //     console.log(this.Currentdate)
      //     this.appointmentService.getAppointListByDate(this.Currentdate).then(result=>{
      //       console.log(result)
      //       this.dataSource = result
      //       this.dataSource.forEach(element => {
      //         element.persondetail={}
      //         element.vehicledetal={}
      //           this.appointmentService.getVisitorById(element.p_id).then(result=>{
      //             console.log(result[0])
      //             element.persondetail = result[0]
      //             this.appointmentService.getVehicleById(element.vehicle_id).then(vehicle=>{
      //               element.vehicledetal = vehicle[0]
      //             })
      //           })
      //       });
      //       console.log(this.dataSource)
      //     })
          
      //   }
      // }

}
 