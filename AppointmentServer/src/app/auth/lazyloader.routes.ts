import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { DashboardCrmComponent } from '../dashboard-crm/dashboard-crm.component';

export const appRoutes: Routes = [{
    path: '', component: AuthComponent, children: [
        { path: 'dashboard', component: DashboardCrmComponent },
        { path: 'material-widgets', loadChildren: '../material-widgets/material-widgets.module#MaterialWidgetsModule' },
        { path: 'tables', loadChildren: '../tables/tables.module#TablesModule' },
        { path: 'maps', loadChildren: '../maps/maps.module#MapsModule' },
        { path: 'charts', loadChildren: '../charts/charts.module#ChartsModule' },
        // { path: 'chats', loadChildren: '../chats/chat.module#ChatsModule' }, // fix this
        //{ path: 'mail', loadChildren: '../mail/mail.module#MailModule' }, // fix this
        { path: 'pages', loadChildren: '../pages/pages.module#PagesModule' },
        { path: 'forms', loadChildren: '../forms/forms.module#FormModule' }, //fix this
        { path: 'guarded-routes', loadChildren: '../guarded-routes/guarded-routes.module#GuardedRoutesModule' },
        // { path: 'editor', loadChildren: '../editor/editor.module#EditorModule' }, 
        { path: 'scrumboard', loadChildren: '../scrumboard/scrumboard.module#ScrumboardModule' },
        { path: 'visitors', loadChildren: '../visitors/visitors.module#VisitorsModule' },
        { path: 'users', loadChildren: '../users/users.module#UsersModule' },
        { path: 'appointment', loadChildren: '../appointment/appointment.module#AppointmentModule' },
        {path:'vehicle',loadChildren:'../vehicle/vehicle.module#VehicleModule'},
        {path:'material',loadChildren:'../Scanning/scanning.module#ScanningModule'},
        {path:'location-tracking',loadChildren:'../location-tracking/locationtracking.module#LocationtrackingModule'},
        {path:'dock',loadChildren:'../dock/dock.module#DockModule'}
    ]
}];
 