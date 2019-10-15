import { Component, OnInit, Inject } from '@angular/core';
import { ScanningService } from '../service/scanning.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-bin',
  templateUrl: './add-bin.component.html',
  styleUrls: ['./add-bin.component.scss']
})
export class AddBinComponent implements OnInit {
  bin: any = {}
  case:any;
  title:any;
  constructor(private scannService: ScanningService, 
    private toastr: ToastrService, @Inject(MAT_DIALOG_DATA) public data: any = {},
    private dialogRef: MatDialogRef<AddBinComponent>) { 
        if(this.data!=null){
          console.log("if",this.data)
          this.bin.bin_code=data.bin_code
          this.bin.bin_details=data.bin_details
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
    // u_role_id:req.body.u_role_id,
    //     u_role:req.body.u_role,
    //     u_role_code:req.body.u_role_code,
    //     username:req.body.username,
    console.log(data)
    if(this.case!="1"){
      this.scannService.checkrecord("/bin/getbinbyid/",data.bin_code).then(result=>{
        if(result.length!=0)
        {
          this.toastr.error("Bin Name Already Exist")
        }else{
              this.scannService.addBin(data).then(result => {
                console.log(result)
                if (result.success == true) {
                  this.toastr.success('Bin Added Successfully!');
                } else {
                  this.toastr.error('Bin Failed');
                }
              })
            
              this.dialogRef.close()
            }
       
          })
             
        }else{
            this.scannService.updateBin(data).then(result => {
              console.log(result)
              if (result.success == true) {
                this.toastr.success('Bin Updated Successfully!');
              } else {
                this.toastr.error('Bin Failed');
              }
            })
            this.dialogRef.close()
      }
    
  }
  validation_messages = {
   
    'bincodedetails':[{type: 'required', message: 'Bin Details  required.'}],
    'bincode':[{type: 'required', message: 'Bincode is required.'}]
  
  };
  
  validations_form = new FormGroup({
    bincodedetails: new FormControl('', Validators.required),
    bincode:new FormControl('', Validators.required)
  });

  public openConfirmationDialog(bin) {
  var txt;
  var r = confirm("Are You Sure? ");
  if (r == true) {
    txt = "You pressed OK!";
    console.log(txt)
    this.add(bin)
  } else {
    txt = "You pressed Cancel!";
    console.log(txt)
  }
}
}
