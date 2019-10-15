import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-summary-assign',
  templateUrl: './summary-assign.component.html',
  styleUrls: ['./summary-assign.component.scss']
})
export class SummaryAssignComponent implements OnInit {
  elementType: 'url' | 'canvas' | 'img' = 'url';
  value: string 
  assign:any={}
  constructor(@Inject(MAT_DIALOG_DATA) public data: any = {},) { 
    this.value="Bin_1"
    this.assign=this.data
    this.value=this.data.bin_code
  }

  ngOnInit() {
  }

}
