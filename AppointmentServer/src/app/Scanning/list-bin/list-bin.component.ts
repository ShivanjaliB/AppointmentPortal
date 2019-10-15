import { Component, OnInit, ViewChild } from '@angular/core';
import { ScanningService } from '../service/scanning.service';
import { MatDialog, MatTableDataSource, MatPaginator } from '@angular/material';
import { AddBinComponent } from '../add-bin/add-bin.component';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-list-bin',
  templateUrl: './list-bin.component.html',
  styleUrls: ['./list-bin.component.scss']
})
export class ListBinComponent implements OnInit {
  message = new FormControl('Edit Bins');
  displayedColumns = ['bin_code', 'bin_details','action'];
  // dataSource=[]
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  constructor(private scanningService:ScanningService,
              public dialog: MatDialog,
              private router: Router ) { 
    if(localStorage.getItem('userrole')!="V-102") 
      this.getBinList()
      else
      this.logout()
  }
  /*Access Control */
  logout(){
    this.scanningService.dologout().then(result=>{
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
  ngOnInit() {
     }

getBinList(){
this.scanningService.getBeanList().then(result=>{
  console.log(result)
//  this.dataSource=result
this.dataSource = new MatTableDataSource(result);
this.dataSource.paginator = this.paginator;    
})
}

openDialog(): void {

  const dialogRef = this.dialog.open(AddBinComponent, {
    height: '600px',
    width: '900px'
  });dialogRef.afterClosed().subscribe(result => {
    this.getBinList()
  });
}
 //Filter by bin code
 bins: any = {};
 
 searchmatcode(){
  //  alert(this.bins.bin_code)
   this.scanningService.getbinListbybintcode(this.bins.bin_code).then(result => {
     this.dataSource = result
     console.log(result)
 
   })
 }
 navigateTobinedit(data){
    if(data!=null)
    {
        const dialogRef = this.dialog.open(AddBinComponent, {
          height: '600px',
          width: '900px',
          data:data
        });dialogRef.afterClosed().subscribe(result => {
          this.getBinList()
        });
    }
 }
}
