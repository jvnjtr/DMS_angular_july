import { NgModule } from '@angular/core';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';



export const HttpLoaderFactory= (http:HttpClient) =>{
  let siteURL= environment.siteURL;
  return new TranslateHttpLoader(http,siteURL+'assets/i18n/','.json')
}


import { CommonModule } from '@angular/common';
import { AdminconsoleRoutingModule } from './adminconsole-routing.module';
import { AdminconsoleComponent } from './adminconsole.component';

import { ViewmanageDesignationComponent } from './viewmanage-designation/viewmanage-designation.component';
import { ManageDesignationComponent } from './manage-designation/manage-designation.component';
import { ViewmanageDepartmentComponent } from './viewmanage-department/viewmanage-department.component';
import { ManageDepartmentComponent } from './manage-department/manage-department.component';
import { ViewmanageEmployeeTypeComponent } from './viewmanage-employee-type/viewmanage-employee-type.component';
import { ManageEmployeeTypeComponent } from './manage-employee-type/manage-employee-type.component';
import { ViewmanageRoleComponent } from './viewmanage-role/viewmanage-role.component';
import { ManageRoleComponent } from './manage-role/manage-role.component';
import { ViewmanageGroupsComponent } from './viewmanage-groups/viewmanage-groups.component';
import { ManageGroupsComponent } from './manage-groups/manage-groups.component';
import { ViewmanageLinksComponent } from './viewmanage-links/viewmanage-links.component';
import { ManageLinksComponent } from './manage-links/manage-links.component';
import { ViewmanageUsersComponent } from './viewmanage-users/viewmanage-users.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { ViewsetRolePermissionComponent } from './viewset-role-permission/viewset-role-permission.component';
import { SetRolePermissionComponent } from './set-role-permission/set-role-permission.component';
// import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';

import { AdminconsoledashboardComponent } from './adminconsoledashboard/adminconsoledashboard.component';
import { ConsoleIncudesModule } from '../console-incudes/console-incudes.module';
import { CommonPipeModule } from '../common-pipe/common-pipe.module';







@NgModule({
  declarations: [
    AdminconsoleComponent,

	ViewmanageDesignationComponent,
    ManageDesignationComponent,
    ViewmanageDepartmentComponent,
    ManageDepartmentComponent,
    ViewmanageEmployeeTypeComponent,
    ManageEmployeeTypeComponent,
    ViewmanageRoleComponent,
    ManageRoleComponent,
    ViewmanageGroupsComponent,
    ManageGroupsComponent,
    ViewmanageLinksComponent,
    ManageLinksComponent,
    ViewmanageUsersComponent,
    ManageUsersComponent,
    ViewsetRolePermissionComponent,
    SetRolePermissionComponent,
    AdminconsoledashboardComponent
  ],
  imports: [
    CommonModule,
    AdminconsoleRoutingModule,
    ConsoleIncudesModule,

	HttpClientModule,
                                    FormsModule,
                                    ReactiveFormsModule,
                                    NgxPaginationModule,
                                    NgbModule,
                                    AngularEditorModule,
                                    BsDatepickerModule.forRoot(),
                                    CommonModule,
                                    ConsoleIncudesModule,
                                    CommonPipeModule,
                                    // AngularMultiSelectModule,
                                    TranslateModule.forRoot({
                                      loader: {
                                        provide: TranslateLoader,
                                        useFactory: HttpLoaderFactory,
                                        deps: [HttpClient]
                                      }
                                    }),
  ]
})
export class AdminconsoleModule { }
