import { Component, OnInit, Inject } from '@angular/core';
import { ScanningService } from './../service/scanning.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AddBinComponent } from '../add-bin/add-bin.component';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-assign',
  templateUrl: './add-assign.component.html',
  styleUrls: ['./add-assign.component.scss']
})
export class AddAssignComponent implements OnInit {
  title:any;
  Binlist:any=[]
  MaterialList:any=[]
  assign:any={}
  form: FormGroup;
  formBuilder: any;
  case:any;
  constructor(private scanningService:ScanningService,
    private toastr: ToastrService, @Inject(MAT_DIALOG_DATA) public data: any = {},
    private dialogRef: MatDialogRef<AddBinComponent> ) { 
    this.getBinList()
    this.getMaterialList()
    this.assign.binqty=1;
    console.log(this.data)
  }

  ngOnInit() {



  }
  validation_messages = {
   
    'capacity':[{type: 'required', message: 'Capacity is required.'}],
    'materialname':[{type: 'required', message: 'Material Name is required.'}],
    'bincode':[{type: 'required', message: 'Bincode is required.'}],
    //'modules':[{type: 'required', message: 'modules is required.'}]
  };
  
  validations_form = new FormGroup({
    capacity: new FormControl('', Validators.required),
    materialname:new FormControl('', Validators.required),
    bincode:new FormControl('', Validators.required)
  });
  getBinList(){
    this.scanningService.getBeanList().then(result=>{
      console.log(result)
      this.Binlist=result;
    })
  }
  getMaterialList(){
    this.scanningService.getMaterialList().then(result=>{
      console.log(result)
      
      this.MaterialList=result;
      this.checkdropdown()
    })
  }
  checkdropdown(){
    console.log(this.data)
    if(this.data!=null){
      this.title="Update"
      this.assign.assign_id=this.data.assign_id
      this.assign.bin_code= this.data.bin_code
      this.assign.mat_code=this.data.mat_code
      this.assign.capacity=this.data.capacity

      this.case="1"
     } else
     {
      this.title="Add"
       console.log("else",this.data)
       this.case="2"
     }
  
  }
  add(data: any) {
  
    console.log(data)
    if(this.case!="1"){
          this.scanningService.addassign(data).then(result => {
            console.log(result)
            if (result.success == true) {
              this.toastr.success('BinAssign Added Successfully!');
            } else {
              this.toastr.error('BinAssign Failed');
            }
          })
          this.dialogRef.close()
    }else{
      this.scanningService.updateassign(data).then(result => {
        console.log(result)
        if (result.success == true) {
          this.toastr.success('BinAssign Update Successfully!');
        } else {
          this.toastr.error('BinAssign Failed');
        }
      })
      this.dialogRef.close()
    }
  }

  public openConfirmationDialog(assign) {
    var txt;
    var r = confirm("Are You Sure? ");
    if (r == true) {
      txt = "You pressed OK!";
      console.log(txt)
      this.add(assign)
    } else {
      txt = "You pressed Cancel!";
      console.log(txt)
    }
  }
}
