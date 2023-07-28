import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonServicesService } from '../../services/common-services.service';
import Swal from 'sweetalert2';
import { AuthenticationService } from '../../services/authentication.service';
import { EncrypyDecrpyService } from '../../services/encrypy-decrpy.service';
import * as CryptoJS from 'crypto-js';
import {Buffer} from 'buffer';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { WorkflowService } from '../../services/workflow.service';



@Component({
  selector: 'app-leftmenu',
  templateUrl: './leftmenu.component.html',
  styleUrls: ['./leftmenu.component.scss']
})
export class LeftmenuComponent implements OnInit {


  @ViewChild(DatatableComponent) table: DatatableComponent;
  siteUrl = environment.siteURL;
  currentYear: number = new Date().getFullYear();
  listChildChanged:any = [];
 
  sfolderid:any='';
  folderarr:any = [
    {
      parentFolderId: "1",
      folderName: "Documents",
      expand: true,
      children: []
    }
    
  ];
  childfolder:any;
  reorderable: boolean = true;
  loadingIndicator: boolean = true;
  folderlist:any;
  rows:any = [];
  columns = [ { prop: 'Name' }];
  public temp: Array<object> = [];
  finalobj: any = {
    'Name':[],
    'Reference':[],
    'Size':[],
    'Document':[],
    'pendingAtName':[],
    'Createdby':[]
  }; 
  sessiontoken:any;
  desgId:any;
  roleId:any;
approvalcheck:any=false;



  constructor(
    private route: Router,
    private httpClient: HttpClient,
    public commonserveice:CommonServicesService,
    public authService:AuthenticationService,
    public encDec:EncrypyDecrpyService,
    private workFlowServices: WorkflowService,
  ) { }

  ngOnInit(): void {
    this.getfolderHierarchy();
   
  
  this.sessiontoken = sessionStorage.getItem('ADMIN_SESSION'); 
  let SeetionParsed =JSON.parse(CryptoJS.AES.decrypt(this.sessiontoken, environment.apiHashingKey).toString(CryptoJS.enc.Utf8)); 
 
   this.desgId=SeetionParsed.USER_ID;
   this.roleId=SeetionParsed.ROLE_ID;  

  


  }


  //\\ ======================== // get Folders // ======================== //\\
  getfolderHierarchy() {
    let dataParam = {
     
    };
    this.commonserveice.getFolderList(dataParam).subscribe((response: any) => {
      let respData = response.RESPONSE_DATA;
      let respToken = response.RESPONSE_TOKEN;
      let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
      if(respToken == verifyToken){
        let res:any = Buffer.from(respData,'base64'); 
          let responseResult= JSON.parse(res)


      if (responseResult.status == '200') {

        let folderlist=responseResult.result;

        let reviselist=this.toNested(folderlist)
      
       

       this.folderarr[0].children = reviselist;

      
 
      }
      else if(responseResult.status=='501'){
       
        this.authService.directlogout();
      }
      else if((responseResult.status==500)){
        Swal.fire({
          icon: 'error',
          text: responseResult.message
        });
      }
      else {
       
      }
      }
      else{
       
        this.authService.directlogout();
      }
    


    },
    (error:any) =>{
      this.authService.directlogout();
    })
  }


  loadFolderData(folderid:any,expandval:any){
   if(expandval==true){
//alert(expandval)
      let encSchemeStr = this.encDec.encText(folderid.toString());
      this.route.navigate(['/admin/viewupload',encSchemeStr])
   }
    
   }


onTreeAction(event: any) {
 
  const index = event.rowIndex;

  const row = event.row;
 //console.log(row);

  if ((row.treeStatus == 'collapsed')||(row.treeStatus == undefined)) {
    row.treeStatus = 'expanded';
  } else {
    row.treeStatus = 'collapsed';
  }
  this.rows = [...this.rows];
}

toNested(data:any, pid = 1) {
  return data.reduce((r:any, e:any) => {
    if (pid == e.parentFolderId ) {
      const object = { ...e }
      const children = this.toNested(data, e.folderId);

      if (children.length) {
        object.children = children
      }

      r.push(object)
    }

    return r;
  }, [])



}




getKeys(obj:any){
  return Object.keys(obj)
}
}
