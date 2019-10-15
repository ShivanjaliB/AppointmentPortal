import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatDialog, MatPaginator } from '@angular/material';
import { AddAssignComponent } from '../add-assign/add-assign.component';
import { ScanningService } from '../service/scanning.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { SummaryAssignComponent } from '../summary-assign/summary-assign.component';

@Component({
  selector: 'app-list-assign',
  templateUrl: './list-assign.component.html',
  styleUrls: ['./list-assign.component.scss']
})
export class ListAssignComponent implements OnInit {
  message = new FormControl('Edit AssignMaterials');
  displayedColumns = ['Bin_code','Bin_Qty','mat_code', 'mat_Qty','action'];
  // dataSource: any = [];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(public dialog: MatDialog,private router: Router,
              private scaningService: ScanningService) {
    if(localStorage.getItem('userrole')!="V-102") 
    this.getAssignList()
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
  openDialog(): void {
    const dialogRef = this.dialog.open(AddAssignComponent, {
      height: '600px',
      width: '900px'
    });dialogRef.afterClosed().subscribe(result => {
      this.getAssignList()
    });
  }
  getAssignList(){
    this.scaningService.getAssignList().then(result =>{
      console.log(result)
      this.dataSource = new MatTableDataSource(result);
      this.dataSource.paginator = this.paginator;
    })
  }
  navigateToassignedit(data){

        if(data!=null)
        {
            const dialogRef = this.dialog.open(AddAssignComponent, {
              height: '600px',
              width: '900px',
              data:data
            });dialogRef.afterClosed().subscribe(result => {
              this.getAssignList()
            });
        }
   }
   //table row click
  toggle(row){
    let id =  row.assign_id
    // this.toastr.success('Appointment Summary', '');
    // this.router.navigate(['auth/material/assigned-list/summary-assign', id]);
   
        const dialogRef = this.dialog.open(SummaryAssignComponent, {
          height: '600px',
          width: '900px',
          data:row,
        });dialogRef.afterClosed().subscribe(result => {
          // this.getAssignList()
        });
     }
}
