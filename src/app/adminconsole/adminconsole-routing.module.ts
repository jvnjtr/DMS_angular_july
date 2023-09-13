import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminconsoleComponent } from './adminconsole.component';

// import { AuthGuard } from '../auth.guard';


import { ManageDesignationComponent } from './manage-designation/manage-designation.component';
import { ViewmanageDesignationComponent } from './viewmanage-designation/viewmanage-designation.component';
import { ManageDepartmentComponent } from './manage-department/manage-department.component';
import { ViewmanageDepartmentComponent } from './viewmanage-department/viewmanage-department.component';
import { ManageEmployeeTypeComponent } from './manage-employee-type/manage-employee-type.component';
import { ViewmanageEmployeeTypeComponent } from './viewmanage-employee-type/viewmanage-employee-type.component';
import { ManageRoleComponent } from './manage-role/manage-role.component';
import { ViewmanageRoleComponent } from './viewmanage-role/viewmanage-role.component';
import { ManageGroupsComponent } from './manage-groups/manage-groups.component';
import { ViewmanageGroupsComponent } from './viewmanage-groups/viewmanage-groups.component';
import { ManageLinksComponent } from './manage-links/manage-links.component';
import { ViewmanageLinksComponent } from './viewmanage-links/viewmanage-links.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { ViewmanageUsersComponent } from './viewmanage-users/viewmanage-users.component';
import { SetRolePermissionComponent } from './set-role-permission/set-role-permission.component';
import { ViewsetRolePermissionComponent } from './viewset-role-permission/viewset-role-permission.component';
import { AdminconsoledashboardComponent } from './adminconsoledashboard/adminconsoledashboard.component';
import { AuthGuard } from '../admin/auth.guard';






const routes: Routes = [{ path: '', component: AdminconsoleComponent },
{ path: '', component: AdminconsoleComponent, children : [
	
{ path: 'set-role-permission', component: SetRolePermissionComponent,canActivate: [AuthGuard]},
{ path: 'set-role-permission/:id', component: SetRolePermissionComponent,canActivate: [AuthGuard]},
{ path: 'viewset-role-permission', component: ViewsetRolePermissionComponent },

{ path: 'manage-users', component: ManageUsersComponent,canActivate: [AuthGuard]},
{ path: 'manage-users/:id', component: ManageUsersComponent,canActivate: [AuthGuard]},
{ path: 'viewmanage-users', component: ViewmanageUsersComponent },

{ path: 'manage-links', component: ManageLinksComponent,canActivate: [AuthGuard]},
{ path: 'manage-links/:id', component: ManageLinksComponent,canActivate: [AuthGuard]},
{ path: 'viewmanage-links', component: ViewmanageLinksComponent },

{ path: 'manage-groups', component: ManageGroupsComponent,canActivate: [AuthGuard]},
{ path: 'manage-groups/:id', component: ManageGroupsComponent,canActivate: [AuthGuard]},
{ path: 'viewmanage-groups', component: ViewmanageGroupsComponent },


{ path: 'manage-role', component: ManageRoleComponent,canActivate: [AuthGuard]},
{ path: 'manage-role/:id', component: ManageRoleComponent,canActivate: [AuthGuard]},
{ path: 'viewmanage-role', component: ViewmanageRoleComponent },


{ path: 'manage-employee-type', component: ManageEmployeeTypeComponent,canActivate: [AuthGuard]},
{ path: 'manage-employee-type/:id', component: ManageEmployeeTypeComponent,canActivate: [AuthGuard]},
{ path: 'viewmanage-employee-type', component: ViewmanageEmployeeTypeComponent },


{ path: 'manage-department', component: ManageDepartmentComponent,canActivate: [AuthGuard]},
{ path: 'manage-department/:id', component: ManageDepartmentComponent,canActivate: [AuthGuard]},
{ path: 'viewmanage-department', component: ViewmanageDepartmentComponent },


{ path: 'manage-designation', component: ManageDesignationComponent,canActivate: [AuthGuard]},
{ path: 'manage-designation/:id', component: ManageDesignationComponent,canActivate: [AuthGuard]},
{ path: 'viewmanage-designation', component: ViewmanageDesignationComponent,canActivate: [AuthGuard]},
{ path: 'adminconsole-dashboard', component: AdminconsoledashboardComponent,canActivate: [AuthGuard]},
]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminconsoleRoutingModule { }
