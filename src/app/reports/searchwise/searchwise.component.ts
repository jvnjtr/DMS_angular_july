// =============================================================================
// File Name		              : searchreport.component.ts
// Description 	              : This page dispalys key based search details
// Created by                 : Bikash Kumar Panda
// Created on                 : 10-May-2023
// Designed by                : Bikash Kumar Panda
// Designed on                : 10-May-2023
// Developed by               : Bikash Kumar Panda
// Developed on               : 10-May-2023
// Style sheet                : searchreport.component.scss

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
import * as XLSX from 'xlsx-js-style';

@Component({
  selector: 'app-searchwise',
  templateUrl: './searchwise.component.html',
  styleUrls: ['./searchwise.component.scss']
})
export class SearchwiseComponent implements OnInit {
  @ViewChild("table1") table: ElementRef;
 
  title:any;
  tablist:any;
  utillist:any;
  messaageslist:any;
  jsonurl="assets/js/_configs/viewSearchReport.config.json";

  letterID:any="";
  queryList:any=[];
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  pageSizes = [10, 20, 50,100,500,1000];

mettypelist:any=['-','String','Date','Intiger']
txtSearch:any;
searchColList:any=["Meta Name","Description","Type","Created By"]
searchselcteditems:any=[];
@ViewChild("searchField") searchField: ElementRef;
namesarray:any=[];
Descriptionarray:any=[];
filesizearray:any=[];
typearray:any=[];
createdbyarray:any=[];
finalarray:any=[];
finalobj: any = {
  'Meta Name':this.namesarray,
  'Description':this.Descriptionarray,
  'Type':this.typearray,
  'Createdby':this.createdbyarray
}; 
loading:any=false;
Highcharts = Highcharts;
chartOptions: any='';
sortDir = 1;//1= 'ASE' -1= DSC
sortOrder: string = 'asc';
sortColumn: string = 'ticker';

tablecollist=[
  {"name":"Keyword Type","cname":"SearchedKeyWord","sortable":true },
    {"name":"No of Searches","cname":"totalCount","sortable":true },
    {"name":"Last Search on","cname":"createdOn","sortable":true },
  {"name":"Result","cname":"fileType","sortable":false },


]

  constructor(
    private route: Router,
     private httpClient: HttpClient,
    public reportService:ReportsService,
    public encDec:EncrypyDecrpyService,
    public authService:AuthenticationService,
    public commonserveice:CommonServicesService
  ) { }

  ngOnInit(): void {
    this.loadconfig();
    this.viewsearchQuery();

  }
  
  loadconfig(){
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





   //\\ ======================== // get Search details // ======================== //\\
viewsearchQuery(){


 
  let dataParam = {};
    this.loading=true;
    this.reportService.searchQueryResult(dataParam).subscribe({
      next: (response) => {
        let respData = response.RESPONSE_DATA;
        let respToken = response.RESPONSE_TOKEN;
      
        let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
        if(respToken == verifyToken){
          let res:any = Buffer.from(respData,'base64'); 
        let responseResult = JSON.parse(res)
         
          if (responseResult.status == 200) {
            this.loading=false;
          this.queryList = responseResult.result;
          //console.log(this.queryList)
            this.loadChart(this.queryList);
          }
          else if (responseResult.status == 400) {
            this.loading=false;
          }
          else if(responseResult.status==501){
              
            this.authService.directlogout();
          }
          else{
            this.loading=false;
            this.commonserveice.swalfire('error',this.commonserveice.langReplace(environment.somethingWrong))
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
 //\\ ======================== // get Search details // ======================== //\\

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
 //\\ ======================== // Load Search chart // ======================== //\\
loadChart(queryList:any){
let qlist:any=[];
let dataseries:any=[];
let seriescategory:any=[];
qlist=queryList;



 for(let i=0;i<qlist.length;i++){
   if(i<10){
  let obj: any = [];
  obj[0] = qlist[i].SearchedKeyWord;
 obj[1] = qlist[i].totalCount;
 dataseries.push(obj)
    seriescategory.push(qlist[i].SearchedKeyWord)
   }
  
 }

this.loading=true;

setTimeout(()=>{ 
  this.loading=false;
  this.chartOptions = {
  chart: {
    type: 'column'
  },
  title: {
    text: ''
  },
  subtitle: {
    text: ''
  },
  xAxis: {
    type: 'category',
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
  series: [
        {
          
            name: 'No. of Search ',
            colors: [ '#36a2eb', '#ffce56', '#4bc0c0', '#9966ff', '#ff6384', '#ff9f40', '#2dff49', '#ff2dd0', '#2deaff', '#691af3'],
            colorByPoint: true,
            data:dataseries,
            
    dataLabels: {
      enabled: true,
      rotation: 0,
      color: '#FFFFFF',
      align: 'center',
      format: '{point.y}', // one decimal
      y: 0, // 10 pixels down from the top
      style: {
        fontSize: '12px',
        fontFamily: 'Verdana, sans-serif'
      }
    }
        }
    ]

}
},500)
}
 //\\ ======================== // Load Search chart // ======================== //\\
   //\\ ======================== // Data sorting // ======================== //\\




  
    //\\ ======================== // Data sorting // ======================== //\\
    excelDownloadSearchReportList() {
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
            horizontal: 'Left',
            wrapText: true
          },
          border: {
            right: {
              style: 'thin',
              color: '000000',
            },
            left: {
              style: 'thin',
              color: '000000',
            },
          },
        };
  
        
  
        if (cell.r == 0) {
          // first row
          ws[i].s.fill = {
            // background color
            patternType: 'solid',
            fgColor: { rgb: 'b2b2b2' },
            bgColor: { rgb: 'b2b2b2' },
          };
        }
  
        
      }
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
      var fmt = "@";
      wb.Sheets["Sheet1"]["F"] = fmt;
  
      /* save to file */
      XLSX.writeFile(wb, "Search-Wise-Report.xlsx");
    }
}
