import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import {Location} from '@angular/common';
import {Buffer} from 'buffer';

import * as CryptoJS from 'crypto-js';
import { CommonServicesService } from 'src/app/services/common-services.service';
import { environment } from 'src/environments/environment';
import { EncrypyDecrpyService } from 'src/app/services/encrypy-decrpy.service';

import * as $ from 'jquery'
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-utils',
  templateUrl: './utils.component.html',
  styleUrls: ['./utils.component.scss']
})
export class UtilsComponent implements OnInit {
  message:any;
  @Input() childMessage:any;
  @Input() sendIds:any;
  @Input() funType:any;
  @Input() pubUnpubStatus: any;
  @Output("callfunction") callfunction:EventEmitter<any> = new EventEmitter();
  @Output("callfunction3") callfunction3:EventEmitter<any> = new EventEmitter();
   @Input() reloadUrl:any;

  constructor(private route: Router,
    private httpClient: HttpClient,
   private _location: Location,
   public commonserveice:CommonServicesService,
   private encDec: EncrypyDecrpyService,
   private authService:AuthenticationService
    ) { }
  
  ngOnInit(): void {



  }
  opensearch(){
    
    $(".search-container").toggleClass("active");
  }

  printTable(){
    let printContents;
    let popupWin:any;
    printContents =  $(".print-section").html();
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto;display:none');
 //   popupWin.document.open();
    popupWin.document.write(`
  <html>
    <head>
    <link href="../../assets/css/print.css" rel="stylesheet">
     
    </head>
<body onload="window.print();window.close()">
<div class="header">
<img src="../../assets/img/logoblack.png">
</div>

${printContents}</body>
  </html>`
    );
    popupWin.document.close();
  }

  deleteAll(ids:any,ftype:any) {
    if (ids.length == 0) {
      this.commonserveice.swalfire('error',this.commonserveice.langReplace('Please select the record you want to delete'))
 
    }
    else {
      var itemids = ids.toString();
    
      let letterParams = {
        "itemId": itemids,
        "itemStatus": "1"
      };

      Swal.fire({
        title: this.commonserveice.langReplace('Are you sure') + '?',
        text: this.commonserveice.langReplace("You want to delete this record"),
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: this.commonserveice.langReplace('Cancel'),
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: this.commonserveice.langReplace('Yes') + ', ' + this.commonserveice.langReplace('delete it') + '!'
      }).then((result: any) => {
        if (result.isConfirmed) {

          this.commonserveice.deleteAll(letterParams, ftype).subscribe({
            next: (response) => {
              let respData = response.RESPONSE_DATA;
              let respToken = response.RESPONSE_TOKEN;
              let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
              // console.log(respToken);
              // console.log(verifyToken);
  
              if (respToken == verifyToken) {
                let res: any = Buffer.from(respData, 'base64');
                res = JSON.parse(res.toString());
                // console.log(res.status);
  
                if (res.status == 200) {
                  Swal.fire(
                    this.commonserveice.langReplace('Deleted')+' !',
                    this.commonserveice.langReplace('Record has been deleted'),
                    'success'
                  )
                  $('.checkAll').prop('checked', false);
                  this.callfunction.emit();
                  this.callfunction3.emit();
                } else if (res.status == 417) {
                this.authService.directlogout();
                }
                else {
  
                  this.commonserveice.swalfire('error',this.commonserveice.langReplace(environment.somethingWrong))
                }
              } else {
                 this.authService.directlogout();
              }
            },
            error: (msg) => {
              this.authService.directlogout();
           }
         })

       


        }
      })



    }
  }
  backClicked() {
    this._location.back();
  }
  publishAll(ids:any,ftype:any,pubUnpubStatus: any) {
    let puberroStatus: any = 0;
    for (let klp of pubUnpubStatus) {

      if (klp.publishUnpublisStatus == 1) {
        puberroStatus = 1;
        break;
      }
    }
    if (puberroStatus == 1) {
      this.commonserveice.swalfire('error',this.commonserveice.langReplace("Please select the unpublished record to publish"))
   
      return
    }

    if (ids.length == 0) {
      this.commonserveice.swalfire('error',this.commonserveice.langReplace("Please select the record you want to publish"))
   
    }
    else {

      let itemids = ids.toString();

      let letterParams = {
        "itemId": itemids,
        "itemStatus": "2"
      };

      Swal.fire({
        text: this.commonserveice.langReplace("You want to publish this record"),
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: this.commonserveice.langReplace('Cancel'),
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: this.commonserveice.langReplace('Yes') + ', ' + this.commonserveice.langReplace('publish it') + '!'
      }).then((result: any) => {

        if (result.isConfirmed) {
          this.commonserveice.publishAll(letterParams, ftype).subscribe({
            next: (response) => {    let respData = response.RESPONSE_DATA;
              let respToken = response.RESPONSE_TOKEN;
              let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
              if (respToken == verifyToken) {
                let res: any = Buffer.from(respData, 'base64');
                res = JSON.parse(res.toString());
                if (res.status == 200) {
                  Swal.fire(
                    this.commonserveice.langReplace('Published')+" !",
                    this.commonserveice.langReplace('Publish Records Successfully'),
                    'success'
                  )
                  $('.checkAll').prop('checked', false);
                  this.callfunction.emit();
                  this.callfunction3.emit();
                } else if (res.status == 417) {
                this.authService.directlogout();
                }
                else {
                  this.commonserveice.swalfire('error',this.commonserveice.langReplace(environment.somethingWrong))
                }
              } else {
                this.commonserveice.swalfire('error',this.commonserveice.langReplace(environment.errorApiResponse))
          
              }},
            error: (msg) => {
              this.authService.directlogout();
           }
         })
       

        }
      })



    }
  }
  unpublishAll(ids:any,ftype:any,pubUnpubStatus: any) {
    let puberroStatus: any = 0;
    for (let klp of pubUnpubStatus) {
      if (klp.publishUnpublisStatus == 0) {
        puberroStatus = 1;
        break;
      }
    }
    if (puberroStatus == 1) {
      this.commonserveice.swalfire('error',this.commonserveice.langReplace("Please select the published record to unpublish"))
  
      return
    }

    if (ids.length == 0) {
      this.commonserveice.swalfire('error',this.commonserveice.langReplace("Please select the record you want to unpublish"))
 
    }
    else {
      let itemids = ids.toString();

      let letterParams = {
        "itemId": itemids,
        "itemStatus": "3"
      };
      Swal.fire({
        text: this.commonserveice.langReplace("You want to unpublish this record"),
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: this.commonserveice.langReplace('Cancel'),
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: this.commonserveice.langReplace('Yes') + ', ' + this.commonserveice.langReplace('unpublish it')
      }).then((result: any) => {
        if (result.isConfirmed) {


          this.commonserveice.unpublishAll(letterParams, ftype).subscribe({
            next: (response) => {
              let respData = response.RESPONSE_DATA;
              let respToken = response.RESPONSE_TOKEN;
              let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
              if (respToken == verifyToken) {
                let res: any = Buffer.from(respData, 'base64');
                res = JSON.parse(res.toString());
                if (res.status == 200) {
                  Swal.fire(
                    this.commonserveice.langReplace('Unpublished')+" !",
                    this.commonserveice.langReplace('Unpublish Records Successfully') + '.',
                    'success'
                  )
                  itemids = '';
                  $('.checkAll').prop('checked', false);
                  this.callfunction.emit();
                  this.callfunction3.emit();
                } else if (res.status == 417) {
                this.authService.directlogout();
                }
                else {
                  this.commonserveice.swalfire('error',this.commonserveice.langReplace(environment.somethingWrong))
                }
              } else {
                 this.authService.directlogout();
              }
            },
            error: (msg) => {
              this.authService.directlogout();
           }
         })
        
        }
      })
    }
  }


}
