import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { MatDialog, ErrorStateMatcher, MatDatepickerInputEvent } from '@angular/material';
// import { MyErrorStateMatcher } from '../../material-widgets/select/select.component';
import { input_HELPERS, Messages, Links } from '../../material-widgets/input/helpers.data';
import { VisitorService } from '../../visitors/service/visitor.service';

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
  selector: 'app-appointment-add',
  templateUrl: './appointment-add.component.html',
  styleUrls: ['./appointment-add.component.scss']
})
export class AppointmentAddComponent implements OnInit {
  public qrdata: string = null;

  searchOpen: boolean = false;
  public addCusForm: FormGroup;
  add_vehicle = false;
  wasFormChanged = false;
  public breakpoint: number; // Breakpoint observer cod
  InputHelpers: any = input_HELPERS;
	links = Links;
  selectedValue;
  appoint:any={};
  vehicle:any={};
	showMultiListCode: boolean = false;
	isenable: boolean = true;
  messages = Messages;
  shownext:boolean=false;
  value = 'Clear me';
 
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
  displayvehicle(){
    // this.add_vehicle = true;
    this.isenable=false
  }

	// emailFormControls = new FormControl('', [
	// 	Validators.required,
	// 	Validators.email,
	// ]);

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
		this.events.push(`${type}: ${event.value}`);
	}

  //   fnameFormControls = new FormControl('', [
  //     Validators.required,
  //     Validators.pattern(fnamepatt)
  //   ]);
  //   lnameFormControls = new FormControl('', [
  //     Validators.required,
  //     Validators.pattern(lnamepatt)
  //   ]);
  //   p_mobile_noFormControls = new FormControl('', [
  //     Validators.required,
  //     Validators.pattern(mobpatt)
  //   ]);
  //   pincodeFormControls = new FormControl('', [
  //     Validators.required,
  //     Validators.pattern(mobpatt)
  //   ]);
   

    searchPerson(){
     
      console.log(this.appoint.p_mobile_no)
      this.visitorService.getVisitorByMobileNumber(this.appoint.p_mobile_no).then(result=>{
          console.log(result)
          if(result[0]!==undefined){
            this.appoint = result[0]
            this.shownext=true
          }    
        })
      }
  
      searchVehicle(){
      console.log("jjj",this.vehicle.vehicle_no)
        this.visitorService.getVehicleByVehNo(this.vehicle.vehicle_no).then(result=>{
          this.vehicle = result[0]
          if(this.vehicle!==undefined){
            this.add_vehicle = true;
            this.isenable=false
          }
          console.log(result)
        })
         
      }
	matcher = new MyErrorStateMatcher();
  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    public visitorService: VisitorService,
    
  ) { this.qrdata = 'Initial QR code data string'; }

  ngOnInit() {
    // this.addCusForm = this.fb.group({
    //   IdProof: null,
    //   fnameFormControls: [null, [Validators.required, Validators.pattern('[a-zA-Z]+([a-zA-Z ]+)*')]],
    //   lastname: [null, [Validators.required, Validators.pattern('[a-zA-Z]+([a-zA-Z ]+)*')]],
    //   emailFormControls: [null, [Validators.required, Validators.email]],
    //   aadhar: [null, [Validators.required]],
 
    // });
    // this.breakpoint = window.innerWidth <= 600 ? 1 : 2;
  }

  submit(){
    console.log(this.addCusForm)
  }
}
