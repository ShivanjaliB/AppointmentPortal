import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ExampleDatabase, ExampleDataSource } from '../../tables/fixed-table/helpers.data';
import { SelectionModel } from '@angular/cdk/collections';
import { TABLE_HELPERS } from '../../tables/feature-table/helpers.data';
import { MatPaginator, MatSort, MatDialog, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { NewVisitorComponent } from '../new-visitor/new-visitor.component';
import { Router } from '@angular/router';
import { VisitorService } from '../service/visitor.service';
import { AppointmentAddComponent } from '../../appointment/appointment-add/appointment-add.component';
import { ToastrService } from 'ngx-toastr';
// import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormControl } from '@angular/forms';
import { AppointmentService } from '../../appointment/service/appointment.service';

@Component({
	selector: 'app-visitor-list',
	templateUrl: './visitor-list.component.html',
	styleUrls: ['./visitor-list.component.scss']
})

export class VisitorListComponent implements OnInit {
	message = new FormControl('Create Appointment');
	message1=new FormControl('Edit Visitor Details');
	showNavListCode;
	displayedColumns = [ 'userName', 'userMobileNumber', 'userCity', 'companyName', 'action','edit'];
	exampleDatabase = new ExampleDatabase();
	selection = new SelectionModel<string>(true, []);
	// dataSource: ExampleDataSource | null;
	// dataSource: any = {};
	dataSource = new MatTableDataSource();
	i: any
	allfeatures = TABLE_HELPERS;
	visitorList: any = [];
	currentDate: string;
	constructor(
		private router: Router,
		public dialog: MatDialog,
		private visitorService: VisitorService,
		private toastr: ToastrService,
		private appointmentService: AppointmentService
	) {
		var today = new Date();
		var dd = String(today.getDate()).padStart(2, '0');
		var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
		var yyyy = today.getFullYear();
		this.currentDate = dd + '-' + mm + '-' + yyyy;
		
	}
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	@ViewChild('filter') filter: ElementRef;

	// ngAfterViewInit() {
	// 	this.dataSource.paginator = this.paginator;
	//    }

	ngOnInit() {
		
		this.getAllVisitors()
		// this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort);
		// observableFromEvent(this.filter.nativeElement, 'keyup').pipe(
		//     debounceTime(150),
		//     distinctUntilChanged(),)
		//     .subscribe(() => {
		//       if (!this.dataSource) { return; }
		//       this.dataSource.filter = this.filter.nativeElement.value;
		//     });


		// this.dataSource = []

	}

	// isAllSelected(): boolean {
	// 	if (!this.dataSource) { return false; }
	// 	if (this.selection.isEmpty()) { return false; }

	// 	if (this.filter.nativeElement.value) {
	// 		return this.selection.selected.length == this.dataSource.renderedData.length;
	// 	} else {
	// 		return this.selection.selected.length == this.exampleDatabase.data.length;
	// 	}
	// }

	applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase();
	  }

	getAllVisitors() {
		this.visitorService.getVisitorListByPageno().then(result => {
			console.log(result)
			// this.dataSource = result
			this.dataSource = new MatTableDataSource(result);
			this.dataSource.paginator = this.paginator;
			// this.dataSource.sort = this.sort;
		})
	}

	personFound:any = false;
	currentRow:any; 
	checkAlready(eachResultContent) {
		if(this.currentRow.p_id == eachResultContent.p_id){
			this.personFound = true
			return false
		} else
		    return true
	}


	// navigateToAppointment(data) {
	// 	console.log(data)
	// 	console.log(this.currentDate)
	// 	this.appointmentService.getAppointListByDate(this.currentDate, 2).then(result => {
	// 		console.log(result,data.p_id,result.p_id,data.p_id == result.p_id)
	// 				if(result.p_id != undefined){
					
	// 				}


	// 		this.currentRow = data
	// 		result.every(this.checkAlready)

	// 		if(this.personFound){
	// 			this.toastr.warning('Appointment Already Created!');
	// 			this.personFound=false
	// 		}
	// 		else{
	// 			const dialogRef = this.dialog.open(NewVisitorComponent, {
	// 					height: '600px',
	// 					width: '900px',
	// 				    data:data
	// 				});
	// 				dialogRef.afterClosed().subscribe(result => {
	// 				    console.log(`Dialog result: ${result}`); 
	// 				    this.router.navigate(['/auth/appointment/appointment-list',{cat:1}]);
	// 				  });
	// 		}
	// 	})
	// 		}
	navigateTovisitoredit(row)
	{
		const dialogRef = this.dialog.open(NewVisitorComponent, {
			height: '600px',
			width: '900px',
			data: {dialogTitle: "edit", dialogText: row}
		});
		dialogRef.afterClosed().subscribe(result => {
			console.log(`Dialog result: ${result}`);
			this.getAllVisitors()
		});

	}


	

	navigateToAppointment(data) {
		console.log(data)
		console.log(this.currentDate)
		// this.appointmentService.getAppointListByDate(this.currentDate, 2).then(result => {
		// 	console.log(result,data.p_id,result.p_id,data.p_id == result.p_id)
				

			//this.currentRow = data
			//result.every(this.checkAlready)

			// if(this.personFound){
			// 	this.toastr.warning('Appointment Already Created!');
			// 	this.personFound=false
			// }
			// else{
				const dialogRef = this.dialog.open(NewVisitorComponent, {
						height: '600px',
						width: '900px',
					    data:data
					});
					dialogRef.afterClosed().subscribe(result => {
						console.log(`Dialog result: ${result}`); 
						if(result===undefined||Object.keys(result).length === 0)
						this.router.navigate(['/auth/visitors/visitor-list']);
						else
						this.router.navigate(['/auth/appointment/appointment-list',{cat:1}]);
					  });
			// }
		// })
			}


	openDialog(): void {
		const dialogRef = this.dialog.open(NewVisitorComponent, {
			height: '600px',
			width: '900px'
		});
		dialogRef.afterClosed().subscribe(result => {
			console.log(`Dialog result: ${result}`);
			this.getAllVisitors()
		});
		
	}

	toggle(id) {
		console.log(id)
		this.router.navigate(['/auth/visitors/visitor-summary', id]);
	}

}

