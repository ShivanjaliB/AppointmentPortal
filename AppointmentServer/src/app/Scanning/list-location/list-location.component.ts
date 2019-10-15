import { Component, OnInit, ViewChild } from '@angular/core';
import { ScanningService } from '../service/scanning.service';
import { MatDialog, MatSort, MatTableDataSource, MatPaginator } from '@angular/material';
import { AddLocationComponent } from '../add-location/add-location.component';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

export interface UserData {
  loc_name: string;
  description: string;
 
}
const users: UserData[] = [];
// const ELEMENT_DATA: locationElement[] = [
//   { loc_name: 'L1', description: '1.0079'},
//   { loc_name: 'L2', description: '1.0079'},
//   { loc_name: 'L3', description: '1.0079'}
// ];

@Component({
  selector: 'app-list-location',
  templateUrl: './list-location.component.html',
  styleUrls: ['./list-location.component.scss']
})

export class ListLocationComponent implements OnInit  {
  displayedColumns=['loc_name','description','action']
  dataSource = new MatTableDataSource();
  message = new FormControl('Edit Location');
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  //  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  // dataSource=[]
  constructor(private scanningService:ScanningService,
              public dialog: MatDialog,
              private router: Router ) { 
    
    if(localStorage.getItem('userrole')!="V-102") 
      this.getLocationList()
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

//sorting
  ngOnInit() {
    // this.getLocationList()
  }
  public doFilter = (value: string) => {
    // alert(value)
    this.dataSource.filter = value.trim().toLowerCase();
    // alert(this.dataSource.filter)
  }
  getLocationList(){
    this.scanningService.getLocationList(0).then(result=>{
      console.log(result)
     this.dataSource = new MatTableDataSource(result);
     this.dataSource.paginator = this.paginator;
      // users=result
    //  this.dataSource=result
    })
    }
    
    openDialog(): void {
      const dialogRef = this.dialog.open(AddLocationComponent, {
        height: '600px',
        width: '900px'
      });dialogRef.afterClosed().subscribe(result => {
        this.getLocationList()
      });
    }
    // locations:any={}
    // searchloccode(){
    //   alert(this.locations.loc_name)
    //   this.scanningService.getlocationListbyloc_name(this.locations.loc_name).then(result => {
    //     this.dataSource = result
    //     console.log(result)
    
    //   })
    // }

    navigateTolocationedit(data){
          const dialogRef = this.dialog.open(AddLocationComponent, {
            height: '600px',
            width: '900px',
            data:data
          });dialogRef.afterClosed().subscribe(result => {
            this.getLocationList()
          });
         }
}
