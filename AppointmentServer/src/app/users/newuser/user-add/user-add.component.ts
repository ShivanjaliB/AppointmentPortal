import { Component, OnInit, Inject } from '@angular/core';
import { UserserviceService } from '../../userservice.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { VisitorService } from './../../../visitors/service/visitor.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ScanningService } from '../../../Scanning/service/scanning.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {
  user:any={};
  userRole:any=[]
  years = [{id: 1, view:"Admin"},{id: 2, view:"Visitor"}]
  visitorList: any = [];
  location:any=[];
  case:any;
  title:any;
  constructor(
    private userService:UserserviceService,
    private scanninservice:ScanningService,  
    private toastr:ToastrService, 
    @Inject(MAT_DIALOG_DATA) public data: any = {},
    private dialogRef: MatDialogRef<UserAddComponent>,
    	private visitorService: VisitorService,) { 
      this.getUserRoleList()
      this.getvisitorList()
      this.getlocation()
      
      console.log(this.data)
      // if(this.data!=null){
      //  this.user.password= this.data.password
      //  this.user.username=this.data.username
      // //  this.user.u_role=this.data.user_role_id
      // this.user.u_role=10 
      //  this.user.user_id=parseInt(this.data.user_id)
      //  console.log(this.user.u_role)
      //  this.case="1"
      // } else
      // {
      //   console.log("else",this.data)
      //   this.case="2"
      // }
      
    }

  ngOnInit() {
  }

checkdropdown(){
  console.log(this.data)
  if(this.data!=null){
    this.user.password= this.data.password
    this.user.username=this.data.username
    this.user.u_role=parseInt(this.data.user_role_id)
  //  this.user.u_role=10 
    this.user.user_id=parseInt(this.data.user_id)
    this.user.person_id=parseInt(this.data.person_id)
    console.log(this.data.user_id)
    this.case="1"
    this.title="Update"
   } else
   {
     console.log("else",this.data)
     this.case="2"
     this.title="Add"
   }

}

getUserRoleList(){
    this.userService.getUserRoleList().then(result=>{
      console.log(result)
      this.userRole=result;
      this.checkdropdown()
      
    })
  }
  getvisitorList(){
    this.visitorService.getVisitorListByPageno().then(result=>{
      console.log(result)
      this.visitorList=result;
    
    })
  }
  getlocation()
  {
    this.scanninservice.getLocationList(0).then(result=>{
      console.log(result)
      this.location=result;
    
    })
  }
  add(data: any) {
    console.log(data)
    if(this.case!="1")
    {
      this.userService.addUser(data).then(result => {
              console.log(result)
              if (result.success == true) {
                this.toastr.success('User Updated Successfully!');
              } else {
                this.toastr.error('User Failed');
              }
            })
          this.dialogRef.close()
    }else {
            this.userService.updateUser(data).then(result => {
              console.log(result)
              if (result.success == true) {
                this.toastr.success('User Updated Successfully!');
              } else {
                this.toastr.error('User Failed');
              }
            })
          this.dialogRef.close()
    }
  }

  accesslist(selecteddata){
    // alert(selecteddata)
    this.user.user_role_id=selecteddata
   }
   personlist(selecteddata){
    // alert(selecteddata)
    this.user.person_id=selecteddata
   }

   validation_messages = {
    'person_id':[{type: 'required', message: 'Visitor is required.'}],
    'username':[{type: 'required', message: 'Username is required.'}],
    'password':[{type: 'required', message: 'Password  is required.'}],
    'u_role':[{type: 'required', message: 'User Role  is required.'}],
  };
  
  validations_form = new FormGroup({
    person_id: new FormControl('', Validators.required),
    username:new FormControl('', Validators.required),
    password:new FormControl('', Validators.required),
    u_role:new FormControl('', Validators.required)
  });


  public openConfirmationDialog(user) {
    var txt;
    var r = confirm("Are You Sure? ");
    if (r == true) {
      txt = "You pressed OK!";
      console.log(txt)
      this.add(user)
    } else {
      txt = "You pressed Cancel!";
      console.log(txt)
    }
  }
}
