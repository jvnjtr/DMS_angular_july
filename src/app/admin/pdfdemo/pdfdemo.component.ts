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
  url:any =  "https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf";
 
  @ViewChild("myCanvas", { static: false })
  canvas!: ElementRef;


pdfDocument:any = null;
currPage:any = 1; //Pages are 1-based not 0-based
numPages:any = 0;
scale:any = 1;
zoomStep:any = 0.2;
KeywordToFind:any = '';
findedKeywords:any = [];
nbOccuranceKeyword:any = 0;
activeFindedKeyword:any = 0;
activeDrowMode:any = false;
pdfFactory:AnnotationFactory;
fabricCanvas:any = [];
dataurl:any = '';
originurl:any = '';



  constructor() {
    pdfjsLib.GlobalWorkerOptions.workerSrc =
    'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.10.377/build/pdf.worker.js';
  fabric.Object.prototype.objectCaching = false;
    
   }

  ngOnInit(): void {
    


  }




}
