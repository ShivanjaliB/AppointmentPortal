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
import { Router } from '@angular/router';
import { AppointmentService } from '../../appointment/service/appointment.service';
import { ScanningService } from './../../Scanning/service/scanning.service';

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
  selector: 'app-vehicle-add',
  templateUrl: './vehicle-add.component.html',
  styleUrls: ['./vehicle-add.component.scss']
})
export class VehicleAddComponent implements OnInit {
  visitor: any = {}
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
  isappoint: any = false
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
  vehicleData: any = {}
  visitorData: any = {}
  vehicle: any = {}
  case:any;
  title:any;
  constructor(private fb: FormBuilder,
    public dialog: MatDialog,
    public visitorService: VisitorService,
    private toastr: ToastrService,
    private router: Router,private scanninservice:ScanningService,
    private appointmentService: AppointmentService,
    private dialogRef: MatDialogRef<VehicleAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any = {}) {
    console.log(this.data)
    this.getlocation();
    
    if(this.data !== null)
    {
      if(this.data.dialogTitle=="edit"){
        this.fromAppointment = false
           this.vehicle = this.data.dialogText
            this.case="1"
            this.title="Edit"
      }
      else {
              this.case="2"
              this.title="Create Appointment"
              this.data.dialogTitle = undefined
              this.isappoint = true
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

                if (this.p !== undefined) {

                  console.log(this.visitor.p_name)
                  var test = this.visitor.p_name.split(" ")

                  this.visitor.fName = test[0]
                  this.visitor.lName = test[1]
                  console.log(test[0])
                  console.log(test[1])

                  console.log(this.visitor)
                    }
            }
    }else{
      // this.data.dialogTitle = undefined
      this.title="Create New"

    }    


    // if (this.data !== null) {
    //           this.isappoint = true
    //           this.visitor = this.data;
    //           var today = new Date();
    //           this.visitor.appoint_time = today.getHours() + ":" + today.getMinutes();
    //           this.v = data.vehicle_id
    //           console.log(this.v)
    //           if (this.v !== undefined) {
    //                     this.visitorService.getVehicleById(this.v).then(result => {
    //                       console.log(result)
    //                       this.vehicle = result[0]
    //                       console.log(this.vehicleInfo)
    //                     })
    //           }
    //         this.fromAppointment = true
    //         console.log(this.fromAppointment)
    //         this.p = data.p_id

    //         if (this.p !== undefined) {

    //           console.log(this.visitor.p_name)
    //           var test = this.visitor.p_name.split(" ")

    //           this.visitor.fName = test[0]
    //           this.visitor.lName = test[1]
    //           console.log(test[0])
    //           console.log(test[1])

    //           console.log(this.visitor)
    //         }
    //     }
  }

  ngOnInit() {
    var date1 = new Date()
    // date1.setDate(date.getDate() + 1)
    let splitDate = date1.toISOString().split("T")[0].split("-");
    var strdate = splitDate[2] + '-' + splitDate[1] + '-' + splitDate[0]
    this.Currentdate = strdate
  }
  location:any=[]
  getlocation()
  {
    this.scanninservice.getLocationList(0).then(result=>{
      console.log(result)
      this.location=result;
    
    })
  }

  myGroup: FormGroup = new FormGroup({
    email: this.emailFormControl,
    fname: this.fnameFormControls,
    // lastname: this.lastnameFormControl,
    // phone: this.phoneFormControl
    // address: this.addressFormControl
  });
  p_id: any

  add(data: any, driver: any) {
    console.log(driver, data)
    console.log(this.fromAppointment, this.data)
    data.vehicle_no
    console.log(data.vehicle_no, driver)
    console.log(this.data == null, data.vehicle_no != undefined, this.data)
    if (this.data == null && data.vehicle_no != undefined &&this.case!="1") {
      console.log("ADD Vehicle CLICKED")
      this.vehicleData.vehicle_name = data.vehicle_name
      this.vehicleData.tranp_name = data.tranp_name
      this.vehicleData.vehicle_no = data.vehicle_no
      this.vehicleData.user_name = "admin"
      this.vehicleData.driver_name = data.driver_name
      this.vehicleData.licene_no = data.licene_no

      this.visitorService.addVehicle(this.vehicleData).then(result => {
        console.log("Vehicle Added Successfully!")
        if (result.success == true) {
          console.log("SUCCESS")
          this.toastr.success('Vehicle Added Successfully!');
          this.dialogRef.close()
          
        } else {
          this.toastr.error('Vehicle Failed');
          this.dialogRef.close()
        }
        // this.vehicleId = result.vehicle_id
        // this.visitorData.vehicle_id = result.vehicle_id
        // this.visitorData.p_mobile_no = driver.p_mobile_no
        // this.visitorData.p_name = driver.fName + "  " + driver.lName
        // this.visitorData.p_address = driver.p_address
        // this.visitorData.aadhar_no = driver.aadhar_no
        // this.visitorData.compony_name = driver.compony_name
        // this.visitorData.city = driver.city
        // this.visitorData.state = driver.state
        // this.visitorData.pincode = driver.pinCode
        // this.visitorData.user_name = "admin"
        // this.visitorData.email = driver.email
        // this.toastr.success('vehicle Added Successfully!');
        // if (this.visitor.p_id == undefined)

        // {
        //             if(this.isappoint == true){
        //     this.visitorService.addVisitor(this.visitorData).then(result => {
        //       console.log(result)
        //       this.personId = result.p_id
        //       if (this.fromAppointment == true) {
        //       this.addAppointment(this.personId)
        //       }
        //     if(this.fromAppointment == false){
        //       if (result.success == true) {
        //         console.log("SUCCESS")
        //         this.toastr.success('Visitor Added Successfully!');
        //       } else {
        //         this.toastr.error('Visitor Failed');
        //       }
        //     }
        //     })
        //   }
        //     this.dialogRef.close()
        //  // })
        // } 

        // else {
        //  this.personId = this.visitor.p_id
        //   if (this.fromAppointment == true) {
        //     this.addAppointment(this.personId)
        //     }
        //     this.dialogRef.close()
        // }

        // if (this.fromAppointment == true) {
        //   console.log(this.personId)
        //   this.dialogRef.close()
        // }
      })
    }
    else if (driver.p_mobile_no != undefined && this.case!="1") {
      this.vehicleId = this.data.vehicle_id
      console.log(this.data.vehicle_id, "not Clicked", driver.p_mobile_no)
      this.visitorData.p_mobile_no = driver.mobNum
      if (driver.fName == undefined) {
        driver.fName = " "
      }
      if (driver.lName == undefined) {
        driver.lName = " "
      }
      this.visitorData.p_name = driver.fName + "  " + driver.lName
      this.visitorData.p_address = driver.p_address
      this.visitorData.aadhar_no = driver.aadhar_no
      this.visitorData.compony_name = driver.compony_name
      this.visitorData.city = driver.city
      this.visitorData.state = driver.state
      this.visitorData.pincode = driver.pinCode
      this.visitorData.user_name = "admin"
      this.visitorData.email = driver.email
      this.visitorData.p_mobile_no = driver.p_mobile_no
      this.visitorData.loc_id=parseInt(driver.loc_id)

      this.visitorService.addVisitor(this.visitorData).then(result => {
        console.log(result)
        this.personId = result.p_id
        console.log(this.personId)
        if (this.fromAppointment == true) {
          this.addAppointment(this.personId,this.visitorData)
        }
        if (this.fromAppointment == false) {
          if (result.success == true) {
            console.log("SUCCESS")
            this.toastr.success('Visitor Added Successfully!');
          } else {
            this.toastr.error('Visitor Failed');
          }
        }
        this.dialogRef.close()
      })

    }else if(this.case!="2")
    {
      console.log("2")
      console.log(data)
      this.visitorService.updateVehicle(data).then(result => {
        console.log("Vehicle Updated Successfully!")
        if (result.success == true) {
          console.log("SUCCESS")
          this.toastr.success('Vehicle Updated Successfully!');
          this.dialogRef.close()
        } else {
          this.toastr.error('Vehicle Failed');
          this.dialogRef.close()
        }
      });
    }else {
      console.log("Incomplete Data")
      this.toastr.warning("Please add driver details")
    }

  }



  newappointid: any
  addAppointment(personId,visitorData) {
    console.log(visitorData)
    // alert(this.visitor.appoint_time+personId+this.Currentdate)
    if (this.isEmpty()) { 
      if(personId!=undefined||this.visitor.appoint_time!=undefined||this.Currentdate!=undefined)
      {
            console.log(personId)
        console.log(this.personId,this.vehicleId)
        this.appointmentData.p_id = personId
          this.appointmentData.vehicle_id = this.vehicleId,
          this.appointmentData.date = this.Currentdate,
          this.appointmentData.purpose = 1,
          this.appointmentData.appoint_cat=2
          this.appointmentData.appoint_time = this.visitor.appoint_time,
          this.appointmentData.user_name = ["admin"],
          this.appointmentData.status = 0
          this.appointmentData.location=[]
              this.appointmentData.location.push({"loc_id":visitorData.loc_id})
        console.log(this.appointmentData)
        this.appointmentService.addAppointment(this.appointmentData).then(result => {
          console.log(result, result.success)
          if (result.success == true) {
            console.log("SUCCESS")
            this.toastr.success('Appointment Added Successfully!');
            this.dialogRef.afterClosed().subscribe(result => {
              console.log(`Dialog result: ${result}`); 
              this.router.navigate(['/auth/appointment/appointment-invoice',{cat:2}]);
            });
          } else {
            this.toastr.error('Appointment Failed');
          }
        })
        this.dialogRef.close()
        this.dialogRef.afterClosed().subscribe(result => {
          console.log(`Dialog result: ${result}`); 
          this.router.navigate(['/auth/appointment/appointment-invoice',{cat:2}]);
        });
      }else{
        console.log("Incomplete Data")
        this.toastr.warning("Please Enter All The Details")
      }
    }else{
      console.log("Incomplete Data")
      this.toastr.warning("Please Enter Appointment Details")
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
  isEmpty() {
    if (this.personId != undefined || 
        this.visitor.appoint_time != undefined || 
        this.visitor.appoint_time != ""|| 
        this.Currentdate != undefined || 
          this.personId != null) {
      console.log("if")
      return true
    } else {
      console.log("else")
      return false
    }
  }

  // public openConfirmationDialog(): void {
  //     const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
  //       width: '250px',
  //       data: {name: this.name, animal: this.animal}
  //     });
  
  //     dialogRef.afterClosed().subscribe(result => {
  //       console.log('The dialog was closed');
  //       // this.animal = result;
  //     });
  //   }



  public openConfirmationDialog(vehicle,visitor) {
    var txt;
    var r = confirm("Are You Sure? ");
    if (r == true) {
      txt = "You pressed OK!";
      console.log(txt)
      this.add(vehicle,visitor)
    } else {
      txt = "You pressed Cancel!";
      console.log(txt)
    }
  }
  
}
