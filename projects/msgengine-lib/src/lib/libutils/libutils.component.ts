import { HttpClient } from '@angular/common/http';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { EncrypyDecrpyService } from '../encrypy-decrpy.service';
import { MsgengineLibService } from '../msgengine-lib.service';
import Swal from 'sweetalert2';
import * as CryptoJS from 'crypto-js';
import {Location} from '@angular/common';
import * as $ from 'jquery';
import { Buffer } from 'buffer';
import { VarlistService } from '../varlist.service';



@Component({
  selector: 'lib-libutils',
  templateUrl: './libutils.component.html',
  styleUrls: ['./libutils.component.css']
})
export class LibutilsComponent implements OnInit {
  message:any;
  @Input() childMessage:any;
  @Input() sendIds:any;
  @Input() funType:any;
  @Input() pubUnpubStatus: any;
  @Output("callfunction") callfunction:EventEmitter<any> = new EventEmitter();
  @Output("callfunction3") callfunction3:EventEmitter<any> = new EventEmitter();
@Input() reloadUrl:any;






  constructor(
    private httpClient: HttpClient,
    private _location: Location,
    public commonserveice:MsgengineLibService,
    private encDec: EncrypyDecrpyService,
    private varlist:VarlistService
  ) {
  
   }

  ngOnInit(): void {
  }
  opensearch(){
    let searchcontent:any = document.getElementById("search-container");
  
    if(searchcontent.classList.contains("active")) {
        searchcontent.classList.remove("active");
    }
    else {
        searchcontent.classList.add("active");
    }
    // let element = <HTMLInputElement><unknown>document.getElementsByClassName("search-container");
    // alert(element)
    // element.classList.toggle("active");
  

   // $(".search-container").toggleClass("active");
  }

  printTable(){
    let printContents:any;
    let popupWin:any;
    printContents =  document.getElementById("print-section")?.innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
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
      Swal.fire({
        icon: 'error',
        text: this.commonserveice.langReplace('Please select the record you want to delete') + '.',

      });
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
          this.commonserveice.deleteAll(letterParams, ftype).subscribe((response: any) => {
            // console.log(response);
            let respData = response.RESPONSE_DATA;
            let respToken = response.RESPONSE_TOKEN;
            let verifyToken = CryptoJS.HmacSHA256(respData, this.varlist.apiHashingKey).toString();
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
               // $('.checkAll').prop('checked', false);
                this.callfunction.emit();
                this.callfunction3.emit();
              } else if (res.status == 417) {
                Swal.fire({
                  icon: 'error',
                 text:this.commonserveice.langReplace(this.varlist.invalidResponse),
                });
              }
              else {

                Swal.fire({
                  icon: 'error',
                  text: this.commonserveice.langReplace(this.varlist.somethingWrong),

                });
              }
            } else {
              Swal.fire({
                icon: 'error',
                 text:this.commonserveice.langReplace(this.varlist.errorApiResponse),
              });
            }


          });



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
      Swal.fire({
        icon: 'error',
        text: this.commonserveice.langReplace('Please select the unpublished record to publish') + '.',

      });
      return
    }

    if (ids.length == 0) {
      Swal.fire({
        icon: 'error',
        text: this.commonserveice.langReplace('Please select the record you want to publish') + '.',

      });
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

          this.commonserveice.publishAll(letterParams, ftype).subscribe((response: any) => {
            let respData = response.RESPONSE_DATA;
            let respToken = response.RESPONSE_TOKEN;
            let verifyToken = CryptoJS.HmacSHA256(respData, this.varlist.apiHashingKey).toString();
            if (respToken == verifyToken) {
              let res: any = Buffer.from(respData, 'base64');
              let responseResult = JSON.parse(res)
              
              if (responseResult.status == 200) {
              
                Swal.fire(
                  this.commonserveice.langReplace('Published')+' !',
                  this.commonserveice.langReplace('Publish Records Successfully'),
                  'success'
                )
               // $('.checkAll').prop('checked', false);
                this.callfunction.emit();
                this.callfunction3.emit();
              } else if (responseResult.status == 417) {
                Swal.fire({
                  icon: 'error',
                 text:this.commonserveice.langReplace(this.varlist.invalidResponse),
                });
              }
              else {
                Swal.fire({
                  icon: 'error',
                  text: this.commonserveice.langReplace(this.varlist.somethingWrong),

                });
              }
            } else {
              Swal.fire({
                icon: 'error',
                text: " ",
              });
            }


          });

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
      Swal.fire({
        icon: 'error',
        text: this.commonserveice.langReplace('Please select the published record to unpublish') + '.',

      });
      return
    }

    if (ids.length == 0) {
      Swal.fire({
        icon: 'error',
        text: this.commonserveice.langReplace('Please select the record you want to unpublish') + '.',

      });
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
          this.commonserveice.unpublishAll(letterParams, ftype).subscribe((response: any) => {
           
            let respData = response.RESPONSE_DATA;
            let respToken = response.RESPONSE_TOKEN;
            let verifyToken = CryptoJS.HmacSHA256(respData, this.varlist.apiHashingKey).toString();
            if (respToken == verifyToken) {
              let res: any = Buffer.from(respData, 'base64');
              let responseResult = JSON.parse(res)
              
              if (responseResult.status == 200) {
                Swal.fire(
                  this.commonserveice.langReplace('Unpublished'),
                  this.commonserveice.langReplace('Unpublish Records Successfully') + '.',
                  'success'
                )
               // alert(0)
                itemids = '';
             //   $('.checkAll').prop('checked', false);
                this.callfunction.emit();
                this.callfunction3.emit();
              } else if (res.status == 417) {
                Swal.fire({
                  icon: 'error',
                 text:this.commonserveice.langReplace(this.varlist.invalidResponse),
                });
              }
              else {
                Swal.fire({
                  icon: 'error',
                  text: this.commonserveice.langReplace(this.varlist.somethingWrong),

                });
              }
            } else {
             
              Swal.fire({
                icon: 'error',
                 text:this.commonserveice.langReplace(this.varlist.errorApiResponse),
              });
            }
          });
        }
      })
    }
  }
}
