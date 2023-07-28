import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { WorkflowService } from '../../services/workflow.service';
import { EncrypyDecrpyService } from '../../services/encrypy-decrpy.service';
import { ValidatorchecklistService } from '../../services/validatorchecklist.service';
import { environment } from '../../../environments/environment';
import Swal from 'sweetalert2';
import * as CryptoJS from 'crypto-js';
import Drawflow from 'drawflow';
import { CommonServicesService } from '../../services/common-services.service';
import { AuthenticationService } from '../../services/authentication.service';
import {Buffer} from 'buffer';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-configworkflow',
  templateUrl: './configworkflow.component.html',
  styleUrls: ['./configworkflow.component.scss']
})
export class ConfigworkflowComponent implements OnInit {

/// ------------Variables------------- ///
@ViewChild('sendMsgModal') sendMsgModal: ElementRef;
  @Input() folderid:any;
  folderName:any;
  public loading = false;
  title: any;
  tablist: any;
  utillist: any;
  messaageslist: any;
  jsonurl = 'assets/js/_configs/addWorkflow.config.json';

  id: any;
  editor: any;
  transform: any;
  mobile_item_selec: any;
  mobile_last_move: any;
  approvalActions: any;
  txtModuleId: any = null;
  txtFormId: any = null;
  getsectionId: any;
  nodeSelected: any = null;
  formNames: any = null;
  txtFormName: any = null;
  txtModuleName: any = null;
  userId: any;
  sessiontoken: any;

  roleArr: any = [];
  dynamicForm: FormGroup;
  applicantRole = 'applicant';
  docUploads: any = [];
  approvalDocuments: any = '';
  approvalDocRow: any = [1];
  approvalDocEvents: any = [];
  selAppDocuments: any;

  allFormDocs: any = [];
  allAssignedVerifyDocs: any = [];
  curAssignedVerifyDocs: any = [];

  disabled = false;
  ShowFilter = false;
  limitSelection = false;


  dropdownSettings: any = {};
  arrAllFormDetails:any={};
  arrAllLabelParms:any=[];
  showConditionStatus:any=2;
  allConditions:any;

 desgId:any;
roleId:any;


msgclickedEvent: any = '';
checkedMailSms: any = '';
mailConigDetails: any = '';
  smsConfigDetails: any = '';
  whatsappConfigDetails: any = '';
  messageDataToBind: any;
/// ------------Variables------------- ///



  constructor( private route: Router,
    private httpClient: HttpClient,
    private workFlowServices: WorkflowService,
    private router: ActivatedRoute,
    public commonserveice: CommonServicesService,
    private fb: FormBuilder,
    private encDec: EncrypyDecrpyService,
    public authService: AuthenticationService,
    public vldChkLst: ValidatorchecklistService,
  public modalService:NgbModal
  
  ) { 

 
    this.sessiontoken = sessionStorage.getItem('ADMIN_SESSION');
    let SeetionParsed = JSON.parse(CryptoJS.AES.decrypt(this.sessiontoken, environment.apiHashingKey).toString(CryptoJS.enc.Utf8));
    this.userId = SeetionParsed.USER_ID;

    this.dynamicForm = this.fb.group({
      itemId: [this.folderid],
      sectionId: [this.getsectionId],
      formDetails: this.fb.array([]),
      status: 0,
      otherStatus: '',
      updatedBy: [this.userId],
      createdBy: [this.userId],
    });

  }

  ngOnInit(): void {
    this.loadconfig();
    this.id = <HTMLDivElement>document.querySelector('#drawflow');
    this.editor = new Drawflow(this.id);
    this.registerEvents(this.editor);
    this.editor.reroute = true;

    this.editor.reroute_fix_curvature = true;
    this.editor.force_first_input = false;
    this.editor.curvature = 0;
    this.editor.line_path = 2;
    this.editor.start();
  
    const workFlowParms={  'intProcessId': this.txtFormId,
    'intOnlineServiceId' :0,
    'sectionId'          :0,
    'intProfileId'        :0}; 
    
    const elements = document.getElementsByClassName('drag-drawflow');
    for (let i = 0; i < elements.length; i++) {
      elements[i].addEventListener('touchend', this.drop, false);
      elements[i].addEventListener('touchmove', this.positionMobile, false);
      elements[i].addEventListener('touchstart', this.drag, false);
    }

    this.sessiontoken = sessionStorage.getItem('ADMIN_SESSION'); 

    // let SeetionParsed =JSON.parse(this.sessiontoken).toString(); 
    let SeetionParsed =JSON.parse(CryptoJS.AES.decrypt(this.sessiontoken, environment.apiHashingKey).toString(CryptoJS.enc.Utf8)); 
   
     this.desgId=SeetionParsed.USER_ID;
     this.roleId=SeetionParsed.ROLE_ID;
    



    this.loadEvents();
    this.getRoles(this.folderid);
    this.fillCanvasWorkflow(this.folderid);
    this.loadMessageEngine();
    /************************* */
   
  
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: this.ShowFilter,
    };
    /************************* */
  }


  onItemSelect(item: any) {
    //console.log('onItemSelect', item);
  }
  onSelectAll(items: any) {
    //console.log('onSelectAll', items);
  }
  toogleShowFilter() {
    this.ShowFilter = !this.ShowFilter;
    this.dropdownSettings = Object.assign({}, this.dropdownSettings, {
      allowSearchFilter: this.ShowFilter,
    });
  }



  
/// ------------Load configuration------------- ///
  loadconfig() {
    this.httpClient.get<any>(this.jsonurl).subscribe((data: any) => {
      this.tablist = data[0].tabList;
      this.utillist = data[0].utils;
      this.messaageslist = data[0].messages;
      this.title = this.multilingual(data[0].pagetitle);
      this.allConditions = data[0].condtions
    });
  }
 /// ------------Load configuration------------- ///
  multilingual(test: any) {
    return test;
  }
  positionMobile(ev: any) {
    this.mobile_last_move = ev;
  }

  /// ------------Drag and drop Elements------------- ///
  allowDrop(ev: any) {
    ev.preventDefault();
  }

  drag(ev: any) {
    if (ev.type === 'touchstart') {
      this.mobile_item_selec = ev.target
        .closest('.drag-drawflow')
        .getAttribute('data-node');
    } else {
      ev.dataTransfer.setData('node', ev.target.getAttribute('data-node'));
    }
  }

  drop(ev: any) {
   
     if (ev.type === 'touchend') {
      // let parentdrawflow:any = document.elementFromPoint(this.mobile_last_move.touches[0].clientX,this.mobile_last_move.touches[0].clientY).closest('#drawflow');
    
      //  this.mobile_item_selec = '';
     } else {
     ev.preventDefault();
       let data = ev.dataTransfer.getData('node');
       //alert(data)
       this.addNodeToDrawFlow(data, ev.clientX, ev.clientY);
     }
  }
 /// ------------Drag and drop Elements------------- ///

/// ------------Add Node to draw flow -------------------- ///
  addNodeToDrawFlow(name: any, pos_x: any, pos_y: any) {
    if (this.editor.editor_mode === 'fixed') {
      return false;
    }
    pos_x =
      pos_x *
        (this.editor.precanvas.clientWidth /
          (this.editor.precanvas.clientWidth * this.editor.zoom)) -
      this.editor.precanvas.getBoundingClientRect().x *
        (this.editor.precanvas.clientWidth /
          (this.editor.precanvas.clientWidth * this.editor.zoom));
    pos_y =
      pos_y *
        (this.editor.precanvas.clientHeight /
          (this.editor.precanvas.clientHeight * this.editor.zoom)) -
      this.editor.precanvas.getBoundingClientRect().y *
        (this.editor.precanvas.clientHeight /
          (this.editor.precanvas.clientHeight * this.editor.zoom));
         
         
    for (let roles of this.roleArr) {
      if (roles.roleId == name) {
        let authority =
          `
      <div>
      <div class="box">
          ` +
          roles.roleName +
          `
      </div>
      </div>
      `;
        this.editor.addNode(
          roles.roleName,
          1,
          1,
          pos_x,
          pos_y,
          'AUTH',
          {
            userType: 2,
            desgId: roles.roleName,
            roleId: roles.roleId,
          },
          authority
        );
      }
    }

    switch (name) {
    
      case 'applicant':
        let applicant = `
            <div>
            <div class="box">
                Applicant
            </div>
            </div>
            `;
        this.editor.addNode(
          'applicant',
          0,
          1,
          pos_x,
          pos_y,
          'applicant',
          {
            userType: 1,
          },
          applicant
        );
        break;

      default:
    }
    return true;
  }
/// ------------Add Node to draw flow -------------------- ///

  getRoleId(roleArray: any) {
    return roleArray.roleId;
  }
/// ------------Register Events -------------------- ///
  registerEvents(editor: any): void {
    editor.on('nodeCreated', (id: any) => {
      //console.log('Node created ' + id);
    });

    editor.on('nodeRemoved', (id: any) => {
      //console.log('Node removed ' + id);
    });

    editor.on('nodeSelected', (id: any) => {
      $('#btnConfirmOk').off('click');
      this.updateEvents(editor, id);
    });

    editor.on('nodeUnselected', (id: any) => {
      this.nodeSelected = null;
      $('#btnSaveEvent').hide();
      $('.eventSection').find('.chk_actions').prop('checked', false);
      $('.eventSection').find('#txtTimeLine').val('');
    });

    editor.on('moduleCreated', (name: any) => {
      //console.log('Module Created ' + name);
    });

    editor.on('moduleChanged', (name: any) => {
      //console.log('Module Changed ' + name);
    });

    editor.on('connectionCreated', (connection: any) => {
      let currentId = connection.input_id;
      let ctr = this.getLavelCtr(editor, currentId, 0);
      let nodeData = editor.getNodeFromId(currentId);
      let nodeDataArr = nodeData.data;
      nodeDataArr['lavel'] = Number(ctr);
      editor.updateNodeDataFromId(currentId, nodeDataArr);
    });

    editor.on('connectionRemoved', (connection: any) => {
      // console.log('Connection removed');
      // console.log(connection);
    });

    editor.on('mouseMove', (position: any) => {
      // console.log("Position mouse x:" + position.x + " y:" + position.y);
    });

    editor.on('nodeMoved', (id: any) => {
      // console.log(editor);
      // console.log('Node moved ' + id);
    });

    editor.on('zoom', (zoom: any) => {
     // console.log('Zoom level ' + zoom);
    });

    editor.on('translate', (position: any) => {
    //  console.log('Translate x:' + position.x + ' y:' + position.y);
    });

    editor.on('addReroute', (id: any) => {
     // console.log('Reroute added ' + id);
    });

    editor.on('removeReroute', (id: any) => {
    //  console.log('Reroute removed ' + id);
    });
  }
/// ------------Register Events -------------------- ///
  drawflow(): any {
    return {
      drawflow: {},
    };
  }

//\\ ======================== // Eventes List // ======================== //\\ 
  loadEvents() {
    let params: any = [];
    
    this.workFlowServices.getEvents(params).subscribe((response: any) => {
      let respData = response.RESPONSE_DATA;
      let respToken = response.RESPONSE_TOKEN;
      let res:any = Buffer.from(respData,'base64'); 
      let responseResult= JSON.parse(res)
    
if (responseResult.status == '200') {

     
  this.approvalActions = responseResult.result;

      }
   
      else if((responseResult.status==500)){
        Swal.fire({
          icon: 'error',
          text: responseResult.message
        });
      }
    


    },
    (error:any) =>{
      this.authService.directlogout();
    })



  }
//\\ ======================== // Eventes List // ======================== //\\ 
//\\ ======================== // Authorities // ======================== //\\ 
  getRoles(folderid:any) {
     let dataParam = {
      "folderId": folderid
    };
    this.workFlowServices.getAdminRoles(dataParam).subscribe((response: any) => {
      let respData = response.RESPONSE_DATA;
      let respToken = response.RESPONSE_TOKEN;
      let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
      if(respToken == verifyToken){
        let res:any = Buffer.from(respData,'base64'); 
        let responseResult= JSON.parse(res)
  if (responseResult.status == '200') {
  let authorities:any=responseResult.result;
  this.folderName=authorities.folderName;
  
  let result:any=[];
   result = authorities.data;
   for (let i = 0; i < result.length; i++) {
     let obj: any = {};
     obj['fileOrFolderId'] = result[i].fileOrFolderId;
     obj['intId'] = result[i].intId;
     obj['type'] = result[i].type;
     obj['roleName'] = result[i].roleName;
     obj['roleId'] = result[i].roleId;
     let permissions:any=JSON.parse(result[i].permission);
      for(let j = 0; j < permissions.length; j++){
          if(permissions[j].label == 'WorkFlow' && permissions[j].selected == true){
              obj['permission'] = permissions[j].label
          }
      }
    
     this.roleArr.push(obj);
  
   }
  
        }
       
        else if((responseResult.status==500)){
          Swal.fire({
            icon: 'error',
            text: responseResult.message
          });
        }
      }
      else{
        this.loading = false;
    this.authService.directlogout();
      }


   


    },
    (error:any) =>{
      this.authService.directlogout();
    })



  }

  //\\ ======================== // Authorities // ======================== //\\ 
  validator() {
    let editorData = this.editor.drawflow.drawflow.Home.data;
    let editorKeys = Object.keys(editorData);
   
    let parallelNodes: any = [];
    let stageNo = 0;
    let stageArr: any = [];
    let valid = true;
    let arrParentNodes = [];
    let curObj = this;
    let arrApplicantMessageDetails: any = ''
    $(editorKeys).each(function (i: any) {
      console.log(editorKeys)
      let nodeKey = editorKeys[i];
      let nodeId = editorData[nodeKey];
      let input = Object.keys(editorData[nodeKey].inputs);
      let output = Object.keys(editorData[nodeKey].outputs);
      let arrParentNodes = [];
      let nodeOutputs: any = [];
      if (output.length > 0) {
        nodeOutputs = editorData[nodeKey].outputs.output_1.connections;
      } else {
        editorData[nodeKey].outputs = {};
      }
      if (input.length <= 0) {
        editorData[nodeKey].inputs = {};
      } else {
        if (editorData[nodeKey].inputs.input_1.connections.length > 0) {
          for (
            let m = 0;
            m < editorData[nodeKey].inputs.input_1.connections.length;
            m++
          ) {
            arrParentNodes.push(
              editorData[nodeKey].inputs.input_1.connections[m].node
            );
          }
        }
      }
      let nodeData = editorData[nodeKey].data;
      let name = editorData[nodeKey].name;
      if (nodeOutputs.length > 1) {
        $(nodeOutputs).each(function (j) {
          let outNodes = nodeOutputs[j].node;
          parallelNodes.push(outNodes);
        });
      }
      if (nodeData.userType == 1) {
        arrApplicantMessageDetails = nodeData['allMailSms'];

      }
      if (nodeData.userType == 2) {
        let stageNo = nodeData['lavel'] > 0 ? nodeData['lavel'] : 0;
       // console.log(nodeData);
        let desgId = nodeData['desgId'] > 0 ? nodeData['desgId'] : 0;
        let roleId = nodeData['roleId'] > 0 ? nodeData['roleId'] : 0;
        let events = nodeData['events'];
        let timeline = nodeData['timeline'];
        let authDocs = nodeData['approvalDocs'];
        let authLetters = nodeData['approvalLetters'];
        let demandNoteStatus = nodeData['demandPaymentStaus'];
        let approvalDocuments = nodeData['approvalDocuments'];
        let calcStatus = nodeData['calcStatus'];
        let calcDetails = nodeData['calcDetails'];
        let authActions = '';
        let mailSmsAuth = nodeData['allMailSms'];
        if (events) {
          authActions = events.join();
        } else {
          //viewAlert('Select the events');
          Swal.fire({
            icon: 'error',
            text: curObj.commonserveice.langReplace(curObj.messaageslist.chooseAction),
          });
          valid = false;
          return false;
        }
        if (timeline == '' || timeline <= 0) {
          Swal.fire({
            icon: 'error',
            text: curObj.commonserveice.langReplace(curObj.messaageslist.timeValid),
          });
          valid = false;
          return false;
        }
        if (nodeData.userType == 1) {
          let stageData = {
            output: nodeOutputs,
            data: nodeData,
            currentId: nodeKey,
            stageNo: 0,
          };
          stageArr.push(stageData);
          return false;
        }

        let parallelProcess = 0;
        if (parallelNodes.includes(nodeKey)) {
          parallelProcess = 1;
        } else {
          parallelProcess = 2;
        }

        let stageData = {
          tinStageNo: stageNo,
          desgId: desgId,
          roleId: roleId,
          authActions: authActions,
          parallel: parallelProcess,
          selProject: 0,
          selProcess: curObj.txtFormId,
          timeline: timeline,
          authDocs: authDocs,
          authLetters: authLetters,
          demandNoteStatus: demandNoteStatus,
          approvalDocuments: approvalDocuments,
          calcStatus: calcStatus,
          calcDetails: calcDetails,
          vchParentNodes: arrParentNodes.join(),
          tinCurrentNode: nodeKey,
          authMailSmsDetails: (mailSmsAuth!=''&& mailSmsAuth!=undefined) ? JSON.stringify(mailSmsAuth) : ''
        };
        stageArr.push(stageData);
      }
      return i;
    });
    if (!valid) {
      return false;
    }
   if(stageArr.length ==0)
      {
        Swal.fire({
          icon: 'error',
          text: this.commonserveice.langReplace("Please configure the workflow"),
        })
        return false;
      }
      else if(this.roleArr > 0){
        
      }
    let flowCanvas = curObj.editor.drawflow;
    flowCanvas = JSON.stringify(flowCanvas);
    
    let canvasArr = {
      folderId: this.folderid,
      serviceId: curObj.txtFormId,
      paymentType: 1,
      stageData: stageArr,
      drawData: this.encDec.escapeHtml(flowCanvas),
      //'unitType': unitType,
      // 'controlUnit': controlUnit,
      controlName: '',
      sectionName: '',
      projectCategory: 0,
      applicantMailSmsDetails: (arrApplicantMessageDetails!='' && arrApplicantMessageDetails!=undefined) ? JSON.stringify(arrApplicantMessageDetails) : ''
    };

   
   //console.log(canvasArr)
    this.workFlowServices.saveCanvasData(canvasArr).subscribe((response: any) => {
      let respData = response.RESPONSE_DATA;
      let respToken = response.RESPONSE_TOKEN;

      let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
      if(respToken == verifyToken){
        let res:any = Buffer.from(respData,'base64'); 
let responseResult= JSON.parse(res)
  
      if (responseResult.status == '200') {
        Swal.fire({
          icon: 'success',
          text: responseResult.message,
        }).then((result) => {


          if (result.isConfirmed) {
            let reData:any= this.folderid+':'+'0'
            let encSchemeStr = this.encDec.encText(reData.toString());
           this.route.navigate(['/admin/viewupload',encSchemeStr])
             }
        //  this.fillCanvasWorkflow(this.folderid);
         
        });
      } 
     else if (responseResult.status == '405') {
      Swal.fire({
        icon: 'error',
        text: responseResult.message,
      });
     }
     else if(responseResult.status==501){
        
      this.authService.directlogout();
    }
      else {
        Swal.fire({
          icon: 'error',
          text: curObj.commonserveice.langReplace(curObj.messaageslist.errorMsg),
        });
      }
      }
      else{
        this.loading = false;
    this.authService.directlogout();
      }

    
    },(error:any) =>{
      this.authService.directlogout();
    });

    return true;
  //  saveCanvasData(canvasArr);
  }



  updateEvents(editor: any, nodeId: any) {
    this.checkedMailSms = '';
   
    this.selAppDocuments = null;
 
    $('#btnSaveEvent').off('click');
    $('#btnAlertOk').off('click');
    $('#btnSaveEvent').show();
    $('.eventSection').find('.chk_actions').prop('checked', false);
    $('.eventSection').find('#txtTimeLine').val('');
    $('.eventSection').find('#hdnApprovalDocs').val('');
    $('.eventSection').find('#hdnApprovalLetters').val('');
    $('.eventSection').find('#hdnAllApprovalDocuments').val('');
    $('.eventSection').find('#lnkAuthType').hide();
    $('.eventSection').find('#lnkLetterType').hide();
    $('.eventSection').find('#approveDocType').hide();
    $('.dm21').hide();
    let nodeData = editor.getNodeFromId(nodeId);
    if (nodeData) {
      var nodeDataArr = nodeData.data;
      let userType = nodeData.data.userType;
      if (userType == 1) {
        // childEle.closest(".dynGridCls").classList.add('d-none');
        document.getElementById('eventsUl')?.classList.add('d-none');
        document.getElementById('ConditionDiv')?.classList.add('d-none');
        document.getElementById('timelineDiv')?.classList.add('d-none');
        document.getElementById('eventsU2')?.classList.remove('d-none');

        this.checkedMailSms = (nodeData.data.allMailSms == undefined) ? '' : nodeData.data.allMailSms;
      }
      else if (userType == 2) {
        document.getElementById('eventsU2')?.classList.add('d-none');
        document.getElementById('eventsUl')?.classList.remove('d-none');
        document.getElementById('ConditionDiv')?.classList.remove('d-none');
        document.getElementById('timelineDiv')?.classList.remove('d-none');
        this.checkedMailSms = (nodeData.data.allMailSms == undefined) ? '' : nodeData.data.allMailSms;

        $('#btnSaveEvent').show();
        this.nodeSelected = nodeId;
        var nodeEvents = nodeData.data.events;
        var nodeTimeline = nodeData.data.timeline;
        var nodeApproval = nodeData.data.approvalDocs;
      //  this.checkedLtrDocs = (nodeData.data.approvalLetters != undefined) ? nodeData.data.approvalLetters : '';
        var nodeDemandStatus = nodeData.data.demandPaymentStaus;
        var nodeapprovalDocuments = nodeData.data.approvalDocuments;
        if (nodeapprovalDocuments) {
          this.selAppDocuments = nodeapprovalDocuments;
          this.approvalDocRow = nodeapprovalDocuments;
        }
      
        var actionsDiv = [];
        let calcDetails = nodeData.data.calcDetails;
        let calcStatus = nodeData.data.calcStatus;
        var actionsDiv = [];
        if (Number(calcStatus) == 1) {
          $('#calcStatus1').prop('checked', true);
          $('#selFieldName').val(calcDetails[0]['calcfield']);
          $('#selCalc').val(calcDetails[0]['selCalc']);
          $('#txtValue').val(calcDetails[0]['txtValue']);
          document.getElementById("showYesDiv")?.setAttribute("style", "display: block;")
          document.getElementById("showYesDiv")?.classList.remove("d-none");

        } else {
          $('#calcStatus2').prop('checked', true);
          $('#selFieldName').val('0');
          $('#selCalc').val('0');
          $('#txtValue').val(' ');
          document.getElementById("showYesDiv")?.setAttribute("style", "display: none;")
          document.getElementById("showYesDiv")?.classList.add("d-none");
        }

        $(nodeEvents).each(function (i) {
          let nodeEventValue = nodeEvents[i];
          $('.chk_actions[value="' + nodeEventValue + '"]').prop(
            'checked',
            true
          );
        });

        $('#txtTimeLine').val(nodeTimeline);
        if (nodeApproval != '' && typeof nodeApproval != 'undefined') {
          $('#lnkAuthType').show();
        }
       
        if (
          nodeapprovalDocuments != '' &&
          typeof nodeapprovalDocuments != 'undefined'
        ) {
          $('#approveDocType').show();
        }
        if (nodeDemandStatus != '' && typeof nodeDemandStatus != 'undefined') {
          if (Number(nodeDemandStatus) == 2) {
            $('#dn').prop('checked', true);
          }
          $('.dem21').show();
        } else {
          $('.dem21').hide();
        }
        $('#hdnApprovalDocs').val(nodeApproval);
     
        $('#hdnAllApprovalDocuments').val(nodeapprovalDocuments);
      } else {
        $('#btnSaveEvent').hide();
      }
    }

    let curObj = this;


// ==== // Save events // ==== //


    $('#btnSaveEvent').on('click', function () {
  //  alert(0)
  let appliedUserType = editor.getNodeFromId(nodeId).data.userType;
      var actions: any = [];
      var docChecked = 0;
      var letterChecked = 0;
      var approvalDocumentsChecked = 0;

      $('.chk_actions').each(function () {
        if ($(this).is(':checked')) {
          let checkedAction = $(this).val();
          if (Number(checkedAction) == 12) {
            docChecked = 1;
          }
          if (Number(checkedAction) == 13) {
            letterChecked = 1;
          }
          if (Number(checkedAction) == 32) {
            approvalDocumentsChecked = 1;
          }
          actions.push(checkedAction);
        }
      });
      let demandPaymentStaus = 0;
      if ($('#chk_21').is(':checked')) {
        demandPaymentStaus = 1;
        if ($('#dn').is(':checked')) {
          demandPaymentStaus = 2;
        }
      }

      let timeLine: any = $('#txtTimeLine').val();
      let allDocs: any = $('#hdnAllDocs').val();
      let approvalDocs: any =
        docChecked == 1 ? $('#hdnApprovalDocs').val() : '';
      let allLetters: any = $('#hdnAllLetters').val();
      let approvalletrs: any =
        letterChecked == 1 ? $('#hdnApprovalLetters').val() : '';
      let approvalDocumentsType: any =
        approvalDocumentsChecked == 1
          ? $('#hdnAllApprovalDocuments').val()
          : '';


      // For Calculation
      
 
      let calcfield: any = $('#selFieldName').find(':selected').val();
      let calcfieldTabl:any = $('#selFieldName').find(':selected').attr('data-val');
      let selCalc = $('#selCalc').find(':selected').val();
      let txtValue: any = $('#txtValue').val();
      let calcStatus = $('input[name="calStatus"]:checked').val();
      let calcDetails: any = [];
      let calcValidStatus = true;

      if (Number(calcStatus) == 1) {
        if (!curObj.vldChkLst.selectDropdown(calcfield, ' Select Field Name'))
          calcValidStatus = false;
        if (!curObj.vldChkLst.selectDropdown(selCalc, ' Select Condition'))
          calcValidStatus = false;
        if (!curObj.vldChkLst.blankCheck(txtValue, 'Value <span class="">cannot be left blank</span>'))
          calcValidStatus = false;
        calcDetails.push({
          'calcfield': calcfield,
          'selCalc': selCalc,
          'txtValue': (txtValue).trim(),
          'dynTableName':calcfieldTabl.trim(),
          'dyncolName': curObj.arrAllFormDetails[calcfield][0]['tablecolDetails'][0]['ctrlTblColName']
        });
      }
      
    nodeDataArr['events'] = actions;
    nodeDataArr['timeline'] = timeLine.trim();

    nodeDataArr['demandPaymentStaus'] = demandPaymentStaus;
    nodeDataArr['approvalDocuments'] = curObj.approvalDocuments;
    nodeDataArr['verifyDocs'] = curObj.allAssignedVerifyDocs;
    nodeDataArr['calcStatus'] = calcStatus;
    nodeDataArr['calcDetails'] = calcDetails;
    nodeDataArr['allMailSms'] = curObj.checkedMailSms;

    if (calcValidStatus) {
      $('#hdnAllDocs').val(allDocs);
      $('#hdnAllLetters').val(allLetters);
      $('#hdnAllApprovalDocuments').val(curObj.approvalDocuments);
      $('#hdnCalcDetails').val(calcDetails);
      $('#hdnAllSmsMail').val(curObj.checkedMailSms);
      if (appliedUserType == 2) {
        if (actions.length <= 0) {
          Swal.fire({
            icon: 'error',
            text: curObj.commonserveice.langReplace(curObj.messaageslist.chooseAction),
          });
          return false;
        }
        if (timeLine == '' || timeLine <= 0) {
          Swal.fire({
            icon: 'error',
            text: curObj.commonserveice.langReplace(curObj.messaageslist.timeValid),
          });
          return false;
        }
      }


      nodeDataArr['events'] = actions;
      nodeDataArr['timeline'] = timeLine;
      nodeDataArr['approvalLetters'] = approvalletrs;
      nodeDataArr['demandPaymentStaus'] = demandPaymentStaus;
      nodeDataArr['approvalDocuments'] = curObj.approvalDocuments;
      nodeDataArr['verifyDocs'] = curObj.allAssignedVerifyDocs;
      nodeDataArr['calcStatus'] = calcStatus;
      nodeDataArr['calcDetails'] = calcDetails;

      editor.updateNodeDataFromId(nodeId, nodeDataArr);
      Swal.fire({
        icon: 'warning',
        text: curObj.commonserveice.langReplace(curObj.messaageslist.eventConfirm),
      }).then((result) => {
        if (result.isConfirmed) {
          $('.eventSection').find('.chk_actions').prop('checked', false);
          $('.eventSection').find('#txtTimeLine').val('');
          $('#lnkAuthType').hide();
          $('#lnkLetterType').hide();
          $('#approveDocType').hide();
          $('#hdnApprovalDocs').val('');
          $('#hdnApprovalLetters').val('');
          $('#hdnAllApprovalDocuments').val('');
          $('#hdnAllSmsMail').val('');
          $('.dem21').hide();
          document.getElementById("showYesDiv")?.setAttribute("style", "display: none;")
          document.getElementById("showYesDiv")?.classList.add("d-none");
          $('.calcStatus').prop('checked', false);
          $('#calcStatus2').prop('checked', true);
          curObj.checkedMailSms = '';
          curObj.approvalDocuments = '';
          curObj.approvalDocRow = [1];
         

          let allMailSms: any = document.getElementsByClassName('mailSmsChkBx');
          for (let allMailDts of allMailSms) {
            allMailDts.checked = false;

          }

        }
      });
      return true;
    }
    else
    {
      return false;
    }
    });
  }

  getLavelCtr(editor: any, nodeId: any, ctr: any) {
    let nodeData = editor.getNodeFromId(nodeId);
    let nodeInputs = Object.keys(nodeData.inputs);
    if (nodeInputs.length > 0) {
      let nodeInputCon = nodeData.inputs.input_1.connections;
      if (nodeInputCon.length > 0) {
        ctr++;
        let parentNodeId = nodeInputCon[0].node;

        ctr = this.getLavelCtr(editor, parentNodeId, ctr);
      }
    }
    return ctr;
  }

  fillCanvasWorkflow(folderid:any) {
    this.editor.clearModuleSelected();
    let arrParam = {
      folderId:folderid
    };
    let curObj = this;
    this.workFlowServices.fillWorkflowData(arrParam).subscribe((response: any) => {

      let respData = response.RESPONSE_DATA;
      let respToken = response.RESPONSE_TOKEN;
      let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
      if(respToken == verifyToken){
        let res:any = Buffer.from(respData,'base64'); 
        let responseResult= JSON.parse(res)
  
  
        if (responseResult.status==200) {
          
          var drawFlow = responseResult.result.workflowDetail.canvasData;
         
           drawFlow = this.encDec.decodeHtml(drawFlow);
  
         //  console.log(drawFlow)
          drawFlow = JSON.parse(drawFlow);
          this.editor.import(drawFlow);
          var drawData = drawFlow.drawflow.Home.data;
          var drawKeys = Object.keys(drawData);
          var appDocs = '';
          $(drawKeys).each(function (i) {
            var drawKeyCtr = drawKeys[i];
            var drawKeyData = drawData[parseInt(drawKeyCtr)];
            var approvalDocs = drawKeyData.data.approvalDocs;
            //curObj.approvalDocuments = drawKeyData.data.approvalDocuments;
  
           // console.log(drawKeyData.data);
            if (typeof approvalDocs != 'undefined' && approvalDocs != '') {
              appDocs = appDocs + approvalDocs + ',';
            }
          });
          appDocs = appDocs.slice(0, -1);
  
          $('#hdnAllDocs').val(appDocs);
        }  
        else if((responseResult.status==400)){
          Swal.fire({
            icon: 'error',
            text: responseResult.message
          });
        }
        else if((responseResult.status==402)){
        //here no workflow for specific folder
        }
        else if(responseResult.status==501){
          
          this.authService.directlogout();
        }
        else {
          Swal.fire({
            icon: 'error',
            text: "Something went wrong"
          });
        }
      }
      else{
        this.loading = false;
    this.authService.directlogout();
      }


 


    },
    (error:any) =>{
      this.authService.directlogout();
    });
  }

  chooseAction(elementId: any, id: any) {

    
 

    if (this.nodeSelected == null) {

      (<HTMLInputElement>document.getElementById('chk_' + elementId)).checked =
        false;
      Swal.fire({
        icon: 'error',
        text: this.commonserveice.langReplace('Select the authority to set the document'),
      });
     
    } 
    let nodeData = this.editor.getNodeFromId(this.nodeSelected);
    let nodeInputCon = nodeData.inputs.input_1.connections;
    let nodeOutputCon = nodeData.outputs.output_1.connections;

 if((this.nodeSelected != null) && (nodeInputCon.length == 0) && (elementId == 2)){
  (<HTMLInputElement>document.getElementById('chk_' + elementId)).checked = false;
  Swal.fire({
    icon: 'error',
    text:  this.commonserveice.langReplace('You can not chose markdown single or not connected authorities'),
  });
}
else if((this.nodeSelected != null) && (nodeOutputCon.length == 0) && (elementId == 1)){
  (<HTMLInputElement>document.getElementById('chk_' + elementId)).checked = false;
  Swal.fire({
    icon: 'error',
    text:  this.commonserveice.langReplace('You can not chose markup Please Connect the authorities first'),
  });
}

    else {
      
      this.approvalDocEvents = [];
      if (
        id == 15 &&
        (<HTMLInputElement>document.getElementById('chk_' + elementId)).checked
      ) {
        (<HTMLInputElement>document.getElementById('docUpload')).click();
        let curObj = this;
        $('.chk_actions').each(function () {
          if ($(this).is(':checked')) {
            let checkedAction = $(this).val();
            let checkedActionId = $(this).attr('id');
            let checkedText = $("label[for='" + checkedActionId + "']").text();
            if (checkedAction != 15) {
              curObj.approvalDocEvents.push({
                eventId: checkedAction,
                eventText: checkedText,
              });
            }
          }
        });
        //this.approvalDovEvents
      } else if (
        id == 12 &&
        (<HTMLInputElement>document.getElementById('chk_' + elementId)).checked
      ) {
        (<HTMLInputElement>document.getElementById('docVerify')).click();
      }
    }
  }

  getMessage(elementId: any, id: any) {
    // console.log("element id is " + elementId);
    // console.log("id " + id);

    // if (this.nodeSelected == null) {
    //   (<HTMLInputElement>document.getElementById('msg_' + elementId)).checked = false;
    //   Swal.fire({
    //     icon: 'error',
    //     text: this.commonService.langReplace('Select the authority to get message') + ' .',
    //   });
    // } else {
    //   this.approvalDocEvents = [];
    //   // alert(document.getElementById('message'));
    //   (<HTMLInputElement>document.getElementById('message')).click();
    // }

  }

  loadMessageEngine() {
    // this.messageDataToBind=[];
    // this.mailConigDetails=[];
    // this.smsConfigDetails=[];
    // this.whatsappConfigDetails=[]
    let messageParams = {
      "intMessageConfigId": "",
      "intMessageConfigType": "",
      "formId": this.txtFormId,
      "formName": "",
      "messageType": "1"
    };
    this.loading = true;
    this.workFlowServices.viewMessageConfigPublished(messageParams).subscribe((res: any) => {
      let respData = res.RESPONSE_DATA;
      let allRes: any = Buffer.from(respData, 'base64');
      res = JSON.parse(allRes.toString());
      console.log("res "+res);
      
      this.messageDataToBind = res.result;
      console.log(this.messageDataToBind)
      for (let messageDataLoop of this.messageDataToBind) {
        if (messageDataLoop.intMessageConfigType == 1) {
          if (this.mailConigDetails.length == 0) {
            this.mailConigDetails = [messageDataLoop];
          }
          else {
            this.mailConigDetails.push(messageDataLoop);
          }
        }
        else if (messageDataLoop.intMessageConfigType == 2) {
          if (this.smsConfigDetails.length == 0) {
            this.smsConfigDetails = [messageDataLoop];
          }
          else {
            this.smsConfigDetails.push(messageDataLoop);
          }
        }

        else if (messageDataLoop.intMessageConfigType == 3) {
          if (this.whatsappConfigDetails.length == 0) {
            this.whatsappConfigDetails = [messageDataLoop];
          }
          else {
            this.whatsappConfigDetails.push(messageDataLoop);
          }
        }
      }
      // mailConigDetails:any='';
      // smsConfigDetails:any='';
      // whatsappConfigDetails:any='';
    });
  }






 
  setApplicantAction(event: any) {
    let aClick: any = event.target;
    this.msgclickedEvent = aClick.getAttribute('data-actionid');
    let evtSelectedStatus = true;
    if (this.msgclickedEvent != 'Registration') {
      let evtElemnt: any = document.getElementById('chk_' + this.msgclickedEvent);
      if (!evtElemnt.checked) {
        evtSelectedStatus = false;
        Swal.fire({
          icon: 'error',
          text: this.commonserveice.langReplace('Select event first'),
        });
      }

    }

    if (this.checkedMailSms.length > 0) {
  
      //console.log(this.checkedMailSms);
      for (let allMailDts of this.checkedMailSms) {
      
        if (this.msgclickedEvent == allMailDts.events) {
        
          let kchkMailSms: any = allMailDts.allChedkMailMsgs.split(',');
          setTimeout(function(){
          let allMailSms:any = document.getElementsByClassName('mailSmsChkBx');

             for (let allMailDts of allMailSms) {
         
            if (kchkMailSms.includes(allMailDts.value)) {
             
              allMailDts.checked = true;
            }
            else {
              allMailDts.checked = false;
            }
          }
         },500);
      
     
    
         break;
        }
        else {
          let allMailSms: any = document.getElementsByClassName('mailSmsChkBx');
          for (let allMailDts of allMailSms) {
            allMailDts.checked = false;
          }
        }
      }

    }
    else {
      let allMailSms: any = document.getElementsByClassName('mailSmsChkBx');
      for (let allMailDts of allMailSms) {
        allMailDts.checked = false;
      }
    }
    if (evtSelectedStatus) {
     
      this.open(this.sendMsgModal);

      //(<HTMLInputElement>document.getElementById('message')).click();
    }



  }
  closeSMActions(){
   this.closeModal()
  }
  saveAllMailSmsActions() {
    let allMailSms: any = document.getElementsByClassName('mailSmsChkBx');
    let allChedkMailMsgs: any = '';
    for (let allMailDts of allMailSms) {
      if (allMailDts.checked) {
        if (allChedkMailMsgs.length > 0) {
          allChedkMailMsgs += ',' + allMailDts.value;
        }
        else {
          allChedkMailMsgs = allMailDts.value;
        }
      }
    }
    
    if (this.checkedMailSms.length > 0) {
      if (this.msgclickedEvent != 'Registration') {
        let arraPushElements: any = '';
        for (let allMailDtsloop of this.checkedMailSms) {
          if (this.msgclickedEvent == allMailDtsloop.events) {
            continue;
          }
          else {
            if (arraPushElements.length > 0) {
              arraPushElements.push(allMailDtsloop);
            }
            else {
              arraPushElements = (allMailDtsloop);
            }
          }
        }
        this.checkedMailSms = [arraPushElements];
        this.checkedMailSms.push({ 'allChedkMailMsgs': allChedkMailMsgs, 'events': this.msgclickedEvent });
      }

      else
      {
        this.checkedMailSms = ([{ 'allChedkMailMsgs': allChedkMailMsgs, 'events': this.msgclickedEvent }]);
      }
      
    }
    else {
      this.checkedMailSms = ([{ 'allChedkMailMsgs': allChedkMailMsgs, 'events': this.msgclickedEvent }]);
    }

    this.msgclickedEvent = '';
  this.closeModal()
  }
  //\\ ======================== // Modal Open // ======================== //\\ 
  open(content: any) {
    this.modalService.open(content, { size: 'lg', backdrop: 'static', keyboard: false, ariaLabelledBy: 'modal-basic-title' }).result.then((result: any) => {
    }, (reason: any) => { });
  }
  //\\ ======================== // Modal Open // ======================== //\\ 
  closeModal() {
    this.modalService.dismissAll();
  }
  //\\ ======================== // Modal Close // ======================== //\\
  resetform(){
    let reData:any= this.folderid+':'+'0'
    let encSchemeStr = this.encDec.encText(reData.toString());
    this.route.navigate(['/admin/viewupload',encSchemeStr])
  }
}
