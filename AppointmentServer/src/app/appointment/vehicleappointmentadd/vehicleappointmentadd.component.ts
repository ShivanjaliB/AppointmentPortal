import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { MatDialog, ErrorStateMatcher, MatDatepickerInputEvent } from '@angular/material';
// import { MyErrorStateMatcher } from '../../material-widgets/select/select.component';
import { input_HELPERS, Messages, Links } from '../../material-widgets/input/helpers.data';
// import { VisitorService } from '../service/visitor.service';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { ToastrService } from 'ngx-toastr';
import { VisitorService } from '../../visitors/service/visitor.service';
import { AppointmentService } from '../service/appointment.service';
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const fnamepatt = '[a-zA-Z]+([a-zA-Z ]+)*';
const lnamepatt = '[a-zA-Z]+([a-zA-Z ]+)*';
const mobpatt = /^(((\+){0,1}91|0)(\s){0,1}(\-){0,1}(\s){0,1}){0,1}[7-9][0-9](\s){0,1}(\-){0,1}(\s){0,1}[1-9]{1}[0-9]{7}$/


@Component({
  selector: 'app-vehicleappointmentadd',
  templateUrl: './vehicleappointmentadd.component.html',
  styleUrls: ['./vehicleappointmentadd.component.scss']
})
export class VehicleappointmentaddComponent implements OnInit {
  vehicleId: any
  tranp_name: any = ""
  number: any = ""
  vehicle_no: any = ""
  vehicleName: any = ""
  public addCusForm: FormGroup;
  add_vehicle = false;
  wasFormChanged = false;
  public breakpoint: number; // Breakpoint observer code
  public fname: string = `Ramesh`;
  public lname: string = `Suresh`;
  InputHelpers: any = input_HELPERS;
  links = Links;
  selectedValue;
  showMultiListCode: boolean = false;
  isenable: boolean = true;
  messages = Messages;
  value = 'Clear me';
  vehicle_id: number;
  appointmentData: any = {}
  personId: any;
  v: any;
  vehicleInfo: any = {};
  Currentdate: string;
  p: any;
  displayvehicle() {
    this.add_vehicle = true;
    this.isenable = false
  }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  emailFormControls = new FormControl('', [
    Validators.required,
    Validators.pattern(EMAIL_REGEX)]);

  timeFormControls = new FormControl('', [
    Validators.required,
    // Validators.aadhar,
  ]);
  aadharFormControls = new FormControl('', [
    Validators.required,
    // Validators.pattern(EMAIL_REGEX)
  ]);
  dateFormControls = new FormControl('', [
    Validators.required,
    // Validators.pattern(EMAIL_REGEX)
  ]);
  fnameFormControls = new FormControl('', [
    Validators.required,
    Validators.pattern(fnamepatt)
  ]);
  lnameFormControls = new FormControl('', [
    Validators.required,
    Validators.pattern(lnamepatt)
  ]);
  p_mobile_noFormControls = new FormControl('', [
    Validators.required,
    Validators.pattern(mobpatt)
  ]);




  fromAppointment: boolean = false
  appoint_time: any
  matcher = new MyErrorStateMatcher();
  visitor: any = {}
  vehicleData: any = {}
  visitorData: any = {}
 
  vehicle: any = {
  }
  
  constructor(private fb: FormBuilder,
    public dialog: MatDialog,
    public visitorService: VisitorService,
      private toastr: ToastrService,
      private appointmentService:AppointmentService,
 private dialogRef: MatDialogRef<VehicleappointmentaddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any = {}
    ) { 
      if (this.data !== null) {
        this.visitor = this.data;
       var today = new Date();
       this.visitor.appoint_time = today.getHours() + ":" + today.getMinutes();
       this.v = data.vehicle_id
       console.log(this.v)
       if (this.v !== undefined) {
         this.visitorService.getVehicleById(this.v).then(result => {
           console.log(result)
           this.vehicle = result[0]
           console.log(this.vehicleInfo)
         })
       }
       this.fromAppointment = true
       console.log(this.fromAppointment)
       this.p = data.p_id
      
       if(this.p !== undefined)
      {
       
      
       console.log(this.visitor.p_name)
       var test = this.visitor.p_name.split(" ")
   
       this.visitor.fName = test[0]
       this.visitor.lName = test[1]
       console.log(test[0])
       console.log(test[1])
      
       console.log(this.visitor)
      }
     }
    }

  ngOnInit() {
    var date1 = new Date()
    // date1.setDate(date.getDate() + 1)
    let splitDate = date1.toISOString().split("T")[0].split("-");
    var strdate = splitDate[2] + '-' + splitDate[1] + '-' + splitDate[0]
    this.Currentdate = strdate
  }

  myGroup: FormGroup = new FormGroup({
    email: this.emailFormControl,
    fname: this.fnameFormControls,
    // lastname: this.lastnameFormControl,
    // phone: this.phoneFormControl
    // address: this.addressFormControl
  });
  p_id: any

  add(data: any, data1: any) {
   
    console.log(this.fromAppointment)
    data.vehicle_no
    // this.visitorData=data1.fname
    console.log(data.vehicle_no, data1)
    if (this.v == undefined && data.vehicle_no != undefined) {
      console.log("ADD Vehicle CLICKED")
      this.vehicleData.tranp_name = data.tranp_name
      this.vehicleData.vehicle_no = data.vehicle_no
      this.vehicleData.user_name = "admin"
      this.vehicleData.driver_name = data.driver_name
      this.vehicleData.licene_no = data.licene_no
     // this.visitorService.getLatestVehicleId().then(result => {
        
       // this.vehicle_id = parseInt(result[0].vehicle_id) + 1
        this.vehicleData.vehicle_id = 1

        this.visitorService.addVehicle(this.vehicleData).then(result => {
          if (result.success == true) {
            console.log("SUCCESS")
           // this.toastr.success('vehicle Added Successfully!');
          } else {
            //this.toastr.error('Visitor Failed');
          }
          this.vehicleId = result.vehicle_id
          this.visitorData.vehicle_id = result.vehicle_id
          this.visitorData.p_mobile_no = data1.p_mobile_no
          this.visitorData.p_name = data1.fName + "  " + data1.lName
          this.visitorData.p_address = data1.p_address
          this.visitorData.aadhar_no = data1.aadhar_no
          this.visitorData.compony_name = data1.compony_name
          this.visitorData.city = data1.city
          this.visitorData.state = data1.state
          this.visitorData.pincode = data1.pinCode
          this.visitorData.user_name = "admin"
          this.visitorData.email = data1.email
         // this.toastr.success('vehicle Added Successfully!');
          if (this.visitor.p_id == undefined)
          //person not exist
          {
           // this.visitorService.getLatestVisitorId().then(result => {
             // console.log(result.response[0].p_id)
              // if (result.response[0].p_id != undefined) {
              //   this.visitorData.p_id = parseInt(result.response[0].p_id) + 1
              // } else {
                this.visitorData.p_id = 1
              // }
              this.visitorService.addVisitor(this.visitorData).then(result => {
                console.log(result)
                this.personId = result.p_id
                if (this.fromAppointment == true) {
                this.addAppointment(this.personId)
                }
              if(this.fromAppointment == false){
                if (result.success == true) {
                  console.log("SUCCESS")
                  this.toastr.success('Visitor Added Successfully!');
                } else {
                  this.toastr.error('Visitor Failed');
                }
              }
              })
              this.dialogRef.close()
           // })
          } else {
            this.personId = this.visitor.p_id
            if (this.fromAppointment == true) {
              this.addAppointment(this.personId)
              }
              this.dialogRef.close()
          }

          if (this.fromAppointment == true) {
            console.log(this.personId)
           // this.addAppointment(this.personId)
            this.dialogRef.close()
          }
        })
     // })
    }
    //else
    else {
      this.visitorData.p_mobile_no = data1.mobNum
      if (data1.fName == undefined) {
        data1.fName = " "
      }
      if (data1.lName == undefined) {
        data1.lName = " "
      }
      this.visitorData.p_name = data1.fName + "  "+ data1.lName
      this.visitorData.p_address = data1.p_address 
      this.visitorData.aadhar_no = data1.aadhar_no
      this.visitorData.compony_name = data1.compony_name
      this.visitorData.city = data1.city
      this.visitorData.state = data1.state
      this.visitorData.pincode = data1.pinCode
      this.visitorData.user_name = "admin"
      this.visitorData.email = data1.email
 this.visitorData.p_mobile_no = data1.p_mobile_no
     
      console.log("ADD Vehicle NOT CLICKED", this.visitorData)

      if (this.visitor.p_id == undefined)
      //person not exist
      {
        this.visitorService.getLatestVisitorId().then(result => {
          console.log(result.response[0].p_id)
          if (result.response[0].p_id != undefined) {
            this.visitorData.p_id = parseInt(result.response[0].p_id) + 1
          } else {
            this.visitorData.p_id = 1
          }
          this.visitorService.addVisitor(this.visitorData).then(result => {
            console.log(result)
                      this.personId = result.p_id
                      console.log(this.personId)
                      if (this.fromAppointment == true) {
                        this.addAppointment(this.personId)
                        }
            if(this.fromAppointment == false){
              if (result.success == true) {
                console.log("SUCCESS")
                this.toastr.success('Visitor Added Successfully!');
              } else {
                this.toastr.error('Visitor Failed');
              }
            }
            this.dialogRef.close()
          })
        })

      } else { this.personId = this.visitor.p_id 
        if (this.fromAppointment == true) {
          this.addAppointment(this.personId)
          }
      }


      if (this.fromAppointment == true) {
        console.log(this.personId)
        //this.addAppointment(this.personId)
        
      }
    }
  }

  newappointid:any
    addAppointment(personId) {
      // var date = new Date()
      // if ((typeof date) == 'object') {
      //  var date1 = new Date(date)
      //  date1.setDate(date.getDate() )
      //  let splitDate = date1.toISOString().split("T")[0].split("-");
      //  var todaydate = splitDate[2] + '-' + splitDate[1]+'-'+ splitDate[0]
      //  var monyear =  splitDate[1] + '-' + splitDate[0]
      //  var year = splitDate[0]
      //  console.log(monyear)
      //  if(monyear=="04-2019"){
      //    console.log("ddddd")
      //  }
      //  else{
      //   var s1:any 
      //   s1 = year.slice(2,4)
      //   var s3 = s1
      //   console.log(s1)
      //   var s2:any
      //   s2 = ++s1
      //   this.newappointid = s3+""+s2+"00001"
      //   console.log(++this.newappointid)
      //  }
     
      console.log(personId)
      this.visitorService.getLatestAppointmentId().then(result => {
       // console.log(result.response[0].appont_id, result.response.appont_id)
        console.log(this.personId)
        this.appointmentData.p_id = personId
       this.appointmentData.appont_id = parseInt(result.response[0].appont_id) + 1,
          this.appointmentData.vehicle_id = this.vehicleId,
          this.appointmentData.date = this.Currentdate,
          this.appointmentData.purpose = 1,
          this.appointmentData.appoint_cat=2
          this.appointmentData.appoint_time = this.visitor.appoint_time,
          this.appointmentData.user_name = ["admin"],
          this.appointmentData.status = 0
        //  this.appointmentData.appont_id=1
        console.log(this.appointmentData)
        this.appointmentService.addAppointment(this.appointmentData).then(result => {
          console.log(result, result.success)
          if (result.success == true) {
            console.log("SUCCESS")
            this.toastr.success('Appointment Added Successfully!');
          } else {
            this.toastr.error('Appointment Failed');
          }
        })
        this.dialogRef.close()
      })
     }
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

}
