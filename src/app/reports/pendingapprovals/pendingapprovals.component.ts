// =============================================================================
// File Name		              : pendingapprovals.component.ts
// Description 	              : This page dispalys Pending approval list
// Created by                 : Bikash Kumar Panda
// Created on                 : 09-Jun-2023
// Designed by                : Bikash Kumar Panda
// Designed on                : 09-Jun-2023
// Developed by               : Bikash Kumar Panda
// Developed on               : 09-Jun-2023
// Style sheet                : pendingapprovals.component.scss

// Used Function              : this.loadconfig(), this.viewsearchQuery(), this.loadChart(this.finalobj)
// =============================================================================

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonServicesService } from '../../services/common-services.service';
import { EncrypyDecrpyService } from '../../services/encrypy-decrpy.service';
import Swal from 'sweetalert2';
import { AuthenticationService } from '../../services/authentication.service';
import * as Highcharts from 'highcharts';
import * as CryptoJS from 'crypto-js';
import {Buffer} from 'buffer';
import { environment } from 'src/environments/environment';
import { ReportsService } from 'src/app/services/reports.service';
import { DatePipe } from '@angular/common';
import * as XLSX from 'xlsx-js-style';

@Component({
  selector: 'app-pendingapprovals',
  templateUrl: './pendingapprovals.component.html',
  styleUrls: ['./pendingapprovals.component.scss']
})
export class PendingapprovalsComponent implements OnInit {
  @ViewChild("table1") table: ElementRef;

  title:any;
  tablist:any;
  utillist:any;
  messaageslist:any;
  jsonurl="assets/js/_configs/viewApprovalListRpt.config.json";

  letterID:any="";
  queryList:any=[];
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  pageSizes = [10, 20, 50,100,500,1000];
  searchstatus:any;
  txtTodate:any="";
   txtFromdate:any="";
   txtUserName:any=0;
  loading:any=false;
  selType:any=1;
  selBasedon:any=0;
  selGraphType:any=0;
  sortDir = 1;//1= 'ASE' -1= DSC
  sortOrder: string = 'asc';
  sortColumn: string = 'ticker';
  userList:any;
  userFullName:any;
  tablecollist=[
    {"name":"Document No","cname":"fileRefNo","sortable":true },
    {"name":"Folder Name","cname":"folderName","sortable":true },
    {"name":"Name","cname":"fileName","sortable":true },
    {"name":"Size","cname":"fileSize","sortable":true },
   
    {"name":"Created By","cname":"createdByName","sortable":true },
    {"name":"Pending At","cname":"pendingAtName","sortable":true },
    {"name":"Pending On","cname":"pendingOn","sortable":true },
  ]
  Highcharts = Highcharts;
chartOptions: any='';

  constructor(
    private route: Router,
     private httpClient: HttpClient,
    public reportService:ReportsService,
    public encDec:EncrypyDecrpyService,
    public authService:AuthenticationService,
    public commonserveice:CommonServicesService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.loadconfig();
    this.loadData(1,this.selBasedon,this.txtUserName,this.txtFromdate,this.txtTodate,this.selGraphType)
    this.loadusers('')
   
  }
  
  loadconfig(){
    this.httpClient.get<any>(this.jsonurl).subscribe((data:any)=>
     {
      this.tablist=data[0].tabList;
      this.utillist=data[0].utils
      this.messaageslist=data[0].messages; 
      this.title = data[0].pagetitle;
     },
     (error:any) =>{
       Swal.fire({
         icon: 'error',
         text: error
       });
     })
   }
 

loadData(type:any,basedon:any,user:any,fromdate:any,todate:any,graphtype:any){
  this.queryList=[];
  let dataParam = {
"type":type,
"basedon":basedon,
"userId":user,
"fromDate":fromdate,
"toDate":todate
};


  this.loading=true
this.reportService.rptApprovalList(dataParam).subscribe((response:any) => {
let respData = response.RESPONSE_DATA;
let respToken = response.RESPONSE_TOKEN;

let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
if(respToken == verifyToken){
  let res:any = Buffer.from(respData,'base64'); 
let responseResult = JSON.parse(res)
 
  if (responseResult.status == 200) {
    this.loading=false;
  this.queryList = responseResult.result;
console.log(this.queryList)
  
   if(type == 2){

    this.loadChart(this.queryList,graphtype,basedon);
   }


   

  }
  else if (responseResult.status == 400) {
    this.loading=false;
  }
  else if(responseResult.status==501){
      
    this.authService.directlogout();
  }
  else{
    this.loading=false;
    Swal.fire({
      icon: 'error',
      text: this.commonserveice.langReplace(environment.somethingWrong)
    });
  }
}
else{
  this.loading = false;
  Swal.fire({
    icon: 'error',
    text:this.commonserveice.langReplace(environment.invalidResponse)

  });
}


},
(error:any) =>{
this.loading=false;
Swal.fire({
  icon: 'error',
  text:this.commonserveice.langReplace(environment.errorApiResponse)
});
})
}


searchdata(type:any,basedon:any,user:any,fromdate:any,todate:any,graphtype:any){
  if(fromdate=='' && todate){
    Swal.fire({
      icon: 'error',
      text: this.commonserveice.langReplace("Select From Date"),
  
    });
  
  }
  else if(fromdate && todate==''){
  Swal.fire({
    icon: 'error',
    text: this.commonserveice.langReplace("Select To Date"),

  });

}
else if(type==2 && basedon==0){
  Swal.fire({
    icon: 'error',
    text: this.commonserveice.langReplace("Select Based On"),

  });

}
else if(type==2 && graphtype==0){
  Swal.fire({
    icon: 'error',
    text: this.commonserveice.langReplace("Select Graph Type"),

  });

}
else{
  this.searchstatus=1;
  this.loadData(type,basedon,user,fromdate,todate,graphtype)
this.page=1;
  if(user > 0){
    this.loaduserbyId(user) 
  }
 
}
 

}



onSortClick(name: any, event: any) {

  let target = event.currentTarget,
    classList = target.classList;


  if (classList.contains('bi-arrow-up')) {
    classList.remove('bi-arrow-up');
    classList.add('bi-arrow-down');
    this.sortDir = -1;
  } else {
    classList.add('bi-arrow-up');
    classList.remove('bi-arrow-down');
    this.sortDir = 1;
  }
  this.sortArr(name);

  //this.sortArr('departmentName');
}

sortArr(colName: any) {

  this.sortColumn = colName;
  if (this.sortOrder == 'asc') {
    this.sortOrder = 'desc';
  }
  else {
    this.sortOrder = 'asc';
  }

  this.queryList = this.queryList.sort((a: any, b: any) => {
   
    if(this.sortOrder == 'asc'){
      return a[colName].localeCompare(b[colName], 'en', { numeric: true });
    }
    else{
      return b[colName].localeCompare(a[colName], 'en', { numeric: true });
    }
 
  })






}

  //\\ ======================== // Data sorting // ======================== //\\
  formatBytes(bytes:any, decimals:any) {
    if (!+bytes) return '0 Bytes'
  
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  
    const i = Math.floor(Math.log(bytes) / Math.log(k))
  
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
  }
    //\\ ======================== // Get file Type // ======================== //\\
    getfiletype(filename:any){
  
      let icon:any;
      let iconsGroups:any=environment.iconsGroups;
       for(let i=0;i<iconsGroups.length;i++){
       let filetype:any= iconsGroups[i].groups.includes(filename);
         if(filetype==true){
           icon=iconsGroups[i].name;
         }
        
       }
     return icon;
   
   }
   //\\ ======================== // Get file Type // ======================== //\\
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
 resetform(){
  this.txtTodate="";
  this.txtFromdate="";
  this.txtUserName=0;

  this.selType=1;
  this.selBasedon=0;
  this.selGraphType=0;
  this.searchstatus=0
 }

 basedonChange(){
  this.txtFromdate='';
  this.txtTodate='';
  this.selGraphType=0
 }
 tableview(type:any){
  this.resetform()
  this.selType=type;
  this.loadData(1,this.selBasedon,this.txtUserName,this.txtFromdate,this.txtTodate,this.selGraphType)
 }
//\\ ======================== // Load User List // ======================== //\\ 
loadusers(userId:any) {
  this.loading=true;
  let dataParam = {
    "userId": userId,
    "fileId":''
  };
  this.reportService.getUserlist(dataParam).subscribe((response: any) => {
    let respData = response.RESPONSE_DATA;
    let respToken = response.RESPONSE_TOKEN;

    let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
    if(respToken == verifyToken){
     let res:any = Buffer.from(respData,'base64'); 
     let responseResult = JSON.parse(res)

     if (responseResult.status == 200) {

       this.loading=false;
       this.userList = responseResult.result;
    
 //    console.log(this.userList) 

     }
     if (responseResult.status == 400) {
       this.loading=false;
       this.userList = responseResult.result;
     }
     if (responseResult.status == 500) {
      this.loading=false;
      this.userList = responseResult.result;
    }
    else if(responseResult.status==501){
        
      this.authService.directlogout();
    }
    else{
      this.loading=false;
     
    }
    }
    else{
      this.loading = false;
      this.authService.directlogout();
    }



  },
  (error:any) =>{
   this.loading=false;
   this.authService.directlogout();
  })

}
//\\ ======================== // Load User List // ======================== //\\ 
//\\ ======================== // Load User List // ======================== //\\ 
loaduserbyId(userId:any) {
  this.loading=true;
  let dataParam = {
    "userId": userId,
    
  };
  this.reportService.getUserDetails(dataParam).subscribe((response: any) => {
    let respData = response.RESPONSE_DATA;
    let respToken = response.RESPONSE_TOKEN;

    let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
    if(respToken == verifyToken){
     let res:any = Buffer.from(respData,'base64'); 
     let responseResult = JSON.parse(res)

     if (responseResult.status == 200) {

       this.loading=false;
       let userlist:any = responseResult.result;
    this.userFullName=userlist.userFullName
 //    console.log(this.userList) 

     }
     if (responseResult.status == 400) {
       this.loading=false;
       this.userList = responseResult.result;
     }
     if (responseResult.status == 500) {
      this.loading=false;
      this.userList = responseResult.result;
    }
    else if(responseResult.status==501){
        
      this.authService.directlogout();
    }
    else{
      this.loading=false;
     
    }
    }
    else{
      this.loading = false;
      this.authService.directlogout();
    }



  },
  (error:any) =>{
   this.loading=false;
   this.authService.directlogout();
  })

}
//\\ ======================== // Load User List // ======================== //\\ 
//\\ ======================== // Load Search chart // ======================== //\\
loadChart(queryList:any,graphtype:any,basedon:any){
 
let chartType:any;

if(graphtype==1){
  this.loadbarchart(queryList,basedon,'bar')
}
else if(graphtype==2){
  this.loadbarchart(queryList,basedon,'column')
}
else if(graphtype==3){ 
  this.loadbarchart(queryList,basedon,'line')

}

  
  }
   //\\ ======================== // Load Search chart // ======================== //\\

loadbarchart(queryList:any,basedon:any,graphtype:any){

  let qlist:any=[];
  let dataseries:any=[];
  let seriescategory:any=[];
  let allDates :any;
  let dataitemarray:any=[];
  let dataitemarray2:any=[];

  let lablealign:any;

  if(graphtype== 'bar'){
    lablealign='right'
  }
  else{
    lablealign='center'
  }

  if(basedon == 2){

    allDates = this.getDatesBetween(this.txtFromdate, this.txtTodate);
    qlist=queryList.chartData;
      const groups = qlist.reduce((groups:any, dates:any) => {
        const date = dates.pendingAt.split('T')[0];
        if (!groups[date]) {
          groups[date] = [];
        }
        groups[date].push(dates);
        return groups;
      }, {});
      
      // Edit: to add it in the array format instead
      const groupArrays = Object.keys(groups).map((date) => {
        return {
          date,
          pendingListItems: groups[date]
        };
      });
      seriescategory=allDates;

        for(let j=0;j<groupArrays.length;j++){

      
          

              for(let i=0;i<seriescategory.length;i++){

                dataitemarray.push(i)
          //          for(let z=0;z < qlist.length;z++){
                  

          //        if((seriescategory[i] == this.datePipe.transform(qlist[z].stmCreatedOn, 'dd-MM-yyyy')) ){

          //         let obj: any = [];
                
          //         obj[seriescategory[i]] = qlist[z].totalCount;
          //         // dataseries.push(obj)
                  
                  
          //     dataitemarray2.push(obj)
          //  }
          //   else{
          //     let obj: any = [];
                
          //     obj[seriescategory[i]] = 0;
          //     // dataseries.push(obj)
              
              
          // dataitemarray2.push(obj)
          //   }

            
          //     }
             
          
           


           
         }




        
          let obj: any = [];
          obj['name'] = groupArrays[j].date;
          obj['data'] = dataitemarray;
          dataseries.push(obj)
          dataitemarray=[];
        }


  
  
console.log(qlist)

  dataitemarray=[];
  console.log(dataseries)




   
   
      


  }
  else{
    qlist=queryList.chartData;
  
    for(let i=0;i<qlist.length;i++){
      let obj: any = [];
      obj[0] = qlist[i].pendingAt;
      obj[1] = qlist[i].totalCount;
      dataseries.push(obj)
       
       seriescategory.push(qlist[i].pendingAt)
        }
  }
 let seriestypeOne:any= [
          {
            
              name: 'Pending Applications',
          
              colorByPoint: true,
              data:dataseries,
              
      dataLabels: {
        enabled: true,
        rotation: 0,
        color: '#FFFFFF',
        align:lablealign,
        format: '{point.y}', // one decimal
        y: 3, // 10 pixels down from the top
        style: {
          fontSize: '12px',
          fontFamily: 'Verdana, sans-serif'
        }
      }
          }
      ]
  
  this.loading=true;
  
  setTimeout(()=>{ 
    this.loading=false;
    this.chartOptions = {
    chart: {
      type:graphtype,
     
    },
    colors: [
      '#0a9eaa','#1f88b7','#277dbd','#1693b1','#533be1','#5b30e7', '#3e5ccf','#9b20d9',  '#861ec9', '#691af3' ],
    title: {
      text: ''
    },
    subtitle: {
      text: ''
    },
    xAxis: {
      type: 'category',
     
      categories:seriescategory,
      crosshair: true,
     
                  tickLength: 1,
                  lineWidth: 1,
                  minorGridLineWidth:1,
                   gridLineColor: '#dedede',
                  gridLineWidth: 1,
                 
    },
    yAxis: {
     tickInterval: 1,
                  gridLineWidth: 1,
                  lineWidth: 1,
                  lineColor: '#dedede',
                  
                  
      min: 0,
      title: {
        text: ''
      }
    },
    tooltip: {
      headerFormat: '<span style="">{point.key}</span><table>',
      pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"> <b>{point.y} </b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true
    },
      credits: {
          enabled: false,
      },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0
      }
    },
    series:basedon ==2 ?  dataseries : seriestypeOne
   
  
  }
  },2000)



}


getDatesBetween(startDate:any, endDate:any) {
  let currentDate:any =  new Date(startDate);
  let endAssignDate:any = new Date(endDate);
 
  let dates:any = [];
  while (currentDate <= endAssignDate) {
    dates.push( this.datePipe.transform(currentDate, 'dd-MM-yyyy') );
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return dates;
}

excelDownloadPendingApprovalList() {
  //alert();
  const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(
    this.table.nativeElement
  );

  for (var i in ws) {
    console.log(ws[i]);
    if (typeof ws[i] != 'object') continue;
    let cell = XLSX.utils.decode_cell(i);

    ws[i].s = {
      // styling for all cells
      font: {
        name: 'arial',
     
      },
      alignment: {
        vertical: 'top',
        horizontal: 'left',
        wrapText: true
      },
      border: {
        right: {
          style: 'thin',
          color: '000000',
        },
        top: {
          style: 'thin',
          color: '000000',
        },
        left: {
          style: 'thin',
          color: '000000',
        },
        bottom: {
          style: 'thin',
          color: '000000',
        },
      },
    };

    

    if (cell.r == 0) {
       ws[i].s={
        font: {
          bold:true
         },
         border: {
          right: {
            style: 'thin',
            color: '000000',
          },
          top: {
            style: 'thin',
            color: '000000',
          },
          left: {
            style: 'thin',
            color: '000000',
          },
          bottom: {
            style: 'thin',
            color: '000000',
          },
        },
       }
      // first row
      ws[i].s.fill = {
        // background color
       
        patternType: 'solid',
       
        fgColor: { rgb: 'ffea83' },
        bgColor: { rgb: 'ffea83' },
      };
    }

    
  }
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  var fmt = "@";
  wb.Sheets["Sheet1"]["F"] = fmt;

  /* save to file */
  XLSX.writeFile(wb, "Pending-Approval-List.xlsx");
}

}
