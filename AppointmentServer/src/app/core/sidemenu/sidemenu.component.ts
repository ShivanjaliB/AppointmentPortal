import { Component, OnInit, Input } from '@angular/core';
import { menus } from './menu-element';

@Component({
    selector: 'cdk-sidemenu',
    templateUrl: './sidemenu.component.html',
    styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent implements OnInit {

    @Input() iconOnly: boolean = false;
    // public menus = menus;
    public menus;
    userrole: any;

    constructor() {

        this.userrole = localStorage.getItem('userrole');
        console.log(this.userrole)
        if (this.userrole == "A-101,V-102") {
            this.menus = [
                {
                    'name': 'Dashboard',
                    'icon': 'dashboard',
                    'link': '/auth/dashboard',
                    'open': false,
                    'chip': false,

                },
                {
                    'name': 'Admin',
                    'icon': 'lock',
                    'link': false,
                    'open': false,
                    'chip': false,
                    'sub': [
                        {
                            'name': 'Material',
                            'icon': 'text_fields',
                            'open': false,
                            'link': 'material/material-list'

                        },
                        {
                            'name': 'Bin',
                            'icon': 'text_fields',
                            'open': false,
                            'link': 'material/bin-list'

                        }
                        ,
                        {
                            'name': 'Location',
                            'icon': 'text_fields',
                            'open': false,
                            'link': 'material/location-list'

                        },

                        {
                            'name': 'User Role',
                            'icon': 'text_fields',
                            'open': false,
                            'link': 'users/userrole-list'

                        },

                        // {
                        //     'name':'User Access List',
                        //     'icon':'text_fields',
                        //     'open':false,
                        //     'link':'users/useraccess-list'

                        // },
                        {
                            'name': 'User List',
                            'icon': 'text_fields',
                            'open': false,
                            'link': 'users/user-list'

                        },
                        {
                            'name': 'Assign List',
                            'icon': 'text_fields',
                            'open': false,
                            'link': 'material/assigned-list'

                        },

                    ]
                },
                {
                    'name': 'Visit Management',
                    'icon': 'swap_horizontal_circle',
                    'open': false,
                    'link': false,
                    'sub': [
                        {
                            'name': 'Visitors',
                            'icon': 'person',
                            'open': false,
                            'link': 'visitors/visitor-list'
                        },
                        {
                            'name': 'Vehicle',
                            'icon': 'directions_transit',
                            'open': false,
                            'link': 'vehicle/vehicle-list'

                        },
                        // {
                        //     'name': 'Appointment ',
                        //     'icon': 'today',
                        //     'open'   : false,
                        //     'link':'appointment/appointment-list'
                        // },

                        // {
                        //     'name':'Invoicing',
                        //     'icon':'list_alt',
                        //     'open':false,
                        //     'link':'dock/dock-list'

                        // }
                        {
                            'name': 'Appointment',
                            'icon': 'list_alt',
                            'open': false,
                            'link': 'appointment/appointment-invoice'

                        }
                    ]
                }
            ]
        } else if (this.userrole == "A-101") {
            this.menus = [
                {
                    'name': 'Dashboard',
                    'icon': 'dashboard',
                    'link': '/auth/dashboard',
                    'open': false,
                    'chip': false,

                },
                {
                    'name': 'Admin',
                    'icon': 'lock',
                    'link': false,
                    'open': false,
                    'chip': false,
                    'sub': [
                        {
                            'name': 'Material',
                            'icon': 'text_fields',
                            'open': false,
                            'link': 'material/material-list'

                        },
                        {
                            'name': 'Bin',
                            'icon': 'text_fields',
                            'open': false,
                            'link': 'material/bin-list'

                        }
                        ,
                        {
                            'name': 'Location',
                            'icon': 'text_fields',
                            'open': false,
                            'link': 'material/location-list'

                        },

                        {
                            'name': 'User Role',
                            'icon': 'text_fields',
                            'open': false,
                            'link': 'users/userrole-list'

                        },

                        // {
                        //     'name':'User Access List',
                        //     'icon':'text_fields',
                        //     'open':false,
                        //     'link':'users/useraccess-list'

                        // },
                        {
                            'name': 'User List',
                            'icon': 'text_fields',
                            'open': false,
                            'link': 'users/user-list'

                        },
                        {
                            'name': 'Assign List',
                            'icon': 'text_fields',
                            'open': false,
                            'link': 'material/assigned-list'

                        },

                    ]
                }]
        } else if (this.userrole == "V-102") {
            this.menus = [
                {
                    'name': 'Dashboard',
                    'icon': 'dashboard',
                    'link': '/auth/dashboard',
                    'open': false,
                    'chip': false,

                },

                {
                    'name': 'Visit Management',
                    'icon': 'swap_horizontal_circle',
                    'open': false,
                    'link': false,
                    'sub': [
                        {
                            'name': 'Visitors',
                            'icon': 'person',
                            'open': false,
                            'link': 'visitors/visitor-list'
                        },
                        {
                            'name': 'Vehicle',
                            'icon': 'directions_transit',
                            'open': false,
                            'link': 'vehicle/vehicle-list'

                        },
                        // {
                        //     'name': 'Appointment ',
                        //     'icon': 'today',
                        //     'open'   : false,
                        //     'link':'appointment/appointment-list'
                        // },

                        // {
                        //     'name':'Invoicing',
                        //     'icon':'list_alt',
                        //     'open':false,
                        //     'link':'dock/dock-list'

                        // }
                        {
                            'name': 'Appointment',
                            'icon': 'list_alt',
                            'open': false,
                            'link': 'appointment/appointment-invoice'

                        }
                    ]
                }
            ]
        }

    }


    // @Input() iconOnly:boolean = false;
    // public menus:any=[];

    // constructor() {
    //   //compare user role access
    //   this.menus = menus;
    //  }


    ngOnInit() {
    }

}
