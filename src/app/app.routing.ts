import { LoginComponent } from './modules/login/login.component';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './shared/guards/auth.guard'; // custom guard
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
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent, canActivate: [AuthGuard] }, // login
    { path: 'changepassword', component: ChangepasswordComponent, canActivate: [AuthGuard] },
    { path: 'charts/:type', component: ChartsComponent, canActivate: [AuthGuard] },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'faq', component: FaqComponent, canActivate: [AuthGuard] },
    { path: 'feedback', component: FeedbackComponent, canActivate: [AuthGuard] },
    { path: 'revokeaccess', component: RevokeaccessComponent, canActivate: [AuthGuard] },
    { path: 'room1', component: Room1Component, canActivate: [AuthGuard] },
    { path: 'room2', component: Room2Component, canActivate: [AuthGuard] },
    { path: 'schedular', component: SchedularComponent, canActivate: [AuthGuard] },
    { path: 'servicestatus', component: ServicestatusComponent, canActivate: [AuthGuard] },
    { path: 'version', component: VersionComponent, canActivate: [AuthGuard] }
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, { useHash: true });
