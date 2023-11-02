export const environment = {

  production: false,

  url: '',

  siteURL: 'http://172.27.30.93:4200/',

  //serviceURL: 'http://172.27.30.93:7005/dms_php_admin/admin/',

  serviceURL: 'http://172.27.30.93:7001/dms_php_admin/admin/',

  pdfiframeURL: 'http://172.27.30.93:7001/dms_php_admin/pdfjsnew/web/viewer.html',

  iframeURL: 'http://172.27.30.93:7001/dms_php_admin/office_viewer/demos.html',

  iframeviewURL: 'http://172.27.30.93:7001/dms_php_admin/office_viewer/demos-preview.html',

  excelViewer: 'http://172.27.30.93:7001/dms_php_admin/office-xlsx/index.html',

  apkpath: 'http://172.27.30.93:4200/assets/download.zip',

  tempurl: 'http://172.27.30.93:7001/dms_php_admin/admin/storage/temp/',

  createPDFURL: 'http://172.27.30.93:7001/dms_php_admin/document-writer/word-pdf/index.html',

  createExcelURL: 'http://172.27.30.93:7001/dms_php_admin/document-writer/xlsx-writer/index.html',

  //frameworkserviceURL:'http://192.168.103.237:7001/eservice_product/admin/',

  apiHashingKey: '22CSMTOOL2022',

  encryptIV: '26102021@qwI',

  somethingWrong: 'something went wrong',
  invalidRequestMsg:'Invalid Request',

  invalidResponse: 'Invalid Response',

  errorApiResponse: 'Error in API response',

  default_lang: "en",

  ckEdiorClass: "editor",
  ckconfig: {

    language: "en",

    allowedContent: true,

    height: 200,

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

  logactivitytype: [

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

    { name: 'bi-card-image', groups: ['jpg', 'jpeg', 'png', 'gif'] },

    { name: 'bi-camera-video', groups: ['mp4', 'mkv'] },

    { name: 'bi-file-earmark-music', groups: ['mp3', 'WAV'] },

    { name: 'bi-filetype-doc text-primary', groups: ['doc', 'docx'] },

    { name: 'bi-filetype-ppt text-danger', groups: ['ppt', 'pptx'] },

    { name: 'bi-filetype-xls text-success', groups: ['xls', 'xlsx', 'ods', 'csv'] },

    { name: 'bi-file-zip text-warning', groups: ['zip'] },



  ],

  menuiconsGroups: [

    { name: 'icon-history-solid', groups: ['Recent Documents'] },

    { name: 'bi bi-diagram-3', groups: ['Task'] },

    { name: 'icon-share-alt-solid', groups: ['Shared Documents'] },

    { name: 'icon-address-book', groups: ['Contact Address'] },

    { name: 'icon-file-code', groups: ['Reports'] },

    { name: 'icon-tags-solid', groups: ['Meta'] },

    { name: 'icon-file-image', groups: ['Activity Log'] },

    { name: 'icon-archive-solid', groups: ['Archive'] },

    { name: 'bi bi-box-arrow-right', groups: ['Gateway'] },

    { name: 'bi bi-chat-right-text', groups: ['Message'] },

    { name: 'bi bi-translate', groups: ['Language'] },

    { name: 'bi bi-translate', groups: ['Language Labels'] },

    { name: 'bi bi-gear', groups: ['General'] },

    { name: 'bi bi-eyeglasses', groups: ['OCR'] },

    { name: 'bi bi-postage', groups: ['Stamping'] },
    { name: 'icon-file-code', groups: ['Create A Form'] },
    { name: 'icon-signature-solid', groups: ['Signature'] },
    { name: 'icon-file-image', groups: ['Form Template'] },


  ],

  alphabets: "^[a-zA-Z ]*$",

  numeric: "^[0-9]*$",

  alphanumeric: "^[a-zA-Z0-9']*$",

  passwordpat: /^(?=\D*\d)(?=[^a-z]*[a-z])(?=.*[$@$!%*?&])(?=[^A-Z]*[A-Z]).{8,15}$/,

  languagelable: 'Odia',

  mysqlDataType: [

    {

      dataType: 'INT',

      value: 'INT'

    },

    {

      dataType: 'TINYINT',

      value: 'TINYINT'

    }, {

      dataType: 'SMALLINT',

      value: 'SMALLINT'

    }, {

      dataType: 'MEDIUMINT',

      value: 'MEDIUMINT'

    }, {

      dataType: 'BIGINT',

      value: 'BIGINT'

    }, {

      dataType: 'DECIMAL',

      value: 'DECIMAL'

    }, {

      dataType: 'FLOAT',

      value: 'FLOAT'

    }, {

      dataType: 'DOUBLE',

      value: 'DOUBLE'

    }, {

      dataType: 'VARCHAR',

      value: 'VARCHAR'

    }, {

      dataType: 'CHAR',

      value: 'CHAR'

    }, {

      dataType: 'TEXT',

      value: 'TEXT'

    }, {

      dataType: 'LONGTEXT',

      value: 'LONGTEXT'

    }, {

      dataType: 'MEDIUMTEXT',

      value: 'MEDIUMTEXT'

    }, {

      dataType: 'TINYTEXT',

      value: 'TINYTEXT'

    }, {

      dataType: 'DATE',

      value: 'DATE'

    }, {

      dataType: 'DATETIME',

      value: 'DATETIME'

    }, {

      dataType: 'TIMESTAMP',

      value: 'TIMESTAMP'

    }, {

      dataType: 'TIME',

      value: 'TIME'

    }, {

      dataType: 'YEAR',

      value: 'YEAR'

    }, {

      dataType: 'JSON',

      value: 'JSON'

    }, {

      dataType: 'BLOB',

      value: 'BLOB'

    }, {

      dataType: 'BIT',

      value: 'BIT'

    }, {

      dataType: 'BOOLEAN',

      value: 'BOOLEAN'

    }, {

      dataType: 'ENUM',

      value: 'ENUM'

    }

  ],

  validateFileTypes: ['pdf', 'jpeg', 'jpe', 'png', 'gif', 'jpg', 'csv', 'dbf', 'htm', 'html', 'mht', 'mhtml', 'ods', 'prn', 'txt', 'xla', 'xlam', 'xls', 'xlsb', 'xlsx', 'xlt', 'xltm', 'xlsm', 'xlw', 'xps', 'doc', 'docm', 'docx', 'dot', 'dotm', 'dotx', 'odt', 'rtf', 'wps', 'xml', 'msword', 'mp4', 'ogx', 'oga', 'ogv', 'ogg', 'webm', 'mp3', 'mpeg'],

  ImageFileTypes: ['jpeg', 'jpe', 'png', 'jpg'],

  DocumentFileTypes: ['pdf', 'doc', 'docx', 'xlsx', 'dot', 'dotm', 'dotx', 'odt', 'rtf', 'wps', 'xml', 'msword', 'mp4', 'ogx', 'oga', 'ogv'],

  attributetype:

    [

      {
        type: "text",
        typeid: 1,
        typelist: ['Numeric', 'Alphabet', 'AlphaNumeric', 'Decimal']
      },
      {
        type: "email",
        typeid: 2,
        typelist: ['numeric', 'Alphabet', 'AlphaNumeric']
      },
      {
        type: "number",
        typeid: 3,
        typelist: ['numeric']
      },
      {
        type: "date",
        typeid: 4,
        typelist: ['Less than current', 'Greater than current', 'All']
      },
      {
        type: "time",
        typeid: 5,
        typelist: ['Less than current', 'Greater than current', 'All']
      },
      {
        type: "tel",
        typeid: 6,
        typelist: ['numeric', 'AlphaNumeric']
      },
      {
        type: "password",
        typeid: 7,
        typelist: ['AlphaNumeric']
      },
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
