import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { FormbuilderRoutingModule } from './formbuilder-routing.module';
import { FormbuilderComponent } from './formbuilder.component';
import { AddformComponent } from './addform/addform.component';
import { DragComponent } from './drag/drag.component';
import { DropComponent } from './drop/drop.component';
import { IncludesModule } from '../includes/includes.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterseptorService } from '../services/token-interseptor.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { CKEditorModule } from 'ng2-ckeditor';
import { CommonPipeModule } from '../common-pipe/common-pipe.module';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AddManageformComponent } from './add-manageform/add-manageform.component';
import { ViewManageformComponent } from './view-manageform/view-manageform.component';
import { EditManageformComponent } from './edit-manageform/edit-manageform.component';
import { PreviewFormComponent } from './preview-form/preview-form.component';
import { FormCtrlDetailsComponent } from './form-ctrl-details/form-ctrl-details.component';
import { CkeditornewComponent } from './ckeditornew/ckeditornew.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { FormApplyComponent } from './form-apply/form-apply.component';
import { PreviewFormApplyComponent } from './preview-form-apply/preview-form-apply.component';
import { DynamicformspreviewComponent } from './dynamicformspreview/dynamicformspreview.component';
// import { CkeditornewComponent } from './ckeditornew/ckeditornew.component';

@NgModule({
  declarations: [
    FormbuilderComponent,
    AddformComponent,
    DragComponent,
    DropComponent,
    AddManageformComponent,
    ViewManageformComponent,
    EditManageformComponent,
    PreviewFormComponent,
    FormCtrlDetailsComponent,
    CkeditornewComponent,
    FormApplyComponent,
    PreviewFormApplyComponent,
    DynamicformspreviewComponent
  ],
  imports: [
    CommonModule,
    BsDatepickerModule.forRoot(),
    FormbuilderRoutingModule,
   FormsModule,
    ReactiveFormsModule,
    IncludesModule,
    NgbModule,
    DragDropModule,
    NgxPaginationModule,
    CKEditorModule,
  CommonPipeModule,
  AngularEditorModule,
  BsDatepickerModule.forRoot()
  ],
  exports: [
    FormApplyComponent,
    // PreviewFormApplyComponent
  ],

  providers: [DatePipe
  
  
  ],
})
export class FormbuilderModule { 

}
// ,{
//   provide:HTTP_INTERCEPTORS,
//   useClass:TokenInterseptorService,
//   multi:true
// }