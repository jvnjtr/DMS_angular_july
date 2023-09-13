import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IncludesModule } from '../includes/includes.module';
import { UploadfileComponent } from './uploadfile/uploadfile.component';
import { NewfolderComponent } from './newfolder/newfolder.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { ViewDocumentComponent } from './view-document/view-document.component';
import { ShareDocumentComponent } from './share-document/share-document.component';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SetreminderComponent } from './setreminder/setreminder.component';
import { RetentionComponent } from './retention/retention.component';
import { MetaDetailsComponent } from './meta-details/meta-details.component';
import { FilenumberingComponent } from './filenumbering/filenumbering.component';
import { PreviewFileComponent } from './preview-file/preview-file.component';
import { AngularEditorModule } from '@kolkov/angular-editor';


import { FilemodifyComponent } from './filemodify/filemodify.component';
import { RecentfilesComponent } from './recentfiles/recentfiles.component';

import { HighchartsChartModule } from 'highcharts-angular';

import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { TokenInterseptorService } from '../services/token-interseptor.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { ViewMetaComponent } from './view-meta/view-meta.component';
import { NgxTagsInputModule } from 'ngx-tags-input';
import { MovetofolderComponent } from './movetofolder/movetofolder.component';
import { SearchpipePipe } from './searchpipe.pipe';

import { MetasearchPipe } from './metasearch.pipe';
import { ArchivelistComponent } from './archivelist/archivelist.component';
import { SharedfilesComponent } from './sharedfiles/sharedfiles.component';
import { UserlistComponent } from './userlist/userlist.component';
import { FilevesionsComponent } from './filevesions/filevesions.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { PdfdemoComponent } from './pdfdemo/pdfdemo.component';
import { FilepropertiesComponent } from './fileproperties/fileproperties.component';
import { SingleFolderdetailsComponent } from './single-folderdetails/single-folderdetails.component';
import { CreateFolderComponent } from './create-folder/create-folder.component';

import { UpdateFolderComponent } from './update-folder/update-folder.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { WorkflowModule } from '../workflow/workflow.module';
import { RecentactivitiesComponent } from './recentactivities/recentactivities.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { FeedbackreportComponent } from './feedbackreport/feedbackreport.component';
import { CKEditorModule } from 'ckeditor4-angular';

import { ScanuploadComponent } from './scanupload/scanupload.component';

import { MsgengineLibModule } from 'msgengine-lib';
import { FileLogComponent } from './file-log/file-log.component';
import { ManageLanguageComponent } from './manage-language/manage-language.component';
import { LanguagelabelsComponent } from './languagelabels/languagelabels.component';
import { ViewalllanguagesComponent } from './viewalllanguages/viewalllanguages.component';
import { CommonPipeModule } from '../common-pipe/common-pipe.module';
import { CreatedocComponent } from './createdoc/createdoc.component';
import { ConfigGeneralComponent } from './config-general/config-general.component';
import { ConfigOCRComponent } from './config-ocr/config-ocr.component';
import { ConfigStampingComponent } from './config-stamping/config-stamping.component';
import { ViewdraftdocumentComponent } from './viewdraftdocument/viewdraftdocument.component';
import { ConfigSignatureComponent } from './config-signature/config-signature.component';
import { ViewSignatureComponent } from './view-signature/view-signature.component';
import { FormbuilderModule } from '../formbuilder/formbuilder.module';
import { DynFormToPdfComponent } from './dyn-form-to-pdf/dyn-form-to-pdf.component';
import { ViewStampingComponent } from './view-stamping/view-stamping.component';








@NgModule({
  declarations: [
    AdminComponent,
    
    DashboardComponent,
         UploadfileComponent,
         NewfolderComponent,
         ViewDocumentComponent,
         ShareDocumentComponent,
         SetreminderComponent,
         RetentionComponent,
         MetaDetailsComponent,
         FilenumberingComponent,
         PreviewFileComponent,
     
        
         FilemodifyComponent,
         RecentfilesComponent,
      
        ViewMetaComponent,
        MovetofolderComponent,
        SearchpipePipe,
   
        MetasearchPipe,
        ArchivelistComponent,
        SharedfilesComponent,
        UserlistComponent,
        FilevesionsComponent,
        PdfdemoComponent,
        FilepropertiesComponent,
        SingleFolderdetailsComponent,
        CreateFolderComponent,
        
        UpdateFolderComponent,
                 RecentactivitiesComponent,
                 ChangepasswordComponent,
                 FeedbackreportComponent,
                 
                 ScanuploadComponent,
                 FileLogComponent,
                 ManageLanguageComponent,
                 LanguagelabelsComponent,
                 ViewalllanguagesComponent,
                 CreatedocComponent,
                 ConfigGeneralComponent,
                 ConfigOCRComponent,
                 ConfigStampingComponent,
                 ViewdraftdocumentComponent,
                 ConfigSignatureComponent,
                 ViewSignatureComponent,
                 DynFormToPdfComponent,
                 ViewStampingComponent,
         
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    IncludesModule,
    WorkflowModule,
    NgxDropzoneModule,
    NgxDocViewerModule,
    AngularMultiSelectModule,
    NgbModule,
    PdfViewerModule,
    AngularEditorModule,
    HighchartsChartModule,
    NgxPaginationModule,
    NgxTagsInputModule,
    NgxDatatableModule,
    CKEditorModule,
    MsgengineLibModule,
  CommonPipeModule,
  FormbuilderModule,
        BsDatepickerModule.forRoot(),
    
    


  ], 
  exports:[
    FilepropertiesComponent,
    
    ],
  
  providers: [DatePipe,{
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterseptorService,
    multi:true
  }
  
  
  ],
})
export class AdminModule { }
