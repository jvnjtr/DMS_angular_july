import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonServicesService } from '../../services/common-services.service';
import { environment } from '../../../environments/environment';
import * as CryptoJS from 'crypto-js';
import Swal from 'sweetalert2';
import { AuthenticationService } from '../../services/authentication.service';
import { ValidatorchecklistService } from '../../services/validatorchecklist.service';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { fromEvent } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';
import {Buffer} from 'buffer';

@Component({
  selector: 'app-newfolder',
  templateUrl: './newfolder.component.html',
  styleUrls: ['./newfolder.component.scss']
})
export class NewfolderComponent implements OnInit {
 
  @ViewChild(DatatableComponent) table: DatatableComponent;
//\\ ======================== // Variables // ======================== //\\
  title: any;
  tablist: any;
  utillist: any;
  messaageslist: any;
  jsonurl = "assets/js/_configs/newFolder.config.json";
  letterID: any = "";
  files_dropped: File[] = [];
  folderlist: any = [];
  sizetypelist: any = ['-', 'KB', 'MB', 'GB', 'TB']
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  pageSizes = [10, 20, 50, 100, 500, 1000];
  selParentFolderName: any = '0';
  txtFolderName: any = '';
  rdoPermissiontype: any = '0';
  isSelected: boolean = true;
  nameList: any = [];
  selectedItems: any;
  dropdownSettings: any;
  txtAllowSize: any;
  selSizeType: any = '0';
  rolelist: any = [];
  selectroleList: any = [];
  userslist: any = [];
  selection: any;
  folderId: any = '';
  dataviewtype:any=1;
  txtSearch:any;
  sessiontoken:any;
  userid:any;
  designationid:any;
  username:any;
  permissionlist:any;
  rolewisepermissions:any=[];
  userwisepermissions:any=[];


  rolepermissions:any=[];
  
  permissionlistitems:any=[
    {label: 'Read'},
    {label: 'Write'},
    {label: 'Download'},
    {label: 'Create Folder'},
    {label: 'Delete'},
    {label: 'Rename'},
    
    {label: 'WorkFlow'},
    {label: 'Move to folder'}
  

  ]
  loading:any=false;
  folderSizeType:any;
  parentSizeinKb:any;
  childSizeInKb:any;
  folderlistItmes:any=[];

  reorderable: boolean = true;
  loadingIndicator: boolean = true;

  rows:any=[];
  columns:any = [
  { prop: 'Name' }, 
  { name: 'Allocated Size' },
  { name: 'Free Space' },
  { name: 'Created On' },
  { name: 'Created By' },
  { name: 'Action' }
  ];
  data:any=[];
  filteredData:any = [];
  public temp: Array<object> = [];
departmentsList:any=[];
selDepartmentName:any='Select';
txtAllowFileSize:any;
selFileSizeType:any='0';
txtDepartmentName:any;
//\\ ======================== // Variables // ======================== //\\

  constructor(
    private route: Router,
    public authService: AuthenticationService,
    private httpClient: HttpClient,
    public commonserveice: CommonServicesService,
    private authentication: AuthenticationService,
    public vldChkLst: ValidatorchecklistService,
    
  ) { }

  ngOnInit(): void {

    this.dropdownSettings = {
      singleSelection: false,
      text: 'Select Name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: 'myclass custom-class'
    };


    this.loadconfig();
    this.getFolders();
    this.getFolderList('');
    //this.getRole(this.selDepartmentName);
    this.getDepartmentList()
    this.sessiontoken = sessionStorage.getItem('ADMIN_SESSION'); 

    // let SeetionParsed =JSON.parse(this.sessiontoken).toString(); 
    let SeetionParsed =JSON.parse(CryptoJS.AES.decrypt(this.sessiontoken, environment.apiHashingKey).toString(CryptoJS.enc.Utf8)); 
    // console.log(SeetionParsed)
     this.username=SeetionParsed.USER_NAME;
    this.userid=SeetionParsed.USER_ID;
    this.getDesignation(this.userid)
    // this.selectedItems=[{ id:this.userid, itemName: this.username }];
  

    // let obj: any = {};
    // obj['itemName'] =this.username;
    // obj['id'] = this.userid;

    // this.userslist.push(obj);
   
  }
  //\\ ======================== // Config // ======================== //\\
  loadconfig() {
    this.httpClient.get<any>(this.jsonurl).subscribe({
      next: (data) => {
         this.tablist=data[0].tabList;
           this.utillist=data[0].utils
           this.messaageslist=data[0].messages; 
           this.title = data[0].pagetitle;
      },
      error: (msg) => {
        this.authService.directlogout();
     }
   })
   
  }
//\\ ======================== // Config // ======================== //\\
getDesignation(uderid:any){
  let dataParam = {
    "desgId": uderid,
    
   
  };

  this.commonserveice.getDesignation(dataParam).subscribe({
    next: (response) => {
      let respData = response.RESPONSE_DATA;
      let respToken = response.RESPONSE_TOKEN;
     
    
      let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
          if(respToken == verifyToken){
            let res : any = { 'status': 0, 'result': {} }; 
     
            res = Buffer.from(respData,'base64'); 
            let responseResult= JSON.parse(res)
          
            
             // console.log(this.designationid)
              if (responseResult.status == 200) {
                this.designationid=responseResult.result[0].desgId;
              }
              else if(responseResult.status==501){
                  
                this.authService.directlogout();
              }
             else{
              this.commonserveice.swalfire('error',this.commonserveice.langReplace(environment.somethingWrong))
             }
          }
          else{
            this.loading = false;
            this.commonserveice.swalfire('error',this.commonserveice.langReplace(environment.invalidResponse))
            
          }
    },
    error: (msg) => {
      this.authService.directlogout();
   }
 })


}

  //\\ ======================== // get Folders // ======================== //\\
  getFolders() {
    let dataParam = {
      "folderId": '0',
    };

    this.commonserveice.getFolders(dataParam).subscribe({
      next: (response) => {     let respData = response.RESPONSE_DATA;
        let respToken = response.RESPONSE_TOKEN;
        let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
  
        
        if(respToken == verifyToken){
          let res: any = { 'status': 0, 'result': {} };
  
  
  
  
          res = Buffer.from(respData,'base64'); 
          let responseResult= JSON.parse(res)
      
      
      
            if (responseResult.status == '200') {
              this.folderlist = responseResult.result;
              for(let i=0;i<responseResult.result.length;i++){
                this.rows.push(responseResult.result[i]);
              }
              this.temp=this.rows;
           //  console.log(this.temp);
            }
            else if(responseResult.status==501){
              
              this.authService.directlogout();
            }
          else{
            this.commonserveice.swalfire('error',this.commonserveice.langReplace(environment.somethingWrong))
          }
        }
        else{
          this.loading = false;
          this.commonserveice.swalfire('error',this.commonserveice.langReplace(environment.invalidResponse))
         
        }},
      error: (msg) => {
        this.authService.directlogout();
     }
   })


  }
  //\\ ======================== // get Folders // ======================== //\\
  showdubfolder(folderId:any,e:any){
    e.select = !e.select;
    
    this.getFolderList(folderId)
  }

  //\\ ======================== // get Parent Folder wise data // ======================== //\\
  getFolderList(parentfolderid:any) {
    let dataParam = {
      "parentFolderId": parentfolderid,
    };

    this.commonserveice.getParentwiseFolders(dataParam).subscribe({
      next: (response) => {   let respData = response.RESPONSE_DATA;
        let respToken = response.RESPONSE_TOKEN;
        let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
        if(respToken == verifyToken){
          let res: any = { 'status': 0, 'result': {} };
  
          res = Buffer.from(respData,'base64'); 
          let responseResult= JSON.parse(res)
      
      
      
            if (responseResult.status == '200') {
              this.folderlistItmes = responseResult.result;
      
            
      
             // console.log(responseResult.result);
             // console.log(this.rows);
            }
            else if(responseResult.status==501){
              
              this.authService.directlogout();
            }
          else{
            this.commonserveice.swalfire('error',this.commonserveice.langReplace(environment.somethingWrong))
          }
        }
        else{
          this.loading = false;
          this.commonserveice.swalfire('error',this.commonserveice.langReplace(environment.invalidResponse))
        }
  },
      error: (msg) => {
        this.authService.directlogout();
     }
   })



  }
 //\\ ======================== // get Parent Folder wise data // ======================== //\\
 
    //\\ ======================== // get Department list wise data // ======================== //\\
    getDepartmentList() {
      let dataParam = {
        "deptId": "",
      };
      this.commonserveice.loadDepartment(dataParam).subscribe({
        next: (response) => {   let respData = response.RESPONSE_DATA;
          let respToken = response.RESPONSE_TOKEN;
          let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
          if(respToken == verifyToken){
            let res: any = { 'status': 0, 'result': {} };
    
            res = Buffer.from(respData,'base64'); 
            let responseResult= JSON.parse(res)
        
        
        
              if (responseResult.status == '200') {
                this.departmentsList = responseResult.result;
        
              
        
             
              }
              else if(responseResult.status==501){
              
                this.authService.directlogout();
              }
            else{
              this.commonserveice.swalfire('error',this.commonserveice.langReplace(environment.somethingWrong))
            }
          }
          else{
            this.loading = false;
            this.authService.directlogout();
          }},
        error: (msg) => {
             this.authService.directlogout();
       }
     })


      
    }
   //\\ ======================== // get Department list wise data // ======================== //\\
   deptChange(deptid:any){
     this.getRole(deptid)

    }

  //\\ ======================== // Get Roles // ======================== //\\
  getRole(deptId:any) {
    this.rolelist = [];
    let dataParam = {
      "roleId": '0',
      "deptId": deptId
    };

    this.commonserveice.getRoles(dataParam).subscribe({
      next: (response) => {
        let respData = response.RESPONSE_DATA;
        let respToken = response.RESPONSE_TOKEN;
        let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
        if(respToken == verifyToken){
          let res: any = { 'status': 0, 'result': {} };
  
          res = Buffer.from(respData,'base64'); 
          let responseResult= JSON.parse(res)
      
    
          if (responseResult.status == 200) {
            let result = responseResult.result;
            for (let i = 0; i < result.length; i++) {
              let obj: any = {};
              obj['roleName'] = result[i].roleName;
              obj['roleId'] = result[i].roleId;
              obj['checked'] = false;
              obj['permission'] = [
                {label: 'Read', selected: false},
                {label: 'Write', selected: false},
                {label: 'Download', selected: false},
                {label: 'Create Folder', selected: false},
                {label: 'Delete', selected: false},
                {label: 'Rename', selected: false},
               
                {label: 'WorkFlow', selected: false},
                {label: 'Move to folder', selected: false}
              ];
    
             
              this.rolelist.push(obj);
              // {label: 'Archive', selected: false},
            }
           
         //console.log(this.rolelist)
          }
          else if(responseResult.status==501){
            
            this.authService.directlogout();
          }
        }
        else{
          this.loading = false;
          this.authService.directlogout();
        }
        
      },
      error: (msg) => {
        this.authService.directlogout();
     }
   })

   
  }
  //\\ ======================== // Get Roles // ======================== //\\

//\\ ======================== // Rolewose changes // ======================== //\\
  rolechange(e:any,i:any){
    if(e.target.checked == true){
       for(let j=0;j<this.rolelist[i].permission.length;j++ ){
          this.rolelist[i].permission[0].selected=e.target.checked
        }
    }
    else{
      $('#rolerow_'+i).find('.roleselectAll').prop('checked',false);    
        for(let j=0;j<this.rolelist[i].permission.length;j++ ){
          this.rolelist[i].permission[j].selected=e.target.checked
     }
    }

 
  }
  checkchanged(e:any,i:any,pi:any){
  
    if(e.target.checked == true){

      for(let j=0;j<this.rolelist[i].permission.length;j++ ){
         this.rolelist[i].permission[pi].selected=e.target.checked;
         this.rolelist[i].checked=true;
       }
    
   }
   else{
     $('#rolerow_'+i).find('.roleselectAll').prop('checked',false);    
       for(let j=0;j<this.rolelist[i].permission.length;j++ ){
         this.rolelist[i].permission[pi].selected=e.target.checked;
         this.rolelist[i].checked=false;
    }
   
   }

 //   this.rolelist[i].permission[pi].selected= e.target.checked;

   let totalCheckbox:any = document.querySelectorAll('#rolerow_'+i+' .permissionChk').length;
   let totalChecked:any = document.querySelectorAll('#rolerow_'+i+' .permissionChk:checked').length;
 
  
if(this.rolelist[i].permission[pi].selected == true){
 $('#rolerow_'+i).find('.roleselectAll').prop('checked',false);

 $('#rolerow_'+i).find('.chkrole').prop('checked',true);
 if(totalCheckbox == totalChecked) {
   $('#rolerow_'+i).find('.roleselectAll').prop('checked',true);
 }
}
else{


 if(totalChecked == 0) {
  
   $('#rolerow_'+i).find('.chkrole').prop('checked',false);
 } 
 else{
   $('#rolerow_'+i).find('.roleselectAll').prop('checked',false);
 }
}   

 
 }
 checkUncheckAll(e:any,i:any){
  if(e.target.checked == true){
   
    $('#rolerow_'+i).find('.chkrole').prop('checked',true);

for(let j=0;j<this.rolelist[i].permission.length;j++ ){
this.rolelist[i].permission[j].selected=e.target.checked
this.rolelist[i].checked=true;
}
  }
  else{
    $('#rolerow_'+i).find('.chkrole').prop('checked',false);    
for(let j=0;j<this.rolelist[i].permission.length;j++ ){
this.rolelist[i].permission[j].selected=e.target.checked
this.rolelist[i].checked=false;
}
  }


}
  //\\ ======================== // Folder Rolewise  changes // ======================== //\\
  
  frolechange(e:any,i:any){
    if(e.target.checked == true){
      for(let j=0;j<this.rolewisepermissions[i].permission.length;j++ ){
        this.rolewisepermissions[i].permission[0].selected=e.target.checked
        this.rolewisepermissions[i].checked=true;
      }
     }
    else{
      $('#rolerow_'+i).find('.roleselectAll').prop('checked',false);    
        for(let j=0;j<this.rolewisepermissions[i].permission.length;j++ ){
          this.rolewisepermissions[i].permission[j].selected=e.target.checked
          this.rolewisepermissions[i].checked=false;
        }
            }

}
 fcheckchanged(e:any,i:any,pi:any){

  if(e.target.checked == true){
   
      this.rolewisepermissions[i].checked=true;
    
   }
  else{
    $('#rolerow_'+i).find('.roleselectAll').prop('checked',false);    
   
        this.rolewisepermissions[i].checked=false;
      
          }


    this.rolewisepermissions[i].permission[pi].selected= e.target.checked;

   let totalCheckbox:any = document.querySelectorAll('#rolerow_'+i+' .permissionChk').length;
   let totalChecked:any = document.querySelectorAll('#rolerow_'+i+' .permissionChk:checked').length;
  if(this.rolewisepermissions[i].permission[pi].selected == true){
 $('#rolerow_'+i).find('.roleselectAll').prop('checked',false);

 $('#rolerow_'+i).find('.chkrole').prop('checked',true);
 if(totalCheckbox == totalChecked) {
   $('#rolerow_'+i).find('.roleselectAll').prop('checked',true);
 }
}
else{


 if(totalChecked == 0) {
  
   $('#rolerow_'+i).find('.chkrole').prop('checked',false);
 
 } 
 else{
   $('#rolerow_'+i).find('.roleselectAll').prop('checked',false);
 }
}   

   //  roleselectAll
 }


  usercheckUncheckAll(e:any,i:any){
    if(e.target.checked == true){
     
      $('#rolerow_'+i).find('.chkrole').prop('checked',true);

for(let j=0;j<this.rolewisepermissions[i].permission.length;j++ ){
  this.rolewisepermissions[i].permission[j].selected=e.target.checked
  this.rolewisepermissions[i].checked=true;
}
    }
    else{
      $('#rolerow_'+i).find('.chkrole').prop('checked',false);    
for(let j=0;j<this.rolewisepermissions[i].permission.length;j++ ){
  this.rolewisepermissions[i].permission[j].selected=e.target.checked
  this.rolewisepermissions[i].checked=false;
}
    }


  } 




  //\\ ======================== // Table Pagination // ======================== //\\
  onTableDataChange(event: any) {
    this.page = event;
    
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;

  }
  //\\ ======================== // Table Pagination // ======================== //\\
//\\ ======================== // Rolebased Validation // ======================== //\\
  validaterolebased() {
    if (this.selectroleList.length > 0) {
      let validationStatus = true;

      for (let i = 0; i < this.selectroleList.length; i++) {

        let roleName = this.selectroleList[i].roleName;
        let permission = this.selectroleList[i].permission;
        let rolechecked = this.selectroleList[i].checked;


        if (rolechecked == false || typeof (rolechecked) == undefined || rolechecked == null) {

          // alert(1)

         
          this.commonserveice.swalfire('error',roleName + ' ' + this.messaageslist.chkrolename)
          
          validationStatus = false;
          break;

        }
         else if (rolechecked == true) {
           
          let countarray:any = [];
          for(let j=0;j<permission.length;j++){

            if(permission[j].selected == true){
              countarray.push(permission[j].label)
            }

           
          }
        if(countarray.length == 0){
        
          this.commonserveice.swalfire('error',this.commonserveice.langReplace("Please select one permission type"))
          
          validationStatus = false;
          break;
        }
       
         
        return validationStatus;
      
         }
       

      }
      return validationStatus;
      
    }
    else {
      return false;

    }
  }
//\\ ======================== // Rolebased Validation // ======================== //\\




//\\ ======================== // Rolebased Validation // ======================== //\\
childvalidaterolebased() {
  if (this.rolewisepermissions.length > 0) {
    let validationStatus = true;

    for (let i = 0; i < this.rolewisepermissions.length; i++) {

      let roleName = this.rolewisepermissions[i].roleName;
      let permission = this.rolewisepermissions[i].permission;
      let rolechecked = this.rolewisepermissions[i].checked;


      
      if ((rolechecked == true) && (!this.vldChkLst.selectDropdown(permission,this.messaageslist.chkrolepermission))) {

      
        validationStatus = false;
        break;

      }


    }

    return validationStatus;
  }
  else {
    return false;

  }
}
//\\ ======================== // Rolebased Validation // ======================== //\\



//\\ ======================== // Reset Form // ======================== //\\
  resetform() {
    this.folderId = '';
    this.selParentFolderName = '0';
    this.txtFolderName = '';
    this.rdoPermissiontype = '0';
    this.txtAllowSize = '';
    this.selSizeType = '0';
    this.selDepartmentName = 'Select';
    this.userslist = [];
    this.rolelist = [];
    this.txtAllowFileSize='';
    this.selFileSizeType='0';
   //this.getRole(this.selDepartmentName)
   this.rolelist=[]
  }
//\\ ======================== // Reset Form // ======================== //\\


//\\ ======================== // Createing New Folder // ======================== //\\

crateFolder() {
    this.selectroleList = [];
    let parentfolder = this.selParentFolderName;
    let foldername = this.txtFolderName;
    let permissiontype = this.rdoPermissiontype;
    let allowSize = this.txtAllowSize;
    let sizeType = this.selSizeType;
    let department = this.selDepartmentName;
    let allowfileSize = this.txtAllowFileSize;
    let sizefileType = this.selFileSizeType;
 

    for (let i = 0; i < this.rolelist.length; i++) {




      if (this.rolelist[i].checked == true) {

        let obj: any = {};
        obj['roleName'] = this.rolelist[i].roleName;
        obj['roleId'] = this.rolelist[i].roleId;

        obj['permission'] = this.rolelist[i].permission;
        obj['checked'] = this.rolelist[i].checked;
        obj['deptId'] = this.selDepartmentName;
        this.selectroleList.push(obj);

      }

    }

      const specialChars = /[`!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/;

   
    //  return specialChars.test(str);
    if(/^\s/.test(foldername)){
      foldername=foldername.trimStart();
      //console.log(foldername);
    }
    if (!this.vldChkLst.selectDropdown(parentfolder,this.commonserveice.langReplace(this.messaageslist.parentfolder),'parentFId')) {
     // document.getElementById('parentFId')?.focus();
    }
    else if (!this.vldChkLst.blankCheck(foldername,this.commonserveice.langReplace(this.messaageslist.foldername),'txtfoldername')) {
   }
    else if (specialChars.test(foldername)) {
      this.commonserveice.swalfire('error',this.commonserveice.langReplace('Special Char Not allowed in foldername'))
   
    }

    else if (!this.vldChkLst.blankCheck(allowSize,this.commonserveice.langReplace(this.messaageslist.allowsize),'foldersize')) {
    }
        else if ((allowSize != '') && (!this.vldChkLst.selectDropdown(sizeType,this.commonserveice.langReplace(this.messaageslist.allowsizeType),'foldersizetype'))) {
    
         }
         else if (!this.vldChkLst.blankCheck(allowfileSize,this.commonserveice.langReplace(this.messaageslist.allowfileSize),'allowfilesizesize')) {
        }
            else if ((allowfileSize != '') && (!this.vldChkLst.selectDropdown(sizefileType,this.commonserveice.langReplace(this.messaageslist.allowfilesizeType),'allowfilesizesizetype'))) {
        
             }


           
   else if (department =="Select") {
    this.commonserveice.swalfire('error',this.commonserveice.langReplace('Select '+this.messaageslist.selectdepartment))
             }
             
    else if (!this.vldChkLst.blankCheck(permissiontype,this.commonserveice.langReplace(this.messaageslist.permisstionType))) {
    }

  
    else if ((parentfolder == 1) && (this.selectroleList.length == 0)) {
      this.commonserveice.swalfire('error',this.commonserveice.langReplace(this.messaageslist.selectRole))
   
    }
    else if ((parentfolder == 1) && (!this.validaterolebased())) {
 }
//     else if ((parentfolder == 1) && (permissiontype == '2') && (this.userslist.length == 0)) {
//       Swal.fire({
//         icon: 'error',
//         text: this.messaageslist.selectuser,
//       });

//     }
//     else if ((parentfolder == 1) && (permissiontype == '2') && (!this.validateuserbased())) {

//  }


    else {

      let permissionArr: any = [];
      let obj: any = {};
      if(parentfolder > 1){
      
        obj['rolebased'] =  this.rolewisepermissions;
        obj['userbased'] = [];
      }else{
        obj['rolebased'] = this.selectroleList;
         obj['userbased'] = [];
      }
     

      permissionArr.push(obj);


      let forlderParams = {
        "folderId": this.folderId,
        "parentFolderId": parentfolder,
        "folderName": foldername.trim(),
        "folderPermission": permissionArr,
        "allowedSize": allowSize,
        "allowedSizeType": sizeType,
        "allowedFileSize": allowfileSize,
        "allowedFileSizeType": sizefileType,
        "deptId": department,
        "retentionDate": '',
        "archieveDate": ''
      }

      this.commonserveice.createFolders(forlderParams).subscribe({
        next: (response) => {
          let respData = response.RESPONSE_DATA;
          let respToken = response.RESPONSE_TOKEN;
          //let verifyToken = CryptoJS.HmacSHA256(letterParams, environment.apiHashingKey).toString();
          let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
          if(respToken == verifyToken){
            let res:any = Buffer.from(respData,'base64'); 
            let responseResult= JSON.parse(res)
        
        
                if (responseResult.status == 200) {
                  Swal.fire({
        
                    text: this.commonserveice.langReplace(this.messaageslist.successMsg),
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Ok'
                  }).then((result) => {
        
                    this.getFolders();
                    this.resetform();
                    this.route.navigateByUrl('/admin/newfolder')
                    window.location.reload()
                    //this.getFolders()
                  })
        
        
        
                }
                else if (responseResult.status == 202) {
        
        
                  Swal.fire({
        
                    text: this.commonserveice.langReplace(this.messaageslist.updatesuccessMsg),
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Ok'
                  }).then((result) => {
        
                    this.getFolders();
                    this.resetform();
                    window.location.reload()
                    this.route.navigateByUrl('/admin/newfolder');
                   
                  })
        
        
        
                }
                else if(responseResult.status == 400){
                  this.commonserveice.swalfire('error',this.commonserveice.langReplace(responseResult.message))
                  
               
        
              
                 }
                 else if(responseResult.status == 401){
        
                  this.commonserveice.swalfire('error',this.commonserveice.langReplace(responseResult.message))
               
        
              
                 }
                 else if(responseResult.status==501){
                
                  this.authService.directlogout();
                }
               else{
                this.commonserveice.swalfire('error',this.commonserveice.langReplace(environment.somethingWrong ))
        
        
               }
          }
          else{
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
  //\\ ======================== // Createing New Folder // ======================== //\\

  onItemSelect(item: any) {
   
    this.userslist = this.selectedItems;
   
  }
  OnItemDeSelect(item: any) {
   
    this.userslist = this.selectedItems;
   
  }
  onSelectAll(items: any) {
    
    this.userslist = this.selectedItems;
   
  }
  onDeSelectAll(items: any) {
   
    this.userslist = this.selectedItems;
   
  }

  


//\\ ======================== // Edit Folder // ======================== //\\
  gotoEdit(fldrId: any) {
    //this.resetform();

   
    this.folderId = fldrId;
    let dataParam = {
      "folderId": this.folderId,
    };
    this.loading=true;
    this.commonserveice.getFoldersSingle(dataParam).subscribe({
      next: (response) => {
        let respData = response.RESPONSE_DATA;
        let respToken = response.RESPONSE_TOKEN;
  
        let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
        if(respToken == verifyToken){
          let res:any = Buffer.from(respData,'base64'); 
          let responseResult= JSON.parse(res)
      
      
            if (responseResult.status == '200') {
            
              let folderDetails = responseResult.result;
      
      //console.log(folderDetails)
              this.selParentFolderName = folderDetails[0].parentFolderId;
              this.txtFolderName = folderDetails[0].folderName;
              this.selSizeType = folderDetails[0].folderSizeType;
              this.txtAllowSize = Math.round(folderDetails[0].folderSize);
              this.txtAllowFileSize=Math.round(folderDetails[0].allowedFileSize);
              this.selFileSizeType= folderDetails[0].allowedFileSizeType;
      
              // this.selDepartmentName= folderDetails[0].departmentId;
               this.txtDepartmentName=folderDetails[0].departmentName;
               this.selDepartmentName=folderDetails[0].departmentId ? folderDetails[0].departmentId : '0';
              // console.log(folderDetails[0]);
              // this.selDepartmentName=2;
              let permissions = folderDetails[0].folderPermission;
              let permissiondata = permissions[0];
             
             // console.log(permissiondata)
      
      if(this.selParentFolderName == 1){
              setTimeout(() => {
              let selectIfElement: any = document.getElementById("seldept");
              let selparentFolder: any = document.getElementById("parentFId");
              if (selparentFolder != null || selparentFolder != undefined) {
                selparentFolder.dispatchEvent( new Event("change"));
              }
              if (selectIfElement != null || selectIfElement != undefined) {
                selectIfElement.dispatchEvent( new Event("change"));
              }
              },500)
        //alert(this.selParentFolderName)
      
      
      if (permissiondata.rolebased.length > 0) {
        this.rdoPermissiontype = "1";
        setTimeout(() => {
         // alert(1);
         let rolebased = permissiondata.rolebased;
       
                let selectIfElement: any = document.getElementById("rdoPermissiontype" + this.rdoPermissiontype);
      
      
                  if (selectIfElement != null || selectIfElement != undefined) {
                    selectIfElement.dispatchEvent(
                      new Event("click")
      
                    );
                  }
      
               setTimeout(() => {
      
                    let roleMap: any = {
                      get(roleId: any): any {
                        return this[roleId];
                      },
                      set(rolesList: any) {
                        this[rolesList.roleId] = rolesList;
                      }
                    };
      
      
                    rolebased.forEach((rolesList: any) => {
                      roleMap.set(rolesList);
                    });
      
   
                    this.rolelist.forEach((rolesList: any,i:any) => {
                     
                      if (roleMap.get(rolesList.roleId) && (rolesList.roleId == roleMap.get(rolesList.roleId).roleId)) {
                        rolesList.checked = roleMap.get(rolesList.roleId).checked;
                        
                        rolesList.permission = roleMap.get(rolesList.roleId).permission;
                       
                      }
                      setTimeout(() => {
                      let totalCheckbox:any = document.querySelectorAll('#rolerow_'+i+' .permissionChk').length;
                        let totalChecked:any = document.querySelectorAll('#rolerow_'+i+' .permissionChk:checked').length;
                    
                        if(totalCheckbox == totalChecked) {
                        
                          $('#rolerow_'+i).find('.roleselectAll').prop('checked',true);
                        }
                      },1000);
                    });
                    this.loading=false;
                   
                  }, 1000);
      
                
                 
                
              
              
              
             
                  
        },1500)
      }
      else {
        this.loading=false;
      }
      }
      else{
               setTimeout(() => {
        let selectFolderIfElement: any = document.getElementById("parentFId");
        if (selectFolderIfElement != null || selectFolderIfElement != undefined) {
          selectFolderIfElement.dispatchEvent(
            new Event("change")
      
      
          );
        }
      
          },500)
        this.loading=false;
      }
      
      }
      else if(responseResult.status==501){
              
        this.authService.directlogout();
      }
            else {
               this.loading=false;
               this.commonserveice.swalfire('error',this.commonserveice.langReplace(environment.somethingWrong ))
              
      
            }
        }
        else{
          this.loading = false;
          this.authService.directlogout();
        }
  
      },
      error: (msg) => {
        this.authService.directlogout();
     }
   })
   



  }
//\\ ======================== // Edit Folder // ======================== //\\

//\\ ======================== // Type of views // ======================== //\\
  tableview() { this.dataviewtype=1;}
  boxview(){this.dataviewtype=2;}
//\\ ======================== // Type of views // ======================== //\\
//\\ ======================== // Delete Folder // ======================== //\\
  delete(fid:any){
    let formParams = {
      "folderId":fid,
      "deleteConfirmation":1
  };
  
      Swal.fire({
        title: this.commonserveice.langReplace('Are you sure')+' ?',
        text:  this.messaageslist.warningtype,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: this.commonserveice.langReplace('Yes')+','+this.commonserveice.langReplace( 'delete it')+' !'
      }).then((result:any) => {
  
        if (result.isConfirmed) {
          this.commonserveice.deleteFolder(formParams).subscribe({
            next: (response) => {
              let respData = response.RESPONSE_DATA;
              let respToken = response.RESPONSE_TOKEN;
  
              let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
              if(respToken == verifyToken){
               
              let res:any = Buffer.from(respData,'base64'); 
              let responseResult= JSON.parse(res)
            if(responseResult.status==200){
  
            

            Swal.fire(

              this.commonserveice.langReplace('Deleted')+'!',
                this.commonserveice.langReplace(this.messaageslist.deleteMsg),
                'success'
              )
              window.location.reload()
              this.getFolders()
              
            }
            else if(responseResult.status==501){
          
              this.authService.directlogout();
            }
           else{
            this.commonserveice.swalfire('error',this.commonserveice.langReplace(environment.somethingWrong ))
    
           }
              }
              else{
                this.loading = false;
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

//\\ ======================== // Delete Folder // ======================== //\\

 //\\ ======================== // get Folders Permissions// ======================== //\\
 getPermissions(e:any){
  this.userwisepermissions=[];
  this.rolewisepermissions=[];

   let folderid:any=e.target.value;
  let dataParam = {
    "folderId": folderid,
    };
    this.commonserveice.getFolders(dataParam).subscribe({
      next: (response) => {
        let respData = response.RESPONSE_DATA;
        let respToken = response.RESPONSE_TOKEN;
        let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
        if(respToken == verifyToken){
          let res:any = Buffer.from(respData,'base64'); 
          let responseResult= JSON.parse(res)
           
          
            if(responseResult.status == '200'){
              this.permissionlist=responseResult.result;
           console.log(this.permissionlist)
              if(this.permissionlist.length > 0){
                this.folderSizeType=this.permissionlist[0].folderSizeType;
                this.parentSizeinKb =this.permissionlist[0].parentSizeinKb;
                 this.childSizeInKb=this.permissionlist[0].childSizeInKb ;
        
        this.txtDepartmentName=this.permissionlist[0].departmentName;
        if(folderid>1){
          this.selDepartmentName=this.permissionlist[0].departmentId ? this.permissionlist[0].departmentId : 'Select';
        }
        
                let foldrpermissions:any=JSON.parse(this.permissionlist[0].folderPermission)
                let rolewisepermissions=foldrpermissions[0].rolebased;
                let userwisepermissions=foldrpermissions[0].userbased;
        
                for (let i = 0; i < rolewisepermissions.length; i++) {
                  let obj: any = {};
                  obj['roleName'] = rolewisepermissions[i].roleName;
                  obj['roleId'] = rolewisepermissions[i].roleId;
                  obj['checked'] = rolewisepermissions[i].checked;
                  obj['permission'] = rolewisepermissions[i].permission;
                  obj['deptId'] = this.selDepartmentName;
                  this.rolewisepermissions.push(obj);
                  
                  setTimeout(() => {
                    let totalCheckbox:any = document.querySelectorAll('#rolerow_'+i+' .permissionChk').length;
                      let totalChecked:any = document.querySelectorAll('#rolerow_'+i+' .permissionChk:checked').length;
                  
                      if(totalCheckbox == totalChecked) {
                      
                        $('#rolerow_'+i).find('.roleselectAll').prop('checked',true);
                      }
                    },1000);
      
      
      
                }
        
              
        
                
              }
        
            }
            else if(responseResult.status==501){
                
              this.authService.directlogout();
            }
          else{
            this.commonserveice.swalfire('error',this.commonserveice.langReplace(environment.somethingWrong ))
          }
        }
        else{
          this.loading = false;
          this.authService.directlogout();
        }
       
      },
      error: (msg) => {
        this.authService.directlogout();
     }
   })

    


}
//\\ ======================== // get Folders // ======================== //\\
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
// getRowClass(event:any) {
//   console.log(event);
//   if (event.class) {
//     if (event.class == 'child-row-file')
//       return {
//         'child-row-file': true,
//       };
//   }
// }



updateFilter(event:any) {
  const val = event.target.value.toLowerCase();

  // filter our data
  const temp = this.temp.filter(function (d:any) {
    return d.folderName.toLowerCase().indexOf(val) !== -1 || !val;
  });

  // update the rows
  this.rows = temp;
  // Whenever the filter changes, always go back to the first page
  this.table.offset = 0;
}

clickCheck(folderid:any){
 // alert(folderid)
}


    //\\ ======================== // Get file Type // ======================== //\\
    formatBytes(bytes: any, decimals: any) {
      if (!+bytes) return '0 Bytes'
  
      const k = 1024
      const dm = decimals < 0 ? 0 : decimals
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  
      const i = Math.floor(Math.log(bytes) / Math.log(k))
  
      return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
    }
  //\\ ======================== // Get file Type // ======================== //\\



  }

 


