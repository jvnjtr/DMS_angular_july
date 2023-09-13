import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import { UploadfileComponent } from './uploadfile/uploadfile.component';
import { NewfolderComponent } from './newfolder/newfolder.component';
import { ViewDocumentComponent } from './view-document/view-document.component';
import { ShareDocumentComponent } from './share-document/share-document.component';
import { PreviewFileComponent } from './preview-file/preview-file.component';

import { MetaDetailsComponent } from './meta-details/meta-details.component';
import { FilemodifyComponent } from './filemodify/filemodify.component';
import { RecentfilesComponent } from './recentfiles/recentfiles.component';

import { ViewMetaComponent } from './view-meta/view-meta.component';
import { ArchivelistComponent } from './archivelist/archivelist.component';
import { SharedfilesComponent } from './sharedfiles/sharedfiles.component';
import { UserlistComponent } from './userlist/userlist.component';
import { PdfdemoComponent } from './pdfdemo/pdfdemo.component';
import { FilepropertiesComponent } from './fileproperties/fileproperties.component';
import { RecentactivitiesComponent } from './recentactivities/recentactivities.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { FeedbackreportComponent } from './feedbackreport/feedbackreport.component';

import { AddgetwayComponent, AddmsgengineComponent, ViewgetwayComponent, ViewmsgengineComponent, ViewmsgreminderComponent } from 'msgengine-lib';
import { ManageLanguageComponent } from './manage-language/manage-language.component';
import { LanguagelabelsComponent } from './languagelabels/languagelabels.component';
import { ViewalllanguagesComponent } from './viewalllanguages/viewalllanguages.component';
import { CreatedocComponent } from './createdoc/createdoc.component';
import { ConfigGeneralComponent } from './config-general/config-general.component';
import { ConfigOCRComponent } from './config-ocr/config-ocr.component';
import { ConfigStampingComponent } from './config-stamping/config-stamping.component';
import { ViewdraftdocumentComponent } from './viewdraftdocument/viewdraftdocument.component';
import { ConfigSignatureComponent } from './config-signature/config-signature.component';
import { ViewSignatureComponent } from './view-signature/view-signature.component';
import { DynFormToPdfComponent } from './dyn-form-to-pdf/dyn-form-to-pdf.component';
import { ViewStampingComponent } from './view-stamping/view-stamping.component';

// import { AddgetwayconfigComponent } from 'projects/msgengine-lib/src/lib/addgetwayconfig/addgetwayconfig.component';
// import { ViewgetwayconfigComponent } from 'projects/msgengine-lib/src/lib/viewgetwayconfig/viewgetwayconfig.component';


const routes: Routes = [

  {
    path: '', component: AdminComponent,
    children: [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
      { path: 'upload', component: UploadfileComponent, canActivate: [AuthGuard] },
      // { path: 'modifyfile/:id', component: UploadfileComponent,canActivate: [AuthGuard] },
      { path: 'viewupload', component: ViewDocumentComponent, canActivate: [AuthGuard] },
      { path: 'viewupload/:id', component: ViewDocumentComponent, canActivate: [AuthGuard] },

      { path: 'recentFiles', component: RecentfilesComponent, canActivate: [AuthGuard] },
      { path: 'newfolder', component: NewfolderComponent, canActivate: [AuthGuard] },
      { path: 'createfolder/:id', component: NewfolderComponent, canActivate: [AuthGuard] },
      { path: 'shareFile/:id', component: ShareDocumentComponent, canActivate: [AuthGuard] },

      { path: 'previewfile/:id', component: PreviewFileComponent },
      { path: 'addMeta', component: MetaDetailsComponent, canActivate: [AuthGuard] },
      { path: 'editMeta/:id', component: MetaDetailsComponent, canActivate: [AuthGuard] },
      { path: 'viewMeta', component: ViewMetaComponent, canActivate: [AuthGuard] },
      { path: 'modifyfile/:id', component: FilemodifyComponent, canActivate: [AuthGuard] },

      { path: 'archivefiles', component: ArchivelistComponent, canActivate: [AuthGuard] },
      { path: 'sharedfiles', component: SharedfilesComponent, canActivate: [AuthGuard] },
      { path: 'userlist', component: UserlistComponent, canActivate: [AuthGuard] },
      { path: 'pdfdemo', component: PdfdemoComponent, canActivate: [AuthGuard] },
      { path: 'fileproperties', component: FilepropertiesComponent, canActivate: [AuthGuard] },
      { path: 'recentactivities', component: RecentactivitiesComponent, canActivate: [AuthGuard] },
      { path: 'changepassword', component: ChangepasswordComponent, canActivate: [AuthGuard] },
      { path: 'feedbackreport', component: FeedbackreportComponent },
      { path: 'managelanguage', component: ManageLanguageComponent, canActivate: [AuthGuard] },
      { path: 'labelLanguage', component: LanguagelabelsComponent, canActivate: [AuthGuard] },
      { path: 'editLanguage/:id', component: LanguagelabelsComponent, canActivate: [AuthGuard] },
      { path: 'viewAllLanguage', component: ViewalllanguagesComponent, canActivate: [AuthGuard] },
      { path: 'addgateway', component: AddgetwayComponent, canActivate: [AuthGuard] },
      { path: 'viewgateway', component: ViewgetwayComponent, canActivate: [AuthGuard] },
      { path: 'addmessageengine', component: AddmsgengineComponent, canActivate: [AuthGuard] },
      { path: 'addmessageengine/:id', component: AddmsgengineComponent, canActivate: [AuthGuard] },
      { path: 'editReminderEngine/:id', component: AddmsgengineComponent, canActivate: [AuthGuard] },
      { path: 'viewmessageengine', component: ViewmsgengineComponent, canActivate: [AuthGuard] },
      { path: 'viewmessagereminder', component: ViewmsgreminderComponent, canActivate: [AuthGuard] },

      { path: 'createdoc', component: CreatedocComponent, canActivate: [AuthGuard] },
      { path: 'createdoc/:id', component: CreatedocComponent, canActivate: [AuthGuard] },
      { path: 'generalconfig', component: ConfigGeneralComponent, canActivate: [AuthGuard] },
      { path: 'ocrconfig', component: ConfigOCRComponent, canActivate: [AuthGuard] },
      { path: 'stampingconfig', component: ConfigStampingComponent, canActivate: [AuthGuard] },
      { path: 'viewstampingconfig', component: ViewStampingComponent, canActivate: [AuthGuard] },
      { path: 'editstampingconfig/:id', component: ConfigStampingComponent, canActivate: [AuthGuard] },
      { path: 'signatureconfig', component: ConfigSignatureComponent, canActivate: [AuthGuard] },
      { path: 'editSignature/:id', component: ConfigSignatureComponent, canActivate: [AuthGuard] },
      { path: 'viewSignature', component: ViewSignatureComponent, canActivate: [AuthGuard] },
      { path: 'viewdraftdocument', component: ViewdraftdocumentComponent, canActivate: [AuthGuard] },
      { path: 'dynamicformToPdf/:id', component: DynFormToPdfComponent, canActivate: [AuthGuard] },


    ]
  }
];
// { path: 'addWorlflowConfig/:id', component: AddworkflowComponent,canActivate: [AuthGuard] },
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
