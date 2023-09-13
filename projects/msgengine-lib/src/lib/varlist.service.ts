import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VarlistService {
 apiHashingKey:any= '22CSMTOOL2022';
  encryptIV:any= '26102021@qwI';
  serviceURL:any= 'http://172.27.30.93:7001/dms_php_admin/admin/message_module';
  serviceName:any='/publishUnpublish';
  serviceModuleconfig:any='/manageMessageConfig';
  formEnable:any=false;
  dynamicForm:any=false;
  sessionEncrypted:any=true;
  formId:any="0";
  somethingWrong:any= 'something went wrong';
  invalidResponse:any= 'Invalid Response';
  errorApiResponse:any= 'Error in API response';
  ckconfig:any={
      
    language: "en",
    allowedContent: true,
    height:200,
    forcePasteAsPlainText: true,
    font_names: 'Arial;Times New Roman;Verdana',
    extraPlugins: 'divarea',
    removePlugins: 'exportpdf',
    toolbarGroups: [
      { name: 'document', groups: ['mode', 'document', 'doctools'] },
      { name: 'clipboard', groups: ['clipboard', 'undo'] },
      { name: 'editing', groups: ['find', 'selection', 'spellchecker', 'editing'] },
      { name: 'forms', groups: ['forms'] },
      { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
      { name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi', 'paragraph'] },
      { name: 'links', groups: ['links'] },
      { name: 'insert', groups: ['insert'] },
     
      { name: 'styles', groups: ['styles'] },
      { name: 'colors', groups: ['colors'] },
      { name: 'tools', groups: ['tools'] },
      { name: 'others', groups: ['others'] },
      { name: 'about', groups: ['about'] }
    ],
    removeButtons: 'Source,Save,NewPage,Preview,Print,Templates,Cut,Copy,Paste,PasteText,PasteFromWord,Undo,Redo,Find,Replace,SelectAll,Scayt,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,Strike,Subscript,Superscript,CopyFormatting,RemoveFormat,Outdent,Indent,CreateDiv,Blockquote,BidiLtr,BidiRtl,Language,Unlink,Anchor,Image,Flash,Table,HorizontalRule,Smiley,SpecialChar,PageBreak,Iframe,Maximize,ShowBlocks,About'
  }
}
