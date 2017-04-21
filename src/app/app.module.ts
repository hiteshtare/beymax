import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterializeModule } from 'angular2-materialize'; // Materialize CSS framework
import {
  ButtonModule, CheckboxModule, ConfirmDialogModule, ConfirmationService, ContextMenu, ContextMenuModule,
  DataTableModule, DialogModule, DropdownModule, GrowlModule, InputSwitchModule, InputTextModule, MenuItem,
  MenuModule, PanelModule, SelectItem, SharedModule, SliderModule
} from 'primeng/primeng'; // PrimeNG modules

import { APP_CONFIG, AppConfig } from './shared/config/app.config'; // app config
import { AppComponent } from './app.component'; // app
import { appRoutingProviders, routing } from './app.routing'; // routing
import { CustomErrorHandlerService } from './shared/services/custom-error-handler.service'; // custom shared services
import { NotifyService } from './shared/services/notify.service';
import { MsgComponent } from './shared/components/msg/msg.component'; // custom shared components
import { SidenavComponent } from './shared/components/sidenav/sidenav.component';
import { ChildLinksPipe } from './shared/pipes/child-links.pipe'; // custom pipes
import { RoomNoPipe } from './shared/pipes/room-no.pipe';
import { ChangepasswordService } from './modules/settings/changepassword/changepassword.service'; // custom services
import { DashboardService } from './modules/dashboard/dashboard.service';
import { FeedbackService } from './modules/about&help/feedback/feedback.service';
import { LoginService } from './modules/login/login.service';
import { RevokeAccessService } from './modules/settings/revokeaccess/revokeaccess.service';
import { RoomService } from './modules/rooms/room.service';
import { SchedularService } from './modules/schedular/schedular.service';
import { SidenavService } from './shared/components/sidenav/sidenav.service'; // custom services
import { ChangepasswordComponent } from './modules/settings/changepassword/changepassword.component'; // custom components
import { ChartsComponent } from './modules/charts/charts.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { FaqComponent } from './modules/about&help/faq/faq.component';
import { FeedbackComponent } from './modules/about&help/feedback/feedback.component';
import { LoginComponent } from './modules/login/login.component'; // custom components
import { RevokeaccessComponent } from './modules/settings/revokeaccess/revokeaccess.component';
import { Room1Component } from './modules/rooms/room1/room1.component';
import { Room2Component } from './modules/rooms/room2/room2.component';
import { SchedularComponent } from './modules/schedular/schedular.component';
import { ServicestatusComponent } from './modules/about&help/servicestatus/servicestatus.component';
import { VersionComponent } from './modules/about&help/version/version.component';

@NgModule({
  declarations: [
    AppComponent,
    ChangepasswordComponent,
    ChartsComponent,
    ChildLinksPipe,
    DashboardComponent,
    FaqComponent,
    FeedbackComponent,
    MsgComponent,
    RevokeaccessComponent,
    Room1Component,
    Room2Component,
    RoomNoPipe,
    SchedularComponent,
    ServicestatusComponent,
    SidenavComponent,
    VersionComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    ButtonModule,
    CheckboxModule,
    ConfirmDialogModule,
    ContextMenuModule,
    DataTableModule,
    DialogModule,
    DropdownModule,
    FormsModule,
    GrowlModule,
    HttpModule,
    InputSwitchModule,
    InputTextModule,
    MaterializeModule,
    MenuModule,
    PanelModule,
    ReactiveFormsModule,
    SharedModule,
    SliderModule,
    routing
  ],
  providers: [appRoutingProviders, ChangepasswordService, ConfirmationService, DashboardService, FeedbackService, LoginService,
    NotifyService, RevokeAccessService, RoomService, SchedularService, SidenavService,
    { provide: APP_CONFIG, useValue: AppConfig }, { provide: ErrorHandler, useClass: CustomErrorHandlerService }
  ],
  bootstrap: [AppComponent]
  // bootstrap: [LoginComponent]
})
export class AppModule { }
