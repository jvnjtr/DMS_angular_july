import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { WorkflowRoutingModule } from './workflow-routing.module';
import { WorkflowComponent } from './workflow.component';
import { ConfigworkflowComponent } from './configworkflow/configworkflow.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { PendingDoclistComponent } from './pending-doclist/pending-doclist.component';
import { ApprovalDocListComponent } from './approval-doc-list/approval-doc-list.component';
import { TakeActionComponent } from './take-action/take-action.component';
import { IncludesModule } from '../includes/includes.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterseptorService } from '../services/token-interseptor.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { AdminModule } from '../admin/admin.module';
import { FiledetailsComponent } from './filedetails/filedetails.component';
import { CKEditorModule } from 'ckeditor4-angular';
import { NotinglistComponent } from './notinglist/notinglist.component';
import { FilehistoryComponent } from './filehistory/filehistory.component';
import { DocpreviewComponent } from './docpreview/docpreview.component';
import { DocPrevOnlyComponent } from './doc-prev-only/doc-prev-only.component';
import { CommonPipeModule } from '../common-pipe/common-pipe.module';


@NgModule({
  declarations: [
    WorkflowComponent,
    ConfigworkflowComponent,
    PendingDoclistComponent,
    ApprovalDocListComponent,
    TakeActionComponent,
    FiledetailsComponent,
    NotinglistComponent,
    FilehistoryComponent,
    DocpreviewComponent,
    DocPrevOnlyComponent
  ],
  imports: [
    CommonModule,
    WorkflowRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDropzoneModule,
    IncludesModule,

    NgbModule,
    CKEditorModule,
    NgxPaginationModule,
    CommonPipeModule
  ],
  exports:[
    ConfigworkflowComponent,
    PendingDoclistComponent,
    ApprovalDocListComponent,
    TakeActionComponent
  ],
  providers: [DatePipe,{
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterseptorService,
    multi:true
  }
  
  
  ],
})
export class WorkflowModule { }
