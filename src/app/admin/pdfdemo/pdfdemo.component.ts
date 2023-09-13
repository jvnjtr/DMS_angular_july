import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';


import { fabric } from 'fabric';
import * as pdfjsLib from 'pdfjs-dist';
import { AnnotationFactory } from 'annotpdf';
import { PDFDocument, rgb } from 'pdf-lib';

@Component({
  selector: 'app-pdfdemo',
  templateUrl: './pdfdemo.component.html',
  styleUrls: ['./pdfdemo.component.scss']
})
export class PdfdemoComponent implements OnInit {
 
  src:any = '';
  constructor() {

    
   }

 
  ngOnInit(): void {
    this.src="https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
  }



}
