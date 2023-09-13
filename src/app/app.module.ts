import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorComponent } from './error/error.component';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { TokenInterseptorService } from './services/token-interseptor.service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { BlockCopyPasteDirective } from './block-copy-paste.directive';
import { SortableHeaderDirective } from './sortable-header.directive';
import { environment } from 'src/environments/environment';
import { LangReplacePipe } from './lang-replace.pipe';
import { WindowPrevComponent } from './window-prev/window-prev.component';
import { CommonPipeModule } from './common-pipe/common-pipe.module';
import { CreateDocInputsComponent } from './create-doc-inputs/create-doc-inputs.component';
import { NgxTagsInputModule } from 'ngx-tags-input';
import { DynamicFormToPdfComponent } from './dynamic-form-to-pdf/dynamic-form-to-pdf.component';









@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    LoginComponent,
    BlockCopyPasteDirective,
    SortableHeaderDirective,
    WindowPrevComponent,
    CreateDocInputsComponent,
    DynamicFormToPdfComponent
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgbModule,
    NgxDatatableModule, 
    NgxTagsInputModule,
    CommonPipeModule

  ],
  providers: [LangReplacePipe,{
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterseptorService,
    multi:true
  }],
 
  bootstrap: [AppComponent]
})
export class AppModule { }
