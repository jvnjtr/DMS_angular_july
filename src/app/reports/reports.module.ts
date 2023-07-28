import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';
import { PendingapprovalsComponent } from './pendingapprovals/pendingapprovals.component';
import { NearretentionsComponent } from './nearretentions/nearretentions.component';
import { AllsharedfilesComponent } from './allsharedfiles/allsharedfiles.component';
import { SearchwiseComponent } from './searchwise/searchwise.component';
import { FolderwiseComponent } from './folderwise/folderwise.component';
import { AllfilesComponent } from './allfiles/allfiles.component';
import { ReportindexComponent } from './reportindex/reportindex.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IncludesModule } from '../includes/includes.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterseptorService } from '../services/token-interseptor.service';
import { HighchartsChartModule } from 'highcharts-angular';
import { DocSearchPipe } from './doc-search.pipe';
import { CommonPipeModule } from '../common-pipe/common-pipe.module';

@NgModule({
  declarations: [
    ReportsComponent,
    PendingapprovalsComponent,
    NearretentionsComponent,
    AllsharedfilesComponent,
    SearchwiseComponent,
    FolderwiseComponent,
    AllfilesComponent,
    ReportindexComponent,
    DocSearchPipe,
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule, 
    FormsModule,
    ReactiveFormsModule,
  
    IncludesModule,
    NgbModule,
    HighchartsChartModule,
    NgxPaginationModule,
    CommonPipeModule
  ],
  providers: [DatePipe,{
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterseptorService,
    multi:true
  }]
})
export class ReportsModule { }
