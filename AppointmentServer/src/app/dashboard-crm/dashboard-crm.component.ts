import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../appointment/service/appointment.service';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-dashboard-crm',
    templateUrl: './dashboard-crm.component.html',
    styleUrls: ['./dashboard-crm.component.scss']
})

export class DashboardCrmComponent implements OnInit {

   

    // tableData = [
    //     { country: 'India', sales: 5400, percentage: '40%' },
    //     { country: 'Us', sales: 3200, percentage: '30.33%' },
    //     { country: 'Australia', sales: 2233, percentage: '18.056%' },
    //     { country: 'Spaim', sales: 600, percentage: '6%' },
    //     { country: 'China', sales: 200, percentage: '4.50%' },
    //     { country: 'Brazil', sales: 100, percentage: '2.50%' },
    // ];
    Currentdate: any;
    Todayscount:any={};
    dashCard: any={};
    todayscheckin: any;
    todayscVisitorheckin: any;
    todaysVisitorcheckin: any;
    todaysVehiclecheckin: any;

    constructor(private appointmentService : AppointmentService) {
        this.ChangeDateFormat()
       
       
     }

    ngOnInit() {
        
    }

    showtable(id){
        console.log(id)
        if(id==2){
            this.isenable=false
            this.isenable1=true
        }
        else{
            console.log("hii")
            this.isenable=true
            this.isenable1=false
        }
    }
  
    isenable:boolean=true
    isenable1:boolean=false
 
           startDate = new Date(1990, 0, 1);
         date = new FormControl(new Date());
         serializedDate = new FormControl((new Date()).toISOString())
         minDate = new Date(2000, 0, 1);
         maxDate = new Date(2020, 0, 1);
       events: string[] = [];
       
         myFilter = (d: Date): boolean => {
             const day = d.getDay();
             
         return day !== 0 && day !== 6;
         }


         ChangeDateFormat(){
            var date = new Date()
            if ((typeof date) == 'object') {
             var date1 = new Date(date)
             date1.setDate(date.getDate() )
             let splitDate = date1.toISOString().split("T")[0].split("-");
             this.Currentdate = splitDate[2] + '-' + splitDate[1]+'-'+ splitDate[0]
             console.log(this.Currentdate)
             this.appointmentService.getAppointCountByDate(this.Currentdate).then(result=>{
                 this.Todayscount =result
                 console.log(this.Todayscount)
                 this.appointmentService.getappointcountincampusbycat(this.Currentdate,1).then(result=>{
                     console.log(result)
                 this.todaysVisitorcheckin = result
                 this.appointmentService.getappointcountincampusbycat(this.Currentdate,2).then(result=>{
                    this.todaysVehiclecheckin = result
                 this.dashCard = [
                    { colorDark: '#5C6BC0', colorLight: '#7986CB', number:  this.Todayscount , title: 'Expected Today', icon: 'av_timer',id:1 },
                    { colorDark: '#42A5F5', colorLight: '#64B5F6', number: this.todaysVisitorcheckin, title: 'Checked In Visitors', icon: 'how_to_reg',id:2 },
                    { colorDark: '#26A69A', colorLight: '#4DB6AC', number:this.todaysVehiclecheckin, title: 'Checked In Vehicles', icon: 'local_shipping' },
                    // { colorDark: '#66BB6A', colorLight: '#81C784', number: 25, title: 'Other', icon: 'account_balance' }
                ];
            })
             })
           
           }
         
              ) }
}

}