import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormbuilderComponent } from './formbuilder.component';
import { AddformComponent } from './addform/addform.component';
import { AuthGuard } from '../admin/auth.guard';
import { AddManageformComponent } from './add-manageform/add-manageform.component';
import { ViewManageformComponent } from './view-manageform/view-manageform.component';
import { PreviewFormComponent } from './preview-form/preview-form.component';
import { DynamicformspreviewComponent } from './dynamicformspreview/dynamicformspreview.component';
import { PreviewFormApplyComponent } from './preview-form-apply/preview-form-apply.component';
import { TemplateConfigComponent } from './template-config/template-config.component';
import { ViewTemplateConfigComponent } from './view-template-config/view-template-config.component';

const routes: Routes = [{ path: '', component: FormbuilderComponent ,
children: [
  { path: '', redirectTo: '/addForm',pathMatch: 'full'},
  { path: 'addManageform', component: AddManageformComponent,canActivate: [AuthGuard] },
  { path: 'viewManageform', component: ViewManageformComponent,canActivate: [AuthGuard]},
  { path: 'editManageform/:id', component: AddManageformComponent,canActivate:[AuthGuard]},
  { path: 'addForm', component: AddformComponent,canActivate: [AuthGuard] },
  { path: 'addForm/:id', component: AddformComponent,canActivate: [AuthGuard] },
  { path: 'formPreview/:id', component : PreviewFormComponent,canActivate: [AuthGuard]},
  { path: 'templateConfig', component : TemplateConfigComponent,canActivate: [AuthGuard]},
  { path: 'templateConfig/:id', component : TemplateConfigComponent,canActivate: [AuthGuard]},
  { path: 'templateConfigEdit/:id', component : TemplateConfigComponent,canActivate: [AuthGuard]},
  { path: 'viewTemplateConfig', component : ViewTemplateConfigComponent,canActivate: [AuthGuard]},
  { path: 'dynamicFormsPreview/:id', component: DynamicformspreviewComponent },
]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormbuilderRoutingModule { }
