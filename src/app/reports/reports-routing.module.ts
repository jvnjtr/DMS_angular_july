import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportsComponent } from './reports.component';
import { ReportindexComponent } from './reportindex/reportindex.component';
import { AuthGuard } from '../admin/auth.guard';
import { SearchwiseComponent } from './searchwise/searchwise.component';
import { AllsharedfilesComponent } from './allsharedfiles/allsharedfiles.component';
import { NearretentionsComponent } from './nearretentions/nearretentions.component';
import { FolderwiseComponent } from './folderwise/folderwise.component';
import { AllfilesComponent } from './allfiles/allfiles.component';
import { PendingapprovalsComponent } from './pendingapprovals/pendingapprovals.component';

const routes: Routes = [{ path: '', component: ReportsComponent , children: [
  { path: '', redirectTo: '/allreports',pathMatch: 'full'},
  { path: 'allreports', component:ReportindexComponent,canActivate: [AuthGuard]},
  { path: 'searchwise', component:SearchwiseComponent,canActivate: [AuthGuard]},
  { path: 'sharedfilewise', component:AllsharedfilesComponent,canActivate: [AuthGuard]},
  { path: 'newarretiondate', component:NearretentionsComponent,canActivate: [AuthGuard]},
  { path: 'folderwise', component:FolderwiseComponent,canActivate: [AuthGuard]},
  { path: 'allfiles', component:AllfilesComponent,canActivate: [AuthGuard]},
  { path: 'pendingapprovals', component:PendingapprovalsComponent,canActivate: [AuthGuard]}
]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
