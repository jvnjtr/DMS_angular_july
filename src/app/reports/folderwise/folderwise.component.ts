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
import * as XLSX from 'xlsx-js-style';
@Component({
  selector: 'app-folderwise',
  templateUrl: './folderwise.component.html',
  styleUrls: ['./folderwise.component.scss']
})
export class FolderwiseComponent implements OnInit {
  @ViewChild("table1") table: ElementRef;

  title: any;
  tablist: any;
  utillist: any;
  messaageslist: any;
  jsonurl = "assets/js/_configs/folderWiseRtp.json";

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
  txtFileName:any=''
  sortDir = 1;//1= 'ASE' -1= DSC
  sortOrder: string = 'asc';
  sortColumn: string = 'ticker';
  userList: any;
  bookmarktype: any = '';
  ffdetailsArr: any = [];
  namesarray: any = [];
  refnoarray: any = [];
  filesizearray: any = [];
  documentdetails: any = [];
  createdbyarray: any = [];
  folderId:any=1;
  finalobj: any = {
    'Name': this.namesarray,
    'Reference': this.refnoarray,
    'Size': this.filesizearray,
    'Document': this.documentdetails,
    'Createdby': this.createdbyarray
  };
  tablecollist = [
    { "name": "Folder Id", "cname": "folderRefNo", "sortable": true },
    
    { "name": "Name", "cname": "fileName", "sortable": true },
    { "name": "No of Documents", "cname": "fileCount", "sortable": false },
    { "name": "Size", "cname": "fileSize", "sortable": false },
   { "name": "Created By", "cname": "createdByName", "sortable": true },
    { "name": "Created On", "cname": "CreatedOn", "sortable": true }
    // { "name": "Shared On", "cname": "CreatedOn", "sortable": true },
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
  ) { }

  ngOnInit(): void {
    this.loadconfig();
    // this.loadData(1, this.selBasedon, this.txtUserName, this.txtFromdate, this.txtTodate, this.selGraphType,this.txtFileName)
    // this.loadusers(0)
    this.viewDetails(this.folderId, this.finalobj);
  }

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
  viewDetails(fid: any, searchitems: any) {

    this.loading = true;
    let dataParam = {
      "folderId": fid,
      "bookmarkStatus": this.bookmarktype,
      // "searchfilter": searchitems
    };
    //  console.log(dataParam)
    this.commonserveice.folderWiseDetails(dataParam).subscribe((response: any) => {
      let respData = response.RESPONSE_DATA;
      let respToken = response.RESPONSE_TOKEN;
      let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
      if (respToken == verifyToken) {
        let res: any = Buffer.from(respData, 'base64');
        let responseResult = JSON.parse(res)
        console.log(responseResult)
        if (responseResult.status == 200) {
          this.loading = false;
          
          // this.ffdetailsArr = responseResult.result;
          this.queryList = responseResult.result;
          console.log(this.queryList)
        //  this.loadHierarchy(this.folderid);
        
          
        }
        else if (responseResult.status == 400) {
          this.loading = false;
          // Swal.fire({
          //   icon: 'error',
          //   text: responseResult.message,

          // });
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
        this.authService.directlogout();
      }

    },
      (error: any) => {
        this.loading = false;
        this.authService.directlogout();
      })

  }

  loadData(type: any, basedon: any, user: any, fromdate: any, todate: any, graphtype: any,fileName:any) {
    this.queryList = [];
    let dataParam = {
      "type": type,
      "basedon": basedon,
      "userId": user,
      "fromDate": fromdate,
      "toDate": todate,
      "fileName": fileName
    };

// console.log(dataParam);
    this.loading = true;
    this.reportService.rptSharedList(dataParam).subscribe({
      next: (response) => {
        let respData = response.RESPONSE_DATA;
        let respToken = response.RESPONSE_TOKEN;
  
        let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
        if (respToken == verifyToken) {
          let res: any = Buffer.from(respData, 'base64');
          let responseResult = JSON.parse(res)
          // console.log(responseResult);
          if (responseResult.status == 200) {
            this.loading = false;
            this.queryList = responseResult.result;
            console.log(this.queryList)
  
            if (type == 2) {
  
              this.loadChart(this.queryList, graphtype);
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


  searchdata(type: any, basedon: any, user: any, fromdate: any, todate: any,graphtype: any,fileName:any) {
    if (fromdate == '' && todate) {
      this.commonserveice.swalfire('error',this.commonserveice.langReplace("Select From Date"))


    }
    else if (fromdate && todate == '') {
      this.commonserveice.swalfire('error',this.commonserveice.langReplace("Select To Date"))
 

    }
    else if (type == 2 && basedon == 0) {
      this.commonserveice.swalfire('error',this.commonserveice.langReplace("Select Based On"))
  

    }
    else if (type == 2 && graphtype == 0) {
      this.commonserveice.swalfire('error',this.commonserveice.langReplace("Select Graph Type"))
   

    }
    else {
      this.searchstatus = 1;
      this.loadData(type, basedon, user, fromdate, todate, graphtype,fileName)

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

  //\\ ======================== // Get file Type // ======================== //\\
  getfiletype(filename: any) {

    let icon: any;
    let iconsGroups: any = environment.iconsGroups;
    for (let i = 0; i < iconsGroups.length; i++) {
      let filetype: any = iconsGroups[i].groups.includes(filename);
      if (filetype == true) {
        icon = iconsGroups[i].name;
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
  resetform() {
    this.txtTodate = "";
    this.txtFromdate = "";
    this.txtUserName = 0;

    this.selType = 1;
    this.selBasedon = 0;
    this.selGraphType = 0;
    this.searchstatus = 0
  }


  tableview(type: any) {
    this.resetform()
    this.selType = type;
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
  //\\ ======================== // Load Search chart // ======================== //\\
  loadChart(queryList: any, graphtype: any) {

    let chartType: any;

    if (graphtype == 1) {
      this.loadbarchart(queryList)
    }
    else if (graphtype == 2) {
      this.loadcolumnchart(queryList)
    }
    else if (graphtype == 3) {
      this.loadlinechart(queryList)
    }
    else if (graphtype == 4) {
      this.loadareachart(queryList)
    }

  }
  //\\ ======================== // Load Search chart // ======================== //\\

  loadbarchart(queryList: any) {

    let qlist: any = [];
    let dataseries: any = [];
    let seriescategory: any = [];
    qlist = queryList.chartData;

    for (let i = 0; i < qlist.length; i++) {
      let obj: any = [];
      obj[0] = qlist[i].pendingAt;
      obj[1] = qlist[i].totalCount;
      dataseries.push(obj)

      seriescategory.push(qlist[i].pendingAt)
    }

    this.loading = true;

    setTimeout(() => {
      this.loading = false;
      this.chartOptions = {
        chart: {
          type: 'bar',

        },
        colors: [
          '#0a9eaa', '#1f88b7', '#277dbd', '#1693b1', '#533be1', '#5b30e7', '#3e5ccf', '#9b20d9', '#861ec9', '#691af3'],
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
          minorGridLineWidth: 1,
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

            name: 'Pending Applications',

            colorByPoint: true,
            data: dataseries,

            dataLabels: {
              enabled: true,
              rotation: 0,
              color: '#FFFFFF',
              align: 'right',
              format: '{point.y}', // one decimal
              y: 3, // 10 pixels down from the top
              style: {
                fontSize: '12px',
                fontFamily: 'Verdana, sans-serif'
              }
            }
          }
        ]

      }
    }, 2000)



  }
  loadcolumnchart(queryList: any) {

    let qlist: any = [];
    let dataseries: any = [];
    let seriescategory: any = [];
    qlist = queryList.chartData;

    for (let i = 0; i < qlist.length; i++) {
      let obj: any = [];
      obj[0] = qlist[i].pendingAt;
      obj[1] = qlist[i].totalCount;
      dataseries.push(obj)

      seriescategory.push(qlist[i].pendingAt)
    }

    this.loading = true;

    setTimeout(() => {
      this.loading = false;
      this.chartOptions = {
        chart: {
          type: 'column',

        },
        colors: [
          '#0a9eaa', '#1f88b7', '#277dbd', '#1693b1', '#533be1', '#5b30e7', '#3e5ccf', '#9b20d9', '#861ec9', '#691af3'],
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
          minorGridLineWidth: 1,
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

            name: 'Pending Applications',

            colorByPoint: true,
            data: dataseries,

            dataLabels: {
              enabled: true,
              rotation: -90,
              color: '#FFFFFF',
              align: 'right',
              format: '{point.y}', // one decimal
              y: 12, // 10 pixels down from the top
              style: {
                fontSize: '12px',
                fontFamily: 'Verdana, sans-serif'
              }
            }
          }
        ]

      }
    }, 2000)




  }
  loadlinechart(queryList: any) {

    let qlist: any = [];
    let dataseries: any = [];
    let seriescategory: any = [];
    qlist = queryList.chartData;

    for (let i = 0; i < qlist.length; i++) {
      let obj: any = [];
      obj[0] = qlist[i].pendingAt;
      obj[1] = qlist[i].totalCount;
      dataseries.push(obj)

      seriescategory.push(qlist[i].pendingAt)
    }

    this.loading = true;

    setTimeout(() => {
      this.loading = false;
      this.chartOptions = {
        chart: {
          type: 'line',

        },
        colors: [
          '#0a9eaa', '#1f88b7', '#277dbd', '#1693b1', '#533be1', '#5b30e7', '#3e5ccf', '#9b20d9', '#861ec9', '#691af3'],
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
          minorGridLineWidth: 1,
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

            name: 'Pending Applications',

            colorByPoint: true,
            data: dataseries,

            dataLabels: {
              enabled: true,
              rotation: 0,
              color: '#FFFFFF',
              align: 'right',
              format: '{point.y}', // one decimal
              y: 3, // 10 pixels down from the top
              style: {
                fontSize: '12px',
                fontFamily: 'Verdana, sans-serif'
              }
            }
          }
        ]

      }
    }, 2000)



  }
  loadareachart(queryList: any) {

    let qlist: any = [];
    let dataseries: any = [];
    let seriescategory: any = [];
    qlist = queryList.chartData;

    for (let i = 0; i < qlist.length; i++) {
      let obj: any = [];
      obj[0] = qlist[i].pendingAt;
      obj[1] = qlist[i].totalCount;
      dataseries.push(obj)

      seriescategory.push(qlist[i].pendingAt)
    }

    this.loading = true;

    setTimeout(() => {
      this.loading = false;
      this.chartOptions = {
        chart: {
          type: 'area',

        },
        colors: [
          '#0a9eaa', '#1f88b7', '#277dbd', '#1693b1', '#533be1', '#5b30e7', '#3e5ccf', '#9b20d9', '#861ec9', '#691af3'],
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
          minorGridLineWidth: 1,
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

            name: 'Pending Applications',

            colorByPoint: true,
            data: dataseries,

            dataLabels: {
              enabled: true,
              rotation: -90,
              color: '#FFFFFF',
              align: 'right',
              format: '{point.y}', // one decimal
              y: 12, // 10 pixels down from the top
              style: {
                fontSize: '12px',
                fontFamily: 'Verdana, sans-serif'
              }
            }
          }
        ]

      }
    }, 2000)




  }

  excelDownloadFolderWiselList() {
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
    XLSX.writeFile(wb, "Folder-Wise-List.xlsx");
  }
}
