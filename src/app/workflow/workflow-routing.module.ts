import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkflowComponent } from './workflow.component';
import { PendingDoclistComponent } from './pending-doclist/pending-doclist.component';
import { ApprovalDocListComponent } from './approval-doc-list/approval-doc-list.component';
import { TakeActionComponent } from './take-action/take-action.component';
import { AuthGuard } from '../admin/auth.guard';
import { FilehistoryComponent } from './filehistory/filehistory.component';

const routes: Routes = [
  { path: '', component: WorkflowComponent,
  children: [
    { path: '', redirectTo: '/pendingdocs',pathMatch: 'full'},
    { path: 'pendingdocs', component:PendingDoclistComponent,canActivate: [AuthGuard]},
    { path: 'summarydocs', component:ApprovalDocListComponent,canActivate: [AuthGuard]},
    { path: 'takeaction/:id', component:TakeActionComponent,canActivate: [AuthGuard]},
    { path: 'filehistory/:id', component:FilehistoryComponent,canActivate: [AuthGuard]},
  ]
    

    
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkflowRoutingModule { }
