import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatTableDataSource, MatPaginator } from '@angular/material';
import { UserserviceService } from '../../userservice.service';
import { UserroleAddComponent } from '../userrole-add/userrole-add.component';
import { ScanningService } from '../../../Scanning/service/scanning.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-userrole-list',
  templateUrl: './userrole-list.component.html',
  styleUrls: ['./userrole-list.component.scss']
})
export class UserroleListComponent implements OnInit {
  message = new FormControl('Edit UserRoles');
  displayedColumns = ['u_role','u_role_code','u_role_accesslist','action'];
  // dataSource=[]
  dataSource = new MatTableDataSource();
  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private dialog:MatDialog,private router: Router,
              private scanningService:ScanningService,
               private userService:UserserviceService) {
    
    if(localStorage.getItem('userrole')!="V-102") 
    this.getUserRoleList()
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
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
this.getUserRoleList()
  }

  getUserRoleList(){
this.userService.getUserRoleList().then(result=>{
  console.log(result)
  // this.dataSource = result
  this.dataSource = new MatTableDataSource(result);
  this.dataSource.paginator = this.paginator;
})
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(UserroleAddComponent, {
      height: '600px',
      width: '900px'
    }); dialogRef.afterClosed().subscribe(result => {

      this.getUserRoleList()
    });
  }
  navigateTouserroleedit(data){
      const dialogRef = this.dialog.open(UserroleAddComponent, {
        height: '600px',
        width: '900px',
        data:data
      }); dialogRef.afterClosed().subscribe(result => {

        this.getUserRoleList()
      });
  }

}
