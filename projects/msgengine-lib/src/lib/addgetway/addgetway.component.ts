import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MsgengineLibService } from '../msgengine-lib.service';
import { ValidatorchecklistService } from '../validationchecklist.service';
import { EncrypyDecrpyService } from '../encrypy-decrpy.service';
import * as CryptoJS from 'crypto-js';
import { Buffer } from 'buffer';
import { VarlistService } from '../varlist.service';

@Component({
  selector: 'lib-addgetway',
  templateUrl: './addgetway.component.html',
  styleUrls: ['./addgetway.component.css']
})
export class AddgetwayComponent implements OnInit {
  //\\ ======================== // Variables // ======================== //\\ 
  title: any;
  tablist: any;
  utillist: any;

  jsonurl: any = [{
      "pagetitle": "Gateway Configuration",
      "tabList": [{
              "tabName": "Add",
              "tabUrl": "../addgateway",
              "tabClass": "active"
          },
          {
              "tabName": "View",
              "tabUrl": "../viewgateway"
          }

      ],
      "utils": [{
              "utilName": "mandatory"
          }


      ],


  }];

  messaageslist: any = {
      "successMsg": "Data saved successfully",
      "updatesuccessMsg": "Data Updated successfully",
      "errorMsg": "Error in database",
      "warningtype": "You want to delete this record",
      "msgApilabel": "Label can not be blank",
      "msgApikey": "Key can not be blank",
      "msgApivalue": "Value can not be blank",
      "getwayType": "Gateway type",
      "getwayName": "Gateway name",
      "getwayURl": "Enter Gateway Url",
      "methodtype": "method type",
      "contactaddress": "Enter contact address",
      "msggetwayName": "Enter Gateway name"

  }


  getwaytypes: any;
  selType: any = 0;
  selgetwayName: any = 0;
  selgetwayId: any = 0;
  dynamicListArray: any = [];
  getwayNamelist: any;
  getDetailslist: any;
  txtgetwaymName: any;
  txtUrl: any;
  selPostmenthod: any = 0;
  txtContactAddress: any;
  langKey: any = 'en';
  //\\ ======================== // Variables // ======================== //\\ 
  constructor(
      private route: Router, private httpClient: HttpClient,
      public commonserveice: MsgengineLibService,
      public vldChkLst: ValidatorchecklistService,
      private encDec: EncrypyDecrpyService,
      private varlist: VarlistService

  ) {}


  ngOnInit(): void {
      this.loadconfig();
      this.getGetwaytypes();
      // this.addChangeEventForLabel();
  }
  loadconfig() {

      this.tablist = this.jsonurl[0].tabList;
      this.utillist = this.jsonurl[0].utils
      this.title = this.jsonurl[0].pagetitle;

  }
  multilingual(test: any) {
      return test;
  }
  //\\ ======================== // Get getway types // ======================== //\\ 
  getGetwaytypes() {

      let getwayparm = {}
      this.commonserveice.viewGatwayTypes(getwayparm).subscribe({
        next: (response) => {
            let respData = response.RESPONSE_DATA;
            let respToken = response.RESPONSE_TOKEN;
            let verifyToken = CryptoJS.HmacSHA256(respData, this.varlist.apiHashingKey).toString();
  
            if (respToken == verifyToken) {
                let res: any = Buffer.from(respData, 'base64');
                res = JSON.parse(res.toString());
                if (res.status == "200") {
                    this.getwaytypes = res.result;
  
                } else if (res.status == 501) {
  
                    this.commonserveice.directlogoutlib()
                } else {

                    this.commonserveice.swalfire('error',this.commonserveice.langReplace(res.message))

                   
                }
            } else {
  
                this.commonserveice.swalfire('error',this.commonserveice.langReplace(this.varlist.invalidResponse))

              
            }
        },
        error: (msg) => {
            this.commonserveice.directlogoutlib()
       }
   })
     
  }

  //\\ ======================== // Get getway types // ======================== //\\ 
  //\\ ======================== // Get getway Names // ======================== //\\ 
  getgetwayNames() {

      let typeid = this.selType;
      this.getwayNamelist = [];

      this.selgetwayId = "0";
      let formParams = {
          "Type": typeid
      };
      this.commonserveice.getGetwayName(formParams).subscribe({
        next: (response) => {
            let respData = response.RESPONSE_DATA;
            let respToken = response.RESPONSE_TOKEN;
            let res: any = Buffer.from(respData, 'base64');
            let responseResult = JSON.parse(res.toString());
            let verifyToken = CryptoJS.HmacSHA256(respData, this.varlist.apiHashingKey).toString();

            if (respToken == verifyToken) {
                if (responseResult.status == "200") {


                    this.getwayNamelist = responseResult.result;


                } else if (responseResult.status == 400) {

                } else if (responseResult.status == 501) {

                    this.commonserveice.directlogoutlib()
                } else {
                    this.commonserveice.swalfire('error',this.commonserveice.langReplace(this.varlist.somethingWrong))
                
                }
            } else {

                this.commonserveice.swalfire('error',this.commonserveice.langReplace(this.varlist.invalidResponse))
            }
        },
        error: (msg) => {
            this.commonserveice.directlogoutlib()
       }
   })
   

  }
  //\\ ======================== // Get getway Names // ======================== //\\ 
  //\\ ======================== // Addmore Rows // ======================== //\\ 
  addRow() {


      let lastChild = this.dynamicListArray[this.dynamicListArray.length - 1];
     
      if (this.dynamicListArray.length > 0) {
        //if(!this.vldChkLst.blankCheck(this.txtUrl, this.messaageslist.getwayURl,'txtUrl'))
          if (lastChild.vchLabel === '' || typeof(lastChild.vchLabel) == undefined || lastChild.vchLabel == null) {
              Swal.fire({
                  icon: 'error',
                  text: this.commonserveice.langReplace(this.messaageslist.msgApilabel),
                
                 
              });
          } else if (lastChild.vchKey === '' || typeof(lastChild.vchKey) == undefined || lastChild.vchKey == null) {
              Swal.fire({
                  icon: 'error',
                  text: this.commonserveice.langReplace(this.messaageslist.msgApikey),
                 
              
              });
          } else if (lastChild.vchValue === '' || typeof(lastChild.vchValue) == undefined || lastChild.vchValue == null) {
              Swal.fire({
                  icon: 'error',
                  text: this.commonserveice.langReplace(this.messaageslist.msgApivalue),
                
              });
          } else {
              this.dynamicListArray.push({
                  intId: '',
                  vchLabel: '',
                  vchKey: '',
                  vchValue: ''
              });

          }
      } else {
          this.dynamicListArray.push({
              intId: '',
              vchLabel: '',
              vchKey: '',
              vchValue: ''
          });

      }



  }
  //\\ ======================== // Addmore Rows // ======================== //\\ 


  deleteApiRow(i: any, id: any) {

      let formParams = {
          "intId": id
      };


      Swal.fire({
          title:  this.commonserveice.langReplace('Are you sure')+' ?',
          text: this.messaageslist.warningtype,
          icon: 'warning',
          showCancelButton: true,
          cancelButtonText: this.commonserveice.langReplace('Cancel'),
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: this.commonserveice.langReplace('Yes')+','+this.commonserveice.langReplace('delete it')+  "!"
      }).then((result: any) => {

          if (result.isConfirmed) {


if(this.selgetwayId == "other"){
 //   alert("yes")
    this.dynamicListArray.splice(i, 1);
}
else{
    this.commonserveice.deleteGetwayConfig(formParams).subscribe({
        next: (response) => { let respData = response.RESPONSE_DATA;
            let respToken = response.RESPONSE_TOKEN;
            let verifyToken = CryptoJS.HmacSHA256(respData, this.varlist.apiHashingKey).toString();


            if (respToken == verifyToken) {
                let res: any = Buffer.from(respData, 'base64');
                res = JSON.parse(res.toString());
                if (res.status == 200) {
                    Swal.fire(
                      this.commonserveice.langReplace('Deleted')+'!',
                        this.commonserveice.langReplace(this.messaageslist.deleteMsg),
                        'success'
                    )
                    this.dynamicListArray.splice(i, 1);
                    this.viewOldGetways()

                } else if (res.status == 417) {
                    this.commonserveice.swalfire('error',this.commonserveice.langReplace(this.varlist.invalidResponse))
                   
                } else {
                    this.commonserveice.swalfire('error',this.commonserveice.langReplace(this.messaageslist.errorMsg))
                 
                }
            } else {

                this.commonserveice.swalfire('error',this.commonserveice.langReplace(this.varlist.invalidResponse))
            }},
        error: (msg) => {
            this.commonserveice.directlogoutlib()
       }
   })

}


        
             
          }
      })

  }


  //\\ ======================== // Get old getway details // ======================== //\\
  viewOldGetways() {

      this.dynamicListArray = [];
      this.txtUrl = '';
      this.selPostmenthod = "0";
      this.txtContactAddress = "";
      this.selgetwayName = "";

      let typeid = this.selType;
      let intid = this.selgetwayId;
      if (intid != "other") {
          let formParams = {
              "typeId": typeid,
              "intId": intid
          };

          this.commonserveice.getPrevDetails(formParams).subscribe({
            next: (response) => {
                let respData = response.RESPONSE_DATA;
                let respToken = response.RESPONSE_TOKEN;
                let verifyToken = CryptoJS.HmacSHA256(respData, this.varlist.apiHashingKey).toString();

                if (respToken == verifyToken) {

                    let res: any = Buffer.from(respData, 'base64');
                    let responseResult = JSON.parse(res)

                    if (responseResult.status == 200) {


                        this.getDetailslist = responseResult.result;
                        let getDtlsres: any = this.getDetailslist.result;
                       console.log(this.getDetailslist)

                        this.txtUrl = this.getDetailslist.data[0].url;
                        this.selPostmenthod = this.getDetailslist.data[0].dataPostMethod;
                        this.txtContactAddress = this.getDetailslist.data[0].contactaddress;
                        this.selgetwayName = this.getDetailslist.data[0].vchName;


                        for (let i = 0; i <= getDtlsres.length; i++) {


                            let obj: any = {};
                            obj["intId"] = getDtlsres[i].intId;
                            obj["vchLabel"] = getDtlsres[i].vchLabel;
                            obj["vchKey"] = getDtlsres[i].vchKey;
                            obj["vchValue"] = getDtlsres[i].vchValue;
                            this.dynamicListArray.push(obj);
                        }




                    } else if (responseResult.status == 501) {

                        this.commonserveice.directlogoutlib()
                    } else {

                        this.commonserveice.swalfire('error',this.commonserveice.langReplace(this.varlist.somethingWrong))
                    }
                } else {

                    this.commonserveice.swalfire('error',this.commonserveice.langReplace(this.varlist.somethingWrong))
                }
            },
            error: (msg) => {
                this.commonserveice.directlogoutlib()
           }
       })
     


      }



  }

  //\\ ======================== // Get old getway details // ======================== //\\ 
  //\\ ======================== // Create New configuration // ======================== //\\ 
  manageGetWayConfig() {
      let lastChild = this.dynamicListArray[this.dynamicListArray.length - 1];


      if (!this.vldChkLst.selectDropdown(this.selType, this.commonserveice.langReplace(this.messaageslist.getwayType),'selType')) {} 
      else if (!this.vldChkLst.selectDropdown(this.selgetwayId, this.commonserveice.langReplace(this.messaageslist.getwayName),'selgetwayId')) {} 
      else if ((this.selgetwayId == "other") && (!this.vldChkLst.blankCheck(this.txtgetwaymName, this.commonserveice.langReplace(this.messaageslist.msggetwayName),'txtgetwaymName'))) {} 
      else if (!this.vldChkLst.blankCheck(this.txtUrl,this.commonserveice.langReplace( this.messaageslist.getwayURl),'txtUrl')) {} 
      else if (!this.vldChkLst.is_url(this.txtUrl)) {} 
      else if (!this.vldChkLst.selectDropdown(this.selPostmenthod, this.commonserveice.langReplace(this.messaageslist.methodtype),'selPostMethod')) {} 
      else if (!this.vldChkLst.blankCheck(this.txtContactAddress, this.commonserveice.langReplace(this.messaageslist.contactaddress),'txtContactAddress')) {} 
      else if (this.dynamicListArray.length == 0) {
        this.commonserveice.swalfire('error',this.commonserveice.langReplace("Add key values"))
      
      } else if ((this.dynamicListArray.length > 0) && (!this.vldChkLst.blankCheck(lastChild.vchLabel, this.commonserveice.langReplace(this.messaageslist.msgApilabel)))) {}
        else if ((this.dynamicListArray.length > 0) && (!this.vldChkLst.blankCheck(lastChild.vchKey, this.commonserveice.langReplace(this.messaageslist.msgApikey)))) {}
        else if ((this.dynamicListArray.length > 0) && (!this.vldChkLst.blankCheck(lastChild.vchValue, this.commonserveice.langReplace(this.messaageslist.msgApivalue)))) {} 
        else {

          let selctgetwayid;
          let getwayName;

          if (this.selgetwayId == 'other') {
              selctgetwayid = '';
              getwayName = this.txtgetwaymName;
          } else {
              selctgetwayid = this.selgetwayId;
              getwayName = this.selgetwayName;
          }


          let docParams = {
              "itemId": selctgetwayid,
              "typeId": this.selType,
              "name": getwayName,
              "vchUrl": this.txtUrl,
              "vchDataPostMethod": this.selPostmenthod,
              "vchContactAddress": this.txtContactAddress,
              "itemStatus": "",
              "allDocsdata": this.dynamicListArray

          }
          this.commonserveice.newGetwayConfig(docParams).subscribe({
            next: (response) => {
                let respData = response.RESPONSE_DATA;
                let respToken = response.RESPONSE_TOKEN;
                let verifyToken = CryptoJS.HmacSHA256(respData, this.varlist.apiHashingKey).toString();
                if (respToken == verifyToken) {
                    let res: any = Buffer.from(respData, 'base64');
                    let responseResult = JSON.parse(res)

                    if (responseResult.status == 200) {

                        Swal.fire({

                            text: this.commonserveice.langReplace(this.messaageslist.successMsg),
                            icon: 'success',
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: this.commonserveice.langReplace('Ok')
                        }).then((result) => {

                            this.resetform();
                            this.route.navigate(['admin/viewgateway'])
                        })

                    } else if (responseResult.status == 202) {

                        // this.loading=false;

                        Swal.fire({

                            text: this.commonserveice.langReplace(this.messaageslist.updatesuccessMsg),
                            icon: 'success',
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: this.commonserveice.langReplace('Ok')
                        }).then((result) => {

                            this.resetform();
                            this.route.navigate(['admin/viewgateway'])
                        })

                    } else if (responseResult.status == 501) {

                        this.commonserveice.directlogoutlib()
                    } else if (responseResult.status == 400) {
                        this.commonserveice.swalfire('error',this.commonserveice.langReplace(responseResult.message.metaName[0]))
                        // this.loading=false;
                     


                    } else {
                        //this.loading=false;
                        this.commonserveice.swalfire('error',this.commonserveice.langReplace(this.varlist.somethingWrong))
                    }
                } else {

                    this.commonserveice.swalfire('error',this.commonserveice.langReplace(this.varlist.somethingWrong))
                }
            },
            error: (msg) => {
                this.commonserveice.directlogoutlib()
           }
       })
         
      }
  }

  //\\ ======================== // Create New configuration // ======================== //\\ 

  //\\ ======================== // Reset Form // ======================== //\\ 
  resetform() {
      this.selType = 0;
      this.selgetwayId = 0;
      this.txtContactAddress = null;
      this.selPostmenthod = 0;
      this.txtUrl = null;
      this.txtContactAddress = null;
      this.selgetwayName = 0;
      this.dynamicListArray = [];
  }
  //\\ ======================== // Reset Form // ======================== //\\


}