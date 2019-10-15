import { Component, OnInit, Input, HostListener, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { ScanningService } from '../../Scanning/service/scanning.service';

@Component({
  selector: 'cdk-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {
	isOpen: boolean = false;

  	//currentUser = null;
  	Hari;
  	

  	@Input() currentUser = null;
	currentUserName: string;
  	@HostListener('document:click', ['$event', '$event.target'])
  	onClick(event: MouseEvent, targetElement: HTMLElement) {
    	if (!targetElement) {
     		return;
    	}

    	const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    	if (!clickedInside) {
      		this.isOpen = false;
    	}
  	}
  	
    	  constructor(private elementRef: ElementRef,
		private router:Router,private scanningService:ScanningService) {
			this.currentUserName=localStorage.getItem('username')
		 }


  	ngOnInit() {
  	}


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
}
