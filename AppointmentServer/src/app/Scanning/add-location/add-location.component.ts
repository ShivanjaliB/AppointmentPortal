import { Component, OnInit, Inject } from '@angular/core';
import { ScanningService } from '../service/scanning.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.scss']
})
export class AddLocationComponent implements OnInit {
location:any={}
case:any;
title:any;
  constructor(private scannService: ScanningService, 
    private toastr: ToastrService,@Inject(MAT_DIALOG_DATA) public data: any = {},
    private dialogRef: MatDialogRef<AddLocationComponent>) {
      console.log(this.data)
      if(this.data!=null){

          this.location.description= this.data.description
          this.location.loc_id= this.data.loc_id
          this.location.loc_name=this.data.loc_name
          this.case="1"
          this.title="Update"
          }else{
              this.case="2"
              this.title="Add"
          }
        }

  ngOnInit() {
  }

  add(data: any) {
    console.log(data)
    if(this.case!="1")
    {
            
      this.scannService.checkrecord("/location/getlocationlistByloc_name/",data.loc_name).then(result=>{
        if(result.length!=0)
        {
          this.toastr.error("Location Name Already Exist")
        }else{
        this.scannService.addLocation(data).then(result => {
              console.log(result)
              if (result.success == true) {
                this.toastr.success('location Added Successfully!');
              } else {
                this.toastr.error('Location Failed');
              }
            })
            this.dialogRef.close()
          }
       
        })
           
      }else{
          this.scannService.updateLocation(data).then(result => {
            console.log(result)
            if (result.success == true) {
              this.toastr.success('location Updated Successfully!');
            } else {
              this.toastr.error('Location Failed');
            }
          })
          this.dialogRef.close()
    }
  }
  validation_messages = {
    'description':[{type: 'required', message: 'Location Description is required.'}],
    'loc_name':[{type: 'required', message: 'Location Name is required.'}]
  };
  
  validations_form = new FormGroup({
    description: new FormControl('', Validators.required),
    loc_name:new FormControl('', Validators.required)
  });

  public openConfirmationDialog(location) {
    var txt;
    var r = confirm("Are You Sure? ");
    if (r == true) {
      txt = "You pressed OK!";
      console.log(txt)
      this.add(location)
    } else {
      txt = "You pressed Cancel!";
      console.log(txt)
    }
  }
}
