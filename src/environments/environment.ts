// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  url: '',
  siteURL: 'http://172.27.30.93:4200/', 
  //serviceURL: 'http://192.168.103.123:7005/dms_php_admin/admin/',
serviceURL: 'http://172.27.30.93:7001/dms_php_admin/admin/',
pdfiframeURL: 'http://172.27.30.93:7001/dms_php_admin/pdfjsnew/web/viewer.html',
iframeURL: 'http://172.27.30.93:7001/dms_php_admin/office_viewer/demos.html',
iframeviewURL: 'http://172.27.30.93:7001/dms_php_admin/office_viewer/demos-preview.html',
excelViewer:'http://172.27.30.93:7001/dms_php_admin/office-xlsx/index.html',
apkpath:'http://192.168.103.123:4200/assets/download.zip',
tempurl:'http://172.27.30.93:7001/dms_php_admin/admin/storage/temp/',
createPDFURL:'http://172.27.30.93:7001/dms_php_admin/document-writer/word-pdf/index.html',
createExcelURL:'http://172.27.30.93:7001/dms_php_admin/document-writer/xlsx-writer/index.html',


//frameworkserviceURL:'http://192.168.103.237:7001/eservice_product/admin/',
  apiHashingKey: '22CSMTOOL2022',
  encryptIV: '26102021@qwI',
  somethingWrong: 'something went wrong',
  invalidResponse: 'Invalid Response',
  errorApiResponse: 'Error in API response',
  default_lang: "en",
ckconfig:{
      
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
    '/',
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
},




logactivitytype:[
  { action: 1, activity: 'Logged in' },
  { action: 2, activity: 'Logged out' },
  { action: 3, activity: 'Folder Created' },
  { action: 4, activity: 'Folder Edited' },
  { action: 5, activity: 'Folder Deleted' },
  { action: 6, activity: 'File Uploaded' },
  { action: 7, activity: 'File Edited' },
  { action: 8, activity: 'File Deleted' },
  { action: 9, activity: 'File Opened' },
  { action: 10, activity: 'File Shared via Username' },
  { action: 11, activity: 'File Shared via Email Address' },
  { action: 12, activity: 'File Bookmarked' },
  { action: 13, activity: 'File Bookmark Removed' },
  { action: 14, activity: 'File Moved to folder' },
  { action: 15, activity: 'Folder Bookmarked' },
  { action: 16, activity: 'Folder Bookmark Removed' },
  { action: 17, activity: 'File Copied' },
  { action: 18, activity: 'Password Changed By User' },
  { action: 19, activity: 'Meta Added' },
  { action: 20, activity: 'Meta  Updated' },
  { action: 21, activity: 'Meta  Deleted' },
  { action: 22, activity: 'Retention Added' },
  { action: 23, activity: 'Retention Updated' },
  { action: 24, activity: 'Markup Action Performed' },
  { action: 25, activity: 'Workflow Updated For Next Authority' },
  { action: 26, activity: 'Mark Down Action Performed' },
  { action: 27, activity: 'Workflow Updated For Next Authority' },
  { action: 28, activity: 'Approve Action Performed' },
  { action: 29, activity: 'Workflow Approved By authority' },
  { action: 30, activity: 'Reject Action Performed' },
  { action: 31, activity: 'Workflow Rejected By authority' },
  { action: 32, activity: 'Verify Action Performedn' },
  { action: 33, activity: 'Workflow Updated For Next Authority' }

],
iconsGroups: [
  { name: 'bi-file-pdf text-danger', groups: ['pdf'] },
  { name: 'bi-card-image', groups: ['jpg', 'jpeg','png','gif'] },
  { name: 'bi-camera-video', groups: ['mp4', 'mkv'] },
  { name: 'bi-file-earmark-music', groups: ['mp3','WAV'] },
  { name: 'bi-filetype-doc text-primary', groups: ['doc', 'docx'] },
  { name: 'bi-filetype-ppt text-danger', groups: ['ppt', 'pptx'] },
  { name: 'bi-filetype-xls text-success', groups: ['xls','xlsx','ods','csv'] },
  { name: 'bi-file-zip text-warning', groups: ['zip'] },

], 

 };




/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
