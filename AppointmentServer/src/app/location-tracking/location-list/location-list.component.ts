import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.scss']
})
export class LocationListComponent implements OnInit {
  displayedColumns = ['sr_no','vehicle_no','driver_contactno','appointment_id','location','action'];
  constructor() { }

  ngOnInit() {
  }

}
