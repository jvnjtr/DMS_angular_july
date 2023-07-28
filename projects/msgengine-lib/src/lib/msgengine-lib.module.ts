import { NgModule } from '@angular/core';
import { MsgengineLibComponent } from './msgengine-lib.component';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgxPaginationModule } from 'ngx-pagination';
import { CKEditorModule } from 'ckeditor4-angular';
import { AddgetwayComponent } from './addgetway/addgetway.component';
import { HttpClientModule } from '@angular/common/http';


import { RouterModule } from '@angular/router';
import { LibtabsComponent } from './libtabs/libtabs.component';
import { LibutilsComponent } from './libutils/libutils.component';
import { LibpaginationComponent } from './libpagination/libpagination.component';
import { ViewgetwayComponent } from './viewgetway/viewgetway.component';
import { AddmsgengineComponent } from './addmsgengine/addmsgengine.component';
import { ViewmsgengineComponent } from './viewmsgengine/viewmsgengine.component';
import { ViewmsgreminderComponent } from './viewmsgreminder/viewmsgreminder.component';
import { TranslatePipe } from './translate.pipe';




// import { AddgetwayconfigComponent } from './addgetwayconfig/addgetwayconfig.component';
// import { ViewgetwayconfigComponent } from './viewgetwayconfig/viewgetwayconfig.component';






@NgModule({
  declarations: [
    MsgengineLibComponent,
    AddgetwayComponent,
    LibtabsComponent,
    LibutilsComponent,
    LibpaginationComponent,
    ViewgetwayComponent,
    AddmsgengineComponent,
    ViewmsgengineComponent,
    ViewmsgreminderComponent,
    TranslatePipe,
    


  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDropzoneModule,
    NgbModule,
    CKEditorModule,
    NgxPaginationModule,
    NgxDropzoneModule,
    RouterModule
  ],
  exports: [
    MsgengineLibComponent,
    AddgetwayComponent,
    LibtabsComponent,
    ViewgetwayComponent,
    AddmsgengineComponent,
    ViewmsgengineComponent,
    ViewmsgreminderComponent,
  ]
})
export class MsgengineLibModule { 


  
}
