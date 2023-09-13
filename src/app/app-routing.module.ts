import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './admin/auth.guard';
import { WindowPrevComponent } from './window-prev/window-prev.component';
import { CreateDocInputsComponent } from './create-doc-inputs/create-doc-inputs.component';
// import { DynamicFormToPdfComponent } from './dynamic-form-to-pdf/dynamic-form-to-pdf.component';


const routes: Routes = [
{path: '', pathMatch: 'full', redirectTo: '/login'},
{path:'login',component: LoginComponent},
// {path:'configuraion',component: ConfigurationComponent},
{path:'windowPrev/:id',component: WindowPrevComponent},
{path:'createdocument/:id',component: CreateDocInputsComponent},
// {path:'dynamicformToPdf/:id',component: DynamicFormToPdfComponent},
{ path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),canActivate: [AuthGuard] }, 
{ path: 'adminconsole', loadChildren: () => import('./adminconsole/adminconsole.module').then(m => m.AdminconsoleModule),canActivate: [AuthGuard] },
{ path: 'includes', loadChildren: () => import('./includes/includes.module').then(m => m.IncludesModule) },

{ path: 'workflow', loadChildren: () => import('./workflow/workflow.module').then(m => m.WorkflowModule),canActivate: [AuthGuard]},
{ path: 'reports', loadChildren: () => import('./reports/reports.module').then(m => m.ReportsModule),canActivate: [AuthGuard] },
{ path: 'consoleincludes', loadChildren: () => import('./console-incudes/console-incudes.module').then(m => m.ConsoleIncudesModule) },
{ path: 'formbuilder', loadChildren: () => import('./formbuilder/formbuilder.module').then(m => m.FormbuilderModule) },
{path:'**',component:ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
