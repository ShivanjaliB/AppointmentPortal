import { Component, OnInit } from '@angular/core';
import { Route, ActivatedRoute } from '@angular/router';
import { VisitorService } from '../service/visitor.service';

@Component({
  selector: 'app-vendor-summary',
  templateUrl: './vendor-summary.component.html',
  styleUrls: ['./vendor-summary.component.scss']
})
export class VendorSummaryComponent implements OnInit {
  id: any;
  personDetails:any={}
  vehicleDetails: any={}
  vehicleId: any;
  constructor(private route:ActivatedRoute,private visitorService:VisitorService) {
    this.id = this.route.snapshot.params["id"]
   }

  ngOnInit() {
    console.log(this.id)
    this.getDetailsById()
  }
  getDetailsById(){
this.visitorService.getVisitorById(this.id).then(result=>{
  console.log(result,result[0].vehicle_id)
  this.vehicleId=result[0].vehicle_id
  this.personDetails = result
  console.log(this.personDetails)
  if(result[0].vehicle_id != undefined){
this.visitorService.getVehicleById(result[0].vehicle_id).then(result=>{
  this.vehicleDetails=result
  console.log(result)
})
  }
})
  }
  
}
