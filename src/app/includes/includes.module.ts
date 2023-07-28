import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { IncludesRoutingModule } from './includes-routing.module';
import { IncludesComponent } from './includes.component';
import { HeaderComponent } from './header/header.component';
import { LeftmenuComponent } from './leftmenu/leftmenu.component';
import { TabsComponent } from './tabs/tabs.component';
import { PaginationComponent } from './pagination/pagination.component';
import { UtilsComponent } from './utils/utils.component';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { TokenInterseptorService } from '../services/token-interseptor.service';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MsgengineLibModule } from 'msgengine-lib';

import { CommonPipeModule } from '../common-pipe/common-pipe.module';







@NgModule({
  declarations: [
    IncludesComponent,
    HeaderComponent,
    LeftmenuComponent,
    TabsComponent,
    PaginationComponent,
    UtilsComponent,
   
  ],
  imports: [
    CommonModule,
    IncludesRoutingModule,
    FormsModule,
    NgxPaginationModule,
    NgbModule,
    NgxDatatableModule,
    MsgengineLibModule,
    CommonPipeModule
 
  
  ],
  exports:[
    HeaderComponent,
    LeftmenuComponent,
    TabsComponent,
    PaginationComponent,
    UtilsComponent
  ]
})
export class IncludesModule { }
