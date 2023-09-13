import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ckeditornew',
  templateUrl: './ckeditornew.component.html',
  styleUrls: ['./ckeditornew.component.scss']
})
export class CkeditornewComponent implements OnInit {
  @Input() ckdesc: any;

  constructor() { }
  htmlContent = '';

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '250px',
    minHeight: '250px',
    maxHeight: '250px',
    width: '100%',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: 'p',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      {class: 'arial', name: 'Arial'},
      {class: 'times-new-roman', name: 'Times New Roman'},
      {class: 'calibri', name: 'Calibri'},
      {class: 'comic-sans-ms', name: 'Comic Sans MS'}
    ],
    customClasses: [
    {
      name: 'quote',
      class: 'quote',
    },
    {
      name: 'redText',
      class: 'redText'
    },
    {
      name: 'titleText',
      class: 'titleText',
      tag: 'h1',
    },
  ],
  sanitize: true,
  toolbarPosition: 'top',
  uploadWithCredentials: false,
  uploadUrl:environment.serviceURL+'ckEditorfileUpload'
    };
  ngOnInit(): void {
  }
 
}
