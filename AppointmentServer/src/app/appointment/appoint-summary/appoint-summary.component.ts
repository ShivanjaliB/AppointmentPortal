import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VisitorService } from '../../visitors/service/visitor.service';
import { AppointmentService } from '../service/appointment.service';

import { MatDialog } from '@angular/material';
import { BatchlistComponent } from '../../dock/batchlist/batchlist.component';



@Component({
  selector: 'app-appoint-summary',
  templateUrl: './appoint-summary.component.html',
  styleUrls: ['./appoint-summary.component.scss']
})
export class AppointSummaryComponent implements OnInit {
  id: any;
  personDetails:any={}
  vehicleDetails: any={}
  vehicleId: any;
  appoint: any={};
  elementType: 'url' | 'canvas' | 'img' = 'url';
  value: string 
  constructor(private route:ActivatedRoute,
    private visitorService:VisitorService,
    public appointmentService:AppointmentService,
    private dialog: MatDialog
    // public visitorService:VisitorService,
    ) {
      // this.appoint.personDetails={}
    this.id = this.route.snapshot.params["id"]
  

   }

  ngOnInit() {
    console.log(this.id)
    this.value= this.id
    this.getAppintById()
  }


  getAppintById(){
     this.appointmentService.findAppointmentById(this.id).then(result=>{
      this.appoint = result[0]
     
      result.forEach(element => {
        this.appoint.statusp=element.status
        console.log(element,element.status)
        this.appointmentService.getStatusById(element.status).then(result=>{
          console.log(result[0].status_name)
          this.appoint.status=result[0].status_name
        })
      });
     
      if(this.appoint.status == 0){
        this.appoint.status = "Expected on" +" "+ this.appoint.date + ","+this.appoint.appoint_time

      }else if(this.appoint.status == 1){
        this.appoint.status = "Checked In"
      }
      else if(this.appoint.status == 1){ this.appoint.status = "Checked Out"}
      // this.appoint.personDetails={}
      this.visitorService.getVisitorById(this.appoint.p_id).then(result=>{
        this.personDetails = result[0]
        console.log(this.appoint)
        console.log(this.personDetails)
      })
    })
  }

  openBatchComponent(row): void {
  this.appointmentService.getAppointListByDateStatusCat
  (row.date,row.statusp,row.appoint_cat).then(result=>{
    const dialogRef = this.dialog.open(BatchlistComponent, {
      height: '600px',
      width: '900px',
      data: result
    });
  })
  
  }
}
