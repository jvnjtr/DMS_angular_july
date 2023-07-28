import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IncludesComponent } from './includes.component';

const routes: Routes = [{ path: '', component: IncludesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IncludesRoutingModule { }
