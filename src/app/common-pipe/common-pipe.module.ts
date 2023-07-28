import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LangReplacePipe } from '../lang-replace.pipe';




@NgModule({
  declarations: [
    LangReplacePipe
  ],
  imports: [
    CommonModule
  ],
  exports:[
    LangReplacePipe
  ]

})
export class CommonPipeModule { }
