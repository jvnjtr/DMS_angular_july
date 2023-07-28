import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './admin/auth.guard';
import { WindowPrevComponent } from './window-prev/window-prev.component';
import { CreateDocInputsComponent } from './create-doc-inputs/create-doc-inputs.component';


const routes: Routes = [
{path: '', pathMatch: 'full', redirectTo: '/login'},
{path:'login',component: LoginComponent},
{path:'windowPrev/:id',component: WindowPrevComponent},
{path:'createdocument/:id',component: CreateDocInputsComponent},
{ path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),canActivate: [AuthGuard] }, 
{ path: 'includes', loadChildren: () => import('./includes/includes.module').then(m => m.IncludesModule) },
{ path: 'workflow', loadChildren: () => import('./workflow/workflow.module').then(m => m.WorkflowModule),canActivate: [AuthGuard]},
{ path: 'reports', loadChildren: () => import('./reports/reports.module').then(m => m.ReportsModule),canActivate: [AuthGuard] },

{path:'**',component:ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
