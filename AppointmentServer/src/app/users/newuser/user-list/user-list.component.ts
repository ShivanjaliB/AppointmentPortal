import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { UserAddComponent } from '../user-add/user-add.component';
import { UserserviceService } from '../../userservice.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  displayedColumns = ['user','user_contact','user_name','user_role','action'];
  dataSource = new MatTableDataSource();
  message = new FormControl('Edit User');
  user:any={}
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private dialog:MatDialog,
    private userService:UserserviceService) { 
      this.getUserList()
    }

  ngOnInit() {
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  getUserList(){
        this.userService.getUserList().then(result=>{
          console.log(result)
          // this.dataSource = result
          this.dataSource = new MatTableDataSource(result);
          result.forEach(element => {
            element.userrole1={}
           
            this.userService.getUserRoleById(element.user_role_id).then(result=>{
              console.log(result.length)
              if(result.length>=1){
              element.userrole1=result[0]
                console.log("if")
            }else{
               element.userrole1.u_role="--------" 
               console.log("else")
              }
            })
            element.persondetail = {}
          
            this.userService.getVisitorById(element.person_id).then(result => {
              // element.persondetail = result[0]
              
              if(result.length>0)
                {
                element.persondetail=result[0]
            }else{
              
               element.persondetail.p_name="--------" 
               element.persondetail.p_mobile_no="--------"}
            })
          });
          this.dataSource.paginator = this.paginator;
        })
      }
  openDialog(): void {
    const dialogRef = this.dialog.open(UserAddComponent, {
      height: '600px',
      width: '900px'
    }); dialogRef.afterClosed().subscribe(result => {
      this.getUserList()
      // this.getUserRoleList()
    });
  }

  navigateTouseredit(data){
    const dialogRef = this.dialog.open(UserAddComponent, {
      height: '600px',
      width: '900px',
      data:data
    }); dialogRef.afterClosed().subscribe(result => {
      this.getUserList()
      // this.getUserRoleList()
    });
  }
}
