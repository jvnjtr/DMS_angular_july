import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonServicesService } from '../../services/common-services.service';
import { EncrypyDecrpyService } from '../../services/encrypy-decrpy.service';
import Swal from 'sweetalert2';
import { AuthenticationService } from '../../services/authentication.service';

import * as CryptoJS from 'crypto-js';
import { Buffer } from 'buffer';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-view-signature',
  templateUrl: './view-signature.component.html',
  styleUrls: ['./view-signature.component.scss']
})
export class ViewSignatureComponent implements OnInit {

  title: any;
  tablist: any;
  utillist: any;
  messaageslist: any;
  jsonurl = "assets/js/_configs/viewSignature.config.json";

  letterID: any = "";
  metalist: any = [];
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  pageSizes = [10, 20, 50, 100, 500, 1000];

  mettypelist: any = ['-', 'String', 'Date', 'Integer']
  txtSearch: any;
  searchColList: any = ["Meta Name", "Description", "Type", "Created By"]
  searchselcteditems: any = [];
  @ViewChild("searchField") searchField: ElementRef;
  namesarray: any = [];
  Descriptionarray: any = [];
  filesizearray: any = [];
  typearray: any = [];
  createdbyarray: any = [];
  finalarray: any = [];
  finalobj: any = {
    'Meta Name': this.namesarray,
    'Description': this.Descriptionarray,
    'Type': this.typearray,
    'Createdby': this.createdbyarray
  };
  loading: any = false;


  sortDir = 1;//1= 'ASE' -1= DSC
  sortOrder: string = 'asc';
  sortColumn: string = 'ticker';

  txtPage: any = '0';
  txtOpacity: any;
  txtRotation: any = '0';
  txtXaxis: any;
  txtYaxis: any;
  txtFontSize: any = '0';
  configId: any = 0;
  tablecollist = [
    { "name": "Signature Position", "cname": "signaturePosition", "sortable": true },
    { "name": "Signature Rotation", "cname": "signatureRotation", "sortable": true },
    { "name": "Signature Opacity", "cname": "signatureOpacity", "sortable": true },
    { "name": "Signature Page", "cname": "signaturePage", "sortable": true },

    // {"name":"Type","cname":"metaType","sortable":true },

    { "name": "Created By", "cname": "createdBy", "sortable": true },
    { "name": "Created On", "cname": "createdOn", "sortable": true },
  ]


  constructor(
    private route: Router,
    private httpClient: HttpClient,
    public commonserveice: CommonServicesService,
    public encDec: EncrypyDecrpyService,
    public authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.loadconfig();
    this.getStampingConfig(this.configId);
    // console.log(this.mettypelist[0])
    // for(let kc of this.mettypelist)
    // {
    //   // console.log(kc);
    // }
    //  console.log(this.mettypelist)
  }
  formReset() {
    
    this.txtPage = '0';
    this.txtOpacity = '';
    this.txtRotation = '0';
    this.txtXaxis = '';
    this.txtYaxis = '';
    
  }
  formResetEvent() {
    this.configId=0;
    
    this.txtPage = '0';
    this.txtOpacity = '';
    this.txtRotation = '0';
    this.txtXaxis = '';
    this.txtYaxis = '';
    
  }
  getStampingConfig(configId:any) {
    
    let metaparams = {
      "configId": this.configId
    }
    this.loading = true;
    this.commonserveice.getSignatureConfiguration(metaparams).subscribe({
      next: (response) => {
        let respData = response.RESPONSE_DATA;
        let respToken = response.RESPONSE_TOKEN;

        let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
        if (respToken == verifyToken) {
          let res: any = Buffer.from(respData, 'base64');
          let responseResult = JSON.parse(res)

          if (responseResult.status == 200) {
            this.loading = false;
            this.metalist = responseResult.result;
            console.log(responseResult.result);
            if(responseResult.result){
              this.configId=responseResult.result.configId;
              
              
              if(responseResult.result.signaturePosition.length > 0) {
                this.txtXaxis=responseResult.result.signaturePosition[0]['x-axis'];
                this.txtYaxis=responseResult.result.signaturePosition[0]['y-axis'];
              }
              
              this.txtRotation=responseResult.result.signatureRotation;
              this.txtOpacity=responseResult.result.signatureOpacity;
              this.txtPage=responseResult.result.signaturePage;
             
            }else{
              this.formResetEvent();
            }
            
            
          }

          else if (responseResult.status == 202) {

            this.loading = false;

            Swal.fire({

              text: this.commonserveice.langReplace(this.messaageslist.updatesuccessMsg),
              icon: 'success',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'Ok'
            }).then((result) => {

              // this.getOcrConfig();
            })

          }
          else if (responseResult.status == 501) {

            this.authService.directlogout();
          }
          else if (responseResult.status == 400) {

            this.loading = false;
            this.commonserveice.swalfire('error', responseResult.message)
          }
          else {
            this.loading = false;
            this.commonserveice.swalfire('error', this.commonserveice.langReplace(environment.somethingWrong))

          }
        }
        else {
          this.loading = false;
          this.authService.directlogout();
        }
      },
      error: (msg) => {
        this.authService.directlogout();
      }
    })

  

}
  loadconfig() {
    this.httpClient.get<any>(this.jsonurl).subscribe({
      next: (data) => {
        this.tablist = data[0].tabList;
        this.utillist = data[0].utils
        this.messaageslist = data[0].messages;
        this.title = data[0].pagetitle;
      },
      error: (msg) => {
        this.authService.directlogout();
      }
    })
  }





  gotoEdit(id: any) {

    let encSchemeStr = this.encDec.encText(id.toString());
    this.route.navigate(['/admin/editMeta', encSchemeStr]);


  }
  //\\ ======================== // get meta list // ======================== //\\
  viewMetaLit() {



    let dataParam = {
      "intMetaId": ''
    };
    this.loading = true
    this.commonserveice.viewMeta(dataParam).subscribe({
      next: (response) => {
        let respData = response.RESPONSE_DATA;
        let respToken = response.RESPONSE_TOKEN;

        let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
        if (respToken == verifyToken) {
          let res: any = Buffer.from(respData, 'base64');
          let responseResult = JSON.parse(res)

          if (responseResult.status == 200) {
            this.loading = false;
            this.metalist = responseResult.result;

          }
          else if (responseResult.status == 501) {

            this.authService.directlogout();
          }
          else {
            this.loading = false;
            this.commonserveice.swalfire('error', this.commonserveice.langReplace(environment.somethingWrong))
          }
        }
        else {
          this.loading = false;
          this.authService.directlogout();
        }
      },
      error: (msg) => {
        this.authService.directlogout();
      }
    })



  }
  //\\ ======================== // get Meta list // ======================== //\\

  //\\ ======================== // Table Pagination // ======================== //\\
  onTableDataChange(event: any) {
    this.page = event;
    // console.log(this.page +"==="+this.tableSize)
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;

  }
  //\\ ======================== // Table Pagination // ======================== //\\
  deletMeta(metaId: any) {

    let formParams = {
      "intMetaId": metaId

    };

    Swal.fire({
      title: this.commonserveice.langReplace('Are you sure') + ' ?',
      text: this.commonserveice.langReplace(this.messaageslist.warningtype),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: this.commonserveice.langReplace('Cancel'),
      confirmButtonText: this.commonserveice.langReplace('Yes') + ', ' + this.commonserveice.langReplace('delete it') + ' !'
    }).then((result: any) => {

      if (result.isConfirmed) {
        this.commonserveice.deleteMeta(formParams).subscribe({
          next: (response) => {
            let respData = response.RESPONSE_DATA;
            let respToken = response.RESPONSE_TOKEN;

            let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
            if (respToken == verifyToken) {

              let res: any = Buffer.from(respData, 'base64');
              let responseResult = JSON.parse(res)
              if (responseResult.status == 200) {
                Swal.fire(
                  this.commonserveice.langReplace('Deleted') + ' !',
                  this.commonserveice.langReplace(this.messaageslist.deleteMsg),
                  'success'
                )
                this.viewMetaLit()

              }
              else if (responseResult.status == 400) {
                this.commonserveice.swalfire('error', this.commonserveice.langReplace("Meta details used in different files"))

              }
              else if (responseResult.status == 501) {

                this.authService.directlogout();
              }

              else {

                this.commonserveice.swalfire('error', this.commonserveice.langReplace(environment.somethingWrong))
              }
            }
            else {
              this.loading = false;

            }
          },
          error: (msg) => {
            this.authService.directlogout();
          }
        })

      }
    })
  }

  //\\ ======================== // Data sorting // ======================== //\\




  //\\ ======================== // Data sorting // ======================== //\\

}
