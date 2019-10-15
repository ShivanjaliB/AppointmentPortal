import { Component, OnInit } from '@angular/core';
import { UserserviceService } from '../../userservice.service';

@Component({
  selector: 'app-access-list',
  templateUrl: './access-list.component.html',
  styleUrls: ['./access-list.component.scss']
})
export class AccessListComponent implements OnInit {
  displayedColumns = ['entity','activity','u_role'];
  dataSource=[]
  constructor(private userService:UserserviceService) { }

  ngOnInit() {
this.getUserAccessList()
    }

getUserAccessList(){
  // userroleaccess/getuseraccesslist/1
  this.userService.getUserAccessList().then(result=>{
    console.log(result)
    this.dataSource = result
    result.forEach(element => {
      console.log(element,element.u_role_id)
      this.userService.getUserRoleById(element.u_role_id).then(roleresult=>{
        console.log(roleresult[0].u_role)
        element.u_role = roleresult[0].u_role
      })
    });
    
  })
}

 
 

}
