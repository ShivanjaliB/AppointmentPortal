import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatTableDataSource, MatPaginator } from '@angular/material';
import { AppointmentService } from '../../appointment/service/appointment.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-batchlist',
  templateUrl: './batchlist.component.html',
  styleUrls: ['./batchlist.component.scss']
})
export class BatchlistComponent implements OnInit {

  dataSource1: any = [];
  totdata: any = {}
  displayedColumns = ['bin_code', 'no_of_bins', 'bin_capacity', 'material_code', 'material_qty', 'action'];
  t_quantity: any;
  i: any;
  data: any;
  vehicledetal: any = {}
  vehicleNo: any;
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(@Inject(MAT_DIALOG_DATA) public datafromdock: any, private appointmentService: AppointmentService, private toastr: ToastrService) { }

  ngOnInit() {
    console.log(this.datafromdock)
    this.data = this.datafromdock.batch_id
    console.log(this.datafromdock.vehicledetal.vehicle_no)
    this.vehicleNo = this.datafromdock.vehicledetal.vehicle_no
    this.grtbatchbyid()
  }

  calculateTotalQty(qty, index) {
    console.log(qty, index)
    this.t_quantity = qty
    this.i = index
    console.log(this.t_quantity, this.i)
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  grtbatchbyid() {
    this.appointmentService.getbatchbyid(this.data).then(result => {
      console.log(result, result[0].batchItems.length)
      this.totdata = result[0]
      this.totdata.batchItems.forEach((element, i) => {
        // this.appointmentService.getdatabyassignid(element.assign_id).then(data => {
        //   console.log(data[0])
        // for(var i = 0; i<(result[0].batchItems.length); i++)
        // {
        this.appointmentService.getdatabyassignid(element.assign_id).then(data => {
          console.log(data[0])
          console.log(i)
          result[0].batchItems[i].bin_code = data[0].bin_code
          result[0].batchItems[i].bin_capacity = data[0].capacity
          result[0].batchItems[i].material_code = data[0].mat_code
          this.t_quantity = result[0].batchItems[i].total_qty
          this.dataSource1 = result[0].batchItems
          this.dataSource = new MatTableDataSource(result[0].batchItems);
          this.dataSource.paginator = this.paginator;
          console.log(this.dataSource)
        })
        // }


        // })
      });

    })
  } //grtbatchbyid

  updateBatch(data) {
    console.log(data)
    var send: any = {}
    send = this.totdata
    var updatedbatch: any = []
    updatedbatch = this.dataSource1
    updatedbatch.forEach(element => {
      // delete element.bin_capacity
      // delete element.material_code
    });
    send.batchItems = updatedbatch
    console.log(this.t_quantity, send)
    updatedbatch[this.i].total_qty = this.t_quantity
    //console.log(this.dataSource,updatedbatch)
    this.appointmentService.updateBatch(send).then(result => {
      console.log(result)
      if (result.success == true) {
        this.toastr.success('Batch Updated Successfully!');
      }
    })
  }

}
