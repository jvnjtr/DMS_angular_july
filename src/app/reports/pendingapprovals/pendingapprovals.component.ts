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
import { Buffer } from 'buffer';
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

  title: any;
  tablist: any;
  utillist: any;
  messaageslist: any;
  jsonurl = "assets/js/_configs/viewApprovalListRpt.config.json";

  letterID: any = "";
  queryList: any = [];
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  pageSizes = [10, 20, 50, 100, 500, 1000];
  searchstatus: any;
  txtTodate: any = "";
  txtFromdate: any = "";
  txtUserName: any = 0;
  loading: any = false;
  selType: any = 1;
  selBasedon: any = 0;
  selGraphType: any = 0;
  sortDir = 1;//1= 'ASE' -1= DSC
  sortOrder: string = 'asc';
  sortColumn: string = 'ticker';
  userList: any;
  userFullName: any;
  tablecollist = [
    { "name": "Document No.", "cname": "fileRefNo", "sortable": true },
    { "name": "Folder Name", "cname": "folderName", "sortable": true },
    { "name": "Name", "cname": "fileName", "sortable": true },
    { "name": "Size", "cname": "fileSize", "sortable": true },

    { "name": "Created By", "cname": "createdByName", "sortable": true },
    { "name": "Pending At", "cname": "pendingAtName", "sortable": true },
    { "name": "Pending On", "cname": "pendingOn", "sortable": true },
  ]
  Highcharts = Highcharts;
  chartOptions: any = '';

  constructor(
    private route: Router,
    private httpClient: HttpClient,
    public reportService: ReportsService,
    public encDec: EncrypyDecrpyService,
    public authService: AuthenticationService,
    public commonserveice: CommonServicesService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.loadconfig();
    this.loadData(1, this.selBasedon, this.txtUserName, this.txtFromdate, this.txtTodate, this.selGraphType)
    this.loadusers('')

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


  loadData(type: any, basedon: any, user: any, fromdate: any, todate: any, graphtype: any) {
    this.queryList = [];
    let dataParam = {
      "type": type,
      "basedon": basedon,
      "userId": user,
      "fromDate": fromdate,
      "toDate": todate
    };


    this.loading = true;
    this.reportService.rptApprovalList(dataParam).subscribe({
      next: (response) => {
        let respData = response.RESPONSE_DATA;
        let respToken = response.RESPONSE_TOKEN;

        let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
        if (respToken == verifyToken) {
          let res: any = Buffer.from(respData, 'base64');
          let responseResult = JSON.parse(res)

          if (responseResult.status == 200) {
            this.loading = false;
            this.queryList = responseResult.result;
            console.log(this.queryList)

            if (type == 2) {

              this.loadChart(this.queryList, graphtype, basedon);
            }




          }
          else if (responseResult.status == 400) {
            this.loading = false;
          }
          else if (responseResult.status == 501) {

            this.authService.directlogout();
          }
          else {
            this.loading = false;
            this.commonserveice.swalfire('error',this.commonserveice.langReplace(environment.somethingWrong))
          }
        }
        else {
          this.loading = false;
          this.commonserveice.swalfire('error',this.commonserveice.langReplace(environment.invalidResponse))
        
        }
      },
      error: (msg) => {
        this.authService.directlogout();
      }
    })


  }


  searchdata(type: any, basedon: any, user: any, fromdate: any, todate: any, graphtype: any) {
    if (fromdate == '' && todate) {
      Swal.fire({
        icon: 'error',
        text: this.commonserveice.langReplace("Select From Date"),

      });

    }
    else if (fromdate && todate == '') {
      Swal.fire({
        icon: 'error',
        text: this.commonserveice.langReplace("Select To Date"),

      });

    }
    else if (type == 2 && basedon == 0) {
      Swal.fire({
        icon: 'error',
        text: this.commonserveice.langReplace("Select Based On"),

      });

    }
    else if (type == 2 && graphtype == 0) {
      Swal.fire({
        icon: 'error',
        text: this.commonserveice.langReplace("Select Graph Type"),

      });

    }
    else {
      this.searchstatus = 1;
      this.loadData(type, basedon, user, fromdate, todate, graphtype)
      this.page = 1;
      if (user > 0) {
        this.loaduserbyId(user)
      }

    }


  }



  //\\ ======================== // Data sorting // ======================== //\\

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
  resetform() {
    this.txtTodate = "";
    this.txtFromdate = "";
    this.txtUserName = 0;

    this.selType = 1;
    this.selBasedon = 0;
    this.selGraphType = 0;
    this.searchstatus = 0
  }

  basedonChange() {
    this.txtFromdate = '';
    this.txtTodate = '';
    this.selGraphType = 0
  }
  tableview(type: any) {
    this.resetform()
    this.selType = type;

    if (type == 1) {
      this.loadData(1, this.selBasedon, this.txtUserName, this.txtFromdate, this.txtTodate, this.selGraphType)
    }
    else if (type == 2) {

this.selBasedon=1;
this.selGraphType=1;
      this.searchdata(2, 1, this.txtUserName, this.txtFromdate, this.txtTodate, 1)
      // this.loadData(2,this.selBasedon,this.txtUserName,this.txtFromdate,this.txtTodate,this.selGraphType)
    }

  }
  //\\ ======================== // Load User List // ======================== //\\ 
  loadusers(userId: any) {
    this.loading = true;
    let dataParam = {
      "userId": userId,
      "fileId": ''
    };
    this.reportService.getUserlist(dataParam).subscribe({
      next: (response) => {
        let respData = response.RESPONSE_DATA;
        let respToken = response.RESPONSE_TOKEN;

        let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
        if (respToken == verifyToken) {
          let res: any = Buffer.from(respData, 'base64');
          let responseResult = JSON.parse(res)

          if (responseResult.status == 200) {

            this.loading = false;
            this.userList = responseResult.result;

            //    console.log(this.userList) 

          }
          if (responseResult.status == 400) {
            this.loading = false;
            this.userList = responseResult.result;
          }
          if (responseResult.status == 500) {
            this.loading = false;
            this.userList = responseResult.result;
          }
          else if (responseResult.status == 501) {

            this.authService.directlogout();
          }
          else {
            this.loading = false;

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
  //\\ ======================== // Load User List // ======================== //\\ 
  //\\ ======================== // Load User List // ======================== //\\ 
  loaduserbyId(userId: any) {
    this.loading = true;
    let dataParam = {
      "userId": userId,

    };
    this.reportService.getUserDetails(dataParam).subscribe({
      next: (response) => {
        let respData = response.RESPONSE_DATA;
        let respToken = response.RESPONSE_TOKEN;

        let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
        if (respToken == verifyToken) {
          let res: any = Buffer.from(respData, 'base64');
          let responseResult = JSON.parse(res)

          if (responseResult.status == 200) {

            this.loading = false;
            let userlist: any = responseResult.result;
            this.userFullName = userlist.userFullName
            //    console.log(this.userList) 

          }
          if (responseResult.status == 400) {
            this.loading = false;
            this.userList = responseResult.result;
          }
          if (responseResult.status == 500) {
            this.loading = false;
            this.userList = responseResult.result;
          }
          else if (responseResult.status == 501) {

            this.authService.directlogout();
          }
          else {
            this.loading = false;

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
  //\\ ======================== // Load User List // ======================== //\\ 
  //\\ ======================== // Load Search chart // ======================== //\\
  loadChart(queryList: any, graphtype: any, basedon: any) {

    let chartType: any;

    if (graphtype == 1) {
      this.loadbarchart(queryList, basedon, 'bar')
    }
    else if (graphtype == 2) {
      this.loadbarchart(queryList, basedon, 'column')
    }
    else if (graphtype == 3) {
      this.loadbarchart(queryList, basedon, 'line')

    }


  }
  //\\ ======================== // Load Search chart // ======================== //\\

  loadbarchart(queryList: any, basedon: any, graphtype: any) {

    let qlist: any = [];
    let dataseries: any = [];
    let seriescategory: any = [];
    let allDates: any;
    let dataitemarray: any = [];
    let dataitemarray2: any = [];

    let lablealign: any;

    if (graphtype == 'bar') {
      lablealign = 'right'
    }
    else {
      lablealign = 'center'
    }

    if (basedon == 2) {

      allDates = this.getDatesBetween(this.txtFromdate, this.txtTodate);
      seriescategory = allDates;

      qlist = queryList.chartData;
      let group_by_role: any = qlist.reduce(function (obj: any, item: any) {
        
        obj[item.pendingAt] = obj[item.pendingAt] || [];
        obj[item.pendingAt].push({ totalcount: item.totalCount, pendingdate: item.stmCreatedOn });
        return obj;

      }, {});


      let pendingListrole: any = Object.keys(group_by_role).map(function (key) {
        return { rolename: key, pendingListItems: group_by_role[key] };
      });

 for (let j = 0; j < pendingListrole.length; j++) {
        let datalist: any = [];
        let obj: any = [];
        let listitems = pendingListrole[j].pendingListItems;

        datalist = [];
        for (let z = 0; z < seriescategory.length; z++) {
          for (let i = 0; i < listitems.length; i++) {
           
            if (seriescategory[z] == this.datePipe.transform(listitems[i].pendingdate, 'dd-MMM-yyyy') ) {
              datalist[z] = listitems[i].totalcount
            }
            else {
              if (!(datalist[z] > 0)) {
                datalist[z] = 0
              }
            }

          }
          }
 obj['name'] = pendingListrole[j].rolename;
        obj['data'] = datalist;
        dataseries.push(obj)
        datalist = []
      }


    }
    else {
      qlist = queryList.chartData;

      for (let i = 0; i < qlist.length; i++) {
        let obj: any = [];
        obj[0] = qlist[i].pendingAt;
        obj[1] = qlist[i].totalCount;
        dataseries.push(obj)

        seriescategory.push(qlist[i].pendingAt)
      }
    }
    let seriestypeOne: any = [
      {

     
        data: dataseries,

     
      }
    ]

    this.loading = true;

    setTimeout(() => {
      this.loading = false;
      this.chartOptions = {
        chart: {
          type: graphtype,
      },
      colors: ['#36a2eb', '#ffce56',  '#9966ff', '#ff6384', '#4bc0c0', '#ff9f40', '#2dff49', '#ff2dd0', '#2deaff', '#691af3'],
      title: {
          text: 'Pending Approval List',
         
      },
      subtitle: {
          text: ''
      },
      xAxis: {
        type: 'category',
        categories: seriescategory,
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
        pointFormat: '<tr><td style="color:{series.color};padding:0">{ basedon == 2 ? series.name : ""} </td>' +
          '<td style="padding:0"> <b>{point.y} </b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
      },
      credits: {
        enabled: false,
      },
      plotOptions: {
       
      },
      legend: {
        enabled: basedon == 2 ?true :false,
      },
   
      series: basedon == 2 ? dataseries : seriestypeOne
      }
    }, 2000)



  }


  getDatesBetween(startDate: any, endDate: any) {
    let currentDate: any = new Date(startDate);
    let endAssignDate: any = new Date(endDate);

    let dates: any = [];
    while (currentDate <= endAssignDate) {
      dates.push(this.datePipe.transform(currentDate, 'dd-MMM-yyyy'));
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
        ws[i].s = {
          font: {
            bold: true
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
