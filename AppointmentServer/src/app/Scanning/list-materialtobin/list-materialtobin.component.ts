import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ScanningService } from '../service/scanning.service';
import { AddMaterialtobinComponent } from '../add-materialtobin/add-materialtobin.component';

@Component({
  selector: 'app-list-materialtobin',
  templateUrl: './list-materialtobin.component.html',
  styleUrls: ['./list-materialtobin.component.scss']
})
export class ListMaterialtobinComponent implements OnInit {
  displayedColumns = ['mat_code', 'bin_code','capacity'];
  dataSource: any = [];
  constructor(public dialog: MatDialog, private scaningService: ScanningService) {
    this.getAssignList()
   }

  ngOnInit() {
  }


  getAssignList(){
    this.scaningService.getAssignList().then(result =>{
      console.log(result)
      this.dataSource = result
    })
  }

 
  openDialog(): void {
    const dialogRef = this.dialog.open(AddMaterialtobinComponent, {
      height: '600px',
      width: '900px'
    });
  }

}
