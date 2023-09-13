/// <reference types="@types/ckeditor" />
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonServicesService } from '../../services/common-services.service';
import { EncrypyDecrpyService } from '../../services/encrypy-decrpy.service';
import { AuthenticationService } from '../../services/authentication.service';
import Swal from 'sweetalert2';
import { WorkflowService } from '../../services/workflow.service';
import * as CryptoJS from 'crypto-js';
import { Buffer } from 'buffer';
import { CKEditorComponent } from 'ng2-ckeditor';
import { ValidatorchecklistService } from '../../services/validatorchecklist.service';
import { environment } from '../../../environments/environment';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-take-action',
  templateUrl: './take-action.component.html',
  styleUrls: ['./take-action.component.scss']
})
export class TakeActionComponent implements OnInit {
  //\\ ======================== // Variables // ======================== //\\
  siteUrl = environment.siteURL;
  title: any;
  tablist: any;
  utillist: any;
  messaageslist: any;
  jsonurl = "assets/js/_configs/takeAction.config.json";
  letterID: any = "";
  metalist: any = [];
  fileId: any;
  folderId: any;
  userActionList: any = [];



  ckeConfig: any;
  txtRemark: any;


  @ViewChild("myckeditor") ckeditor: CKEditorComponent;
  showFiles: any = false;
  txtdata: any = '';

  txtFileName: any;

  DemoDoc: any;
  stageNo: any;
  workflowFolderId: any;
  intApprovalId: any;
  loading: any = false;
  radAction: any = 0;
  // =['',"Mark Up","Mark Down",'','','','',"Reject","Approve","Verify"]
  actionarray: any = [];
  filetype: any;
  logid: any;
  filename: any;
  filePath: any;
  lockstatus: any;
  getfiletype: any;
  obj: any = [];
  //////////take action forward option/////////
  showForwardAuthority: any = false;
  authorityRoleId: any = 0;
  folderName: any;
  roleArr: any = [];
  forwardActionEvent: any = 0;
  sessiontoken: any;
  logedinRoleId: any;
  //////////take action forward option/////////
  //\\ ======================== // Variables // ======================== //\\

  constructor(private route: Router,
    private router: ActivatedRoute,
    private httpClient: HttpClient,
    public commonserveice: CommonServicesService,
    private workFlowServices: WorkflowService,
    public encDec: EncrypyDecrpyService,
    public authService: AuthenticationService,
    public vldChkLst: ValidatorchecklistService,
    private sanitizer: DomSanitizer) {
    //\\ ======================== // Ckeditor Configuration // ======================== //\\
    this.ckeConfig = environment.ckconfig
    //\\ ======================== // Ckeditor Configuration // ======================== //\\

  }

  ngOnInit(): void {
    this.loadconfig();

    let encSchemeId = this.router.snapshot.paramMap.get('id');
    if (encSchemeId != "") {
      let schemeStr = this.encDec.decText(encSchemeId);
      let schemeArr: any = schemeStr.split(':');
      this.fileId = schemeArr[0];
      this.folderId = schemeArr[1];
      this.stageNo = schemeArr[2];
      this.workflowFolderId = schemeArr[3];
      this.intApprovalId = schemeArr[4];
      this.filePath = schemeArr[5];
      this.filename = schemeArr[6];
      this.logid = schemeArr[7];
      this.lockstatus = schemeArr[8];
      this.filetype = schemeArr[9];




    }
    this.loadEvents()
    this.getActionDetails(this.folderId, this.fileId)
    this.sessiontoken = sessionStorage.getItem('ADMIN_SESSION');

    // let SeetionParsed =JSON.parse(this.sessiontoken).toString(); 
    let SeetionParsed = JSON.parse(CryptoJS.AES.decrypt(this.sessiontoken, environment.apiHashingKey).toString(CryptoJS.enc.Utf8));
    //console.log(SeetionParsed)
    this.logedinRoleId = SeetionParsed.ROLE_ID;
  }

  //\\ ======================== // Load Config // ======================== //\\
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
  //\\ ======================== // Load Config // ======================== //\\
  //\\ ======================== // Get Action List // ======================== //\\

  getActionDetails(folderid: any, fileId: any) {
    let dataParam = {
      "fileId": Number(fileId),
      "folderId": Number(folderid)
    };
    // getuserActionList
    this.loading = true;
    this.workFlowServices.getuserActionList(dataParam).subscribe({
      next: (response) => {
        let respData = response.RESPONSE_DATA;
        let respToken = response.RESPONSE_TOKEN;

        let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
        if (respToken == verifyToken) {
          let res: any = Buffer.from(respData, 'base64');
          let responseResult = JSON.parse(res)

          if (responseResult.status == 200) {
            this.loading = false;
            //console.log(responseResult.result);
            // this.userActionList = responseResult.result[0].AllowedActionName;
            let userResponse: any = responseResult.result.AllowedActionName;

            // this.userActionList = userResponse.split(",");
            let userActionListNew = userResponse.split(",");
            if(userActionListNew.includes('18')==true){
              const index = userActionListNew.indexOf('18');
              userActionListNew.splice(index, 1);
              this.userActionList=userActionListNew;
            }else{
              this.userActionList=userActionListNew;
            }
            console.log(this.userActionList)

          }
          else if (responseResult.status == 400) {
            this.loading = false;
            this.forwardActionEvent = responseResult.result.tinstatus;
          }
          else if (responseResult.status == 501) {

            this.authService.directlogout();
          }
        }
        else {
          this.loading = false;
          this.authService.directlogout();
        }

      }
      ,
      error: (msg) => {
        this.authService.directlogout();
      }
    })


  }



  //\\ ======================== // Get Action List // ======================== //\\



  //\\ ======================== // Eventes List // ======================== //\\ 
  loadEvents() {
    let params: any = [];
    this.workFlowServices.getEvents(params).subscribe({
      next: (response) => {
        let respData = response.RESPONSE_DATA;
        let respToken = response.RESPONSE_TOKEN;
        let res: any = Buffer.from(respData, 'base64');
        let responseResult = JSON.parse(res)

        if (responseResult.status == '200') {

          let actionlist: any = responseResult.result;
          for (let i = 0; i < actionlist.length; i++) {


            this.actionarray[actionlist[i].tinApprovalActionId] = actionlist[i].vchActionName;



          }
          //this.actionarray = responseResult.result;
          //console.log(this.actionarray)
        }

        else if ((responseResult.status == 500)) {
          this.commonserveice.swalfire('error', this.commonserveice.langReplace(responseResult.message))

        }
      },
      error: (msg) => {
        this.authService.directlogout();
      }
    })




  }
  //\\ ======================== // Eventes List // ======================== //\\ 


  //\\ ======================== // Submit Reamark // ======================== //\\
  submitRemark() {
    let fileId: any = this.fileId;
    let folderId: any = this.folderId;
    let stageNo: any = this.stageNo;
    let action: any = this.radAction;
    let intApprovalId: any = this.intApprovalId;
    let remark: any = this.txtRemark;
    let workflowFolderId: any = this.workflowFolderId;
    let forwardAuthority: any = this.authorityRoleId;
    if (action == '0') {
      this.commonserveice.swalfire('error', this.commonserveice.langReplace(this.messaageslist.action))


    }
    else if (!this.vldChkLst.blankCheck(remark, this.commonserveice.langReplace(this.messaageslist.remark), 'txtRemark')) {


    }
    else {
      let dataParam = {
        "fileId": fileId,
        "folderId": folderId,
        "stageNo": stageNo,
        "action": action,
        "intApprovalId": intApprovalId,
        "remark": remark,
        "workflowFolderId": workflowFolderId,
        'authorityRoleId': forwardAuthority
      };

      //console.log(dataParam)
      this.loading = true;
      this.workFlowServices.takeAction(dataParam).subscribe({
        next: (response) => {
          let respData = response.RESPONSE_DATA;
          let respToken = response.RESPONSE_TOKEN;
          let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
          if (respToken == verifyToken) {
            let res: any = Buffer.from(respData, 'base64');
            let responseResult = JSON.parse(res)

            if (responseResult.status == 200) {
              this.loading = false;
              Swal.fire({

                text: this.commonserveice.langReplace(this.messaageslist.successMsg),
                icon: 'success',
                confirmButtonColor: '#3085d6',
                confirmButtonText: this.commonserveice.langReplace('Ok')
              }).then((result) => {


                this.route.navigate(['/workflow/summarydocs'])
              })

            }

            else if (responseResult.status == 501) {

              this.authService.directlogout();
            }
            else if (responseResult.status == 400) {

              this.loading = false;
              this.commonserveice.swalfire('error', this.commonserveice.langReplace(responseResult.message.metaName[0]))



            }
            else {

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



  }
  //\\ ======================== // Submit Reamark // ======================== //\\
  resetForm() {
    this.txtRemark = '';
    this.radAction = 0;
  }
  forwardAction(action: any) {
    if (action == 4) {
      this.showForwardAuthority = true;
      this.getRoles(this.folderId);
    } else {
      this.showForwardAuthority = false;
    }
  }
  //\\ ======================== // Authorities // ======================== //\\ 
  getRoles(folderid: any) {
    let dataParam = {
      "folderId": folderid
    };
    this.workFlowServices.getAdminRoles(dataParam).subscribe((response: any) => {
      let respData = response.RESPONSE_DATA;
      let respToken = response.RESPONSE_TOKEN;
      let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
      if (respToken == verifyToken) {
        let res: any = Buffer.from(respData, 'base64');
        let responseResult = JSON.parse(res)
        if (responseResult.status == '200') {
          let authorities: any = responseResult.result;
          this.folderName = authorities.folderName;

          let result: any = [];
          result = authorities.data;
          for (let i = 0; i < result.length; i++) {
            let obj: any = {};

            if (this.logedinRoleId != result[i].roleId) {
              obj['fileOrFolderId'] = result[i].fileOrFolderId;
              obj['intId'] = result[i].intId;
              obj['type'] = result[i].type;
              obj['roleName'] = result[i].roleName;
              obj['userFullName'] = result[i].userFullName;
              obj['roleId'] = result[i].roleId;
              let permissions: any = JSON.parse(result[i].permission);
              for (let j = 0; j < permissions.length; j++) {
                if (permissions[j].label == 'WorkFlow' && permissions[j].selected == true) {
                  obj['permission'] = permissions[j].label
                }
              }

              this.roleArr.push(obj);
            }



          }
          console.log(this.roleArr);
        }

        else if ((responseResult.status == 500)) {
          this.commonserveice.swalfire('error', this.commonserveice.langReplace(responseResult.message))

        }
      }
      else {
        this.loading = false;
        this.authService.directlogout();
      }





    },
      (error: any) => {
        this.authService.directlogout();
      })



  }

  //\\ ======================== // Authorities // ======================== //\\ 
  getFOrwardAuthority(e: any) {
    this.authorityRoleId = e.target.value;
  }
}
