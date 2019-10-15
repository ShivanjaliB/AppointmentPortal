import { Component, OnInit, Inject } from '@angular/core';
import { ScanningService } from '../service/scanning.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-material',
  templateUrl: './add-material.component.html',
  styleUrls: ['./add-material.component.scss']
})
export class AddMaterialComponent implements OnInit {
  bean: any = {}
  bean_capacity: any = ""
  material: any = {}
  mat: string[];
  case:any;
  title:any;
  constructor(private scannService: ScanningService,
              private toastr: ToastrService,
              @Inject(MAT_DIALOG_DATA) public data: any = {},
              private dialogRef: MatDialogRef<AddMaterialComponent>) { 
                if(data!=null){                
                    this.material.mat_code=data.mat_code
                    this.material.mat_name=data.mat_name
                    this.case="1"
                    this.title="Update"
                  }else
                  {
                    console.log("else",this.data)
                    this.case="2"
                    this.title="Add"
                  }
              }

  ngOnInit() {
  }

  add(data: any) {
    // this.checkmaterialexist(data.mat_code)
   
    
    // this.mat = ["helm", "bat"]
    
    // data.material = this.mat
    // data.bean_code = 9
    //console.log(data)
    if(this.case!="1"){
      //Materail code exist
      this.scannService.getmaterialbyname(data.mat_code).then(result=>{
          
          if(result.length!=0)
            {
              this.toastr.error("Material Name Already Exist")
            }else{
              this.scannService.addMaterial(data).then(result => {
                console.log(result)
                if (result.success == true) {
                  this.toastr.success('Material Added Successfully!');
                  
                } else {
                  this.toastr.error('Material Failed');
                }
              })
              this.dialogRef.close()
            }
       
      })
         
    }else{
      this.scannService.updateMaterial(data).then(result => {
        console.log(result)
        if (result.success == true) {
          this.toastr.success('Material Updated Successfully!');
          
        } else {
          this.toastr.error('Material Failed');
        }
      })
      this.dialogRef.close()
    }

  }
  validation_messages = {
   
    'mat_code':[{type: 'required', message: 'Material Code is required.'}],
    'mat_name':[{type: 'required', message: 'Material Name is required.'}]
    
  };
  
  validations_form = new FormGroup({
    mat_code: new FormControl('', Validators.required),
    mat_name:new FormControl('', Validators.required),
    
  });

  public openConfirmationDialog(material) {
    // this.scannService.confirm('Please confirm..', 'Do you really want to ... ?')
    // .then((confirmed) => console.log('User confirmed:', confirmed))
    // .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  var txt;
  var r = confirm("Are You Sure? ");
  if (r == true) {
    txt = "You pressed OK!";
    console.log(txt)
    this.add(material)
  } else {
    txt = "You pressed Cancel!";
    console.log(txt)
  }
}
 matcehck:any;
checkmaterialexist(material){
 let matpresent:any;
        this.scannService.getmaterialbyname(material).then(result=>{
          if(result.length!=0)
          {
            matpresent="found"
          }else{
            matpresent="no records"
          }
         
        })
}
}
