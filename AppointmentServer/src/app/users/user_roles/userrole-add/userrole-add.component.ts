import { Component, OnInit, Inject } from '@angular/core';
import { UserserviceService } from '../../userservice.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ScanningService } from '../../../Scanning/service/scanning.service';

@Component({
  selector: 'app-userrole-add',
  templateUrl: './userrole-add.component.html',
  styleUrls: ['./userrole-add.component.scss']
})
export class UserroleAddComponent implements OnInit {
  urole: any = {}
  // toppings = new FormControl();
  years = [
    {id: 1, view:"Admin",viewValue: "A-101"},
    {id: 2, view:"Visitor",viewValue: "V-102"},
    // {id: 3, view:"both",viewValue: "AV-103"} 
  ]
  test:any=[]
  case:any;
  title:any;
  constructor(private userService:UserserviceService,private scanningservice:ScanningService,
    private toastr:ToastrService, @Inject(MAT_DIALOG_DATA) public data: any = {},
    private dialogRef: MatDialogRef<UserroleAddComponent>) {
      if(this.data!=null){
        console.log("if",this.data)
        this.urole.u_role= this.data.u_role
       
       /*User role -Access list dropdown multiselect */
        if(this.data.u_role_accesslist!=null){
            if(this.data.u_role_accesslist!="A-101,V-102"){
              this.test.push(this.data.u_role_accesslist)
              this.urole.u_role_accesslist = this.test
            }else{
              this.test.push("A-101")
              this.test.push("V-102")
              this.urole.u_role_accesslist = this.test
            }
        }
        this.urole.u_role_code = this.data.u_role_code
        this.urole.u_role_id= this.data.u_role_id
        this.case="1"
        this.title="Update"
      }
      
      else
      {
        console.log("else",this.data)
        this.case="2"
        this.title="Add"
      }
     }

  ngOnInit() {
  }

  add(data: any) {
    console.log(data)
    if(this.case!="1"){
                      /* Add Userrole */
              this.scanningservice.checkrecord("/userrole/getuserrolebyid/",data.u_role_id).then(result=>{
               if(result.length!=0)
                   {
                      this.toastr.error("User Role Already Exist")
                    }else{        

                        this.userService.addUserRole(data).then(result => {
                          console.log(result)
                          if (result.success == true) {
                            this.toastr.success('User Role Created Successfully!');
                          } else {
                            this.toastr.error('User Role Failed');
                          }
              })
            this.dialogRef.close()
          }
       
        })
           
      }else{
                      /* Update Userrole */
              this.userService.updateUserRole(data).then(result => {
                console.log(result)
                if (result.success == true) {
                  this.toastr.success('User Role Updated Successfully!');
                } else {
                  this.toastr.error('User Role Failed');
                }
              })
            this.dialogRef.close()
            }
  }

  accesslist(selecteddata){
   this.urole.u_role_accesslist=selecteddata
  }
  validation_messages = {
    'u_role_accesslist':[{type: 'required', message: 'Accesslist is required.'}],
    'u_role_code':[{type: 'required', message: 'User Role Code is required.'}],
    'u_role':[{type: 'required', message: 'User Role  is required.'}]
  };
  
  validations_form = new FormGroup({
    u_role_accesslist: new FormControl('', Validators.required),
    u_role_code:new FormControl('', Validators.required),
    u_role:new FormControl('', Validators.required)
  });

  public openConfirmationDialog(urole) {
    var txt;
    var r = confirm("Are You Sure? ");
    if (r == true) {
      txt = "You pressed OK!";
      console.log(txt)
      this.add(urole)
    } else {
      txt = "You pressed Cancel!";
      console.log(txt)
    }
  }
}
