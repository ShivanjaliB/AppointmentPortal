import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ExampleDatabase, ExampleDataSource } from '../../tables/fixed-table/helpers.data';
import { SelectionModel } from '@angular/cdk/collections';
import { TABLE_HELPERS } from '../../tables/feature-table/helpers.data';
import { MatPaginator, MatSort, MatDialog, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AppointmentAddComponent } from '../../appointment/appointment-add/appointment-add.component';
import { ToastrService } from 'ngx-toastr';
import { FormControl } from '@angular/forms';
import { AddMaterialComponent } from '../add-material/add-material.component';
import { ScanningService } from '../service/scanning.service';

@Component({
  selector: 'app-list-material',
  templateUrl: './list-material.component.html',
  styleUrls: ['./list-material.component.scss']
})

export class ListMaterialComponent implements OnInit {
  message = new FormControl('Edit Materials');
  displayedColumns = ['mat_code', 'mat_name','action'];
  // dataSource: any = [];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public dialog: MatDialog,private router: Router, 
              private scaningService: ScanningService) {

   if(localStorage.getItem('userrole')!="V-102") 
        this.getMaterialList()
    else
      this.logout()
  }
     /*Access Control */
     logout(){
      this.scaningService.dologout().then(result=>{
        console.log(result)
        if(result.success == true){
          console.log("Logged Out")
        this.router.navigate(['/']);
        }
        else{
          console.log("Something Went Wrong")
        }
      })
    
    
    }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
  }

  getMaterialList() {
    this.scaningService.getMaterialList().then(result => {
      // this.dataSource = result
      this.dataSource = new MatTableDataSource(result);
      this.dataSource.paginator = this.paginator;
      console.log(result)
    //  if(result!=[]){ 
    //    //this.commonService.changeLoginSource(true);
    //   // this.storage.set('token', result);}
    //   localStorage.setItem('user',result.token)
    //  }
    })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddMaterialComponent, {
      height: '600px',
      width: '900px'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getMaterialList()
    });
  }
  //Filter by mat code
  materilas: any = {};
 
  searchmatcode(){
    // alert(this.materilas.mat_code)
    this.scaningService.getMaterialListbymatcode(this.materilas.mat_code).then(result => {
      this.dataSource = result
      console.log(result)
  
    })
  }

  navigateTomatedit(data){
    if(data!=null)
    {
      const dialogRef = this.dialog.open(AddMaterialComponent, {
        height: '600px',
        width: '900px',
        data:data
      });
      dialogRef.afterClosed().subscribe(result => {
        this.getMaterialList()
      });
    }
 }
}
