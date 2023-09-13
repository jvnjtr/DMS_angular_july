import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalertComponent } from './calert/calert.component';
import { CheaderComponent } from './cheader/cheader.component';
import { CleftmenuComponent } from './cleftmenu/cleftmenu.component';
import { CutilsComponent } from './cutils/cutils.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { CommonPipeModule } from '../common-pipe/common-pipe.module';





@NgModule({
  declarations: [    
    CalertComponent,
    CheaderComponent,
    CleftmenuComponent,
    CutilsComponent,],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgbModule,
    NgxDatatableModule,

    CommonPipeModule
  ],
  exports: [
    CalertComponent,
    CheaderComponent,
    CleftmenuComponent,

    CutilsComponent,
  ]
})
export class ConsoleIncudesModule { }
