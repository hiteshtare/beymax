import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChangepasswordComponent } from './modules/settings/changepassword/changepassword.component'; // custom components
import { ChartsComponent } from './modules/charts/charts.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { FaqComponent } from './modules/about&help/faq/faq.component';
import { FeedbackComponent } from './modules/about&help/feedback/feedback.component';
import { RevokeaccessComponent } from './modules/settings/revokeaccess/revokeaccess.component';
import { Room1Component } from './modules/rooms/room1/room1.component';
import { Room2Component } from './modules/rooms/room2/room2.component';
import { SchedularComponent } from './modules/schedular/schedular.component';
import { ServicestatusComponent } from './modules/about&help/servicestatus/servicestatus.component';
import { VersionComponent } from './modules/about&help/version/version.component'; // custom components

const appRoutes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'changepassword', component: ChangepasswordComponent },
    { path: 'charts/:type', component: ChartsComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'faq', component: FaqComponent },
    { path: 'feedback', component: FeedbackComponent },
    { path: 'revokeaccess', component: RevokeaccessComponent },
    { path: 'room1', component: Room1Component },
    { path: 'room2', component: Room2Component },
    { path: 'schedular', component: SchedularComponent },
    { path: 'servicestatus', component: ServicestatusComponent },
    { path: 'version', component: VersionComponent }
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, { useHash: true });
