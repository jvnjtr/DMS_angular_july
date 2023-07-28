import { Component, OnInit } from '@angular/core';
import { CommonServicesService } from 'src/app/services/common-services.service';

@Component({
  selector: 'app-reportindex',
  templateUrl: './reportindex.component.html',
  styleUrls: ['./reportindex.component.scss']
})
export class ReportindexComponent implements OnInit {

  constructor(public commonserveice:CommonServicesService) { }
  title:any="Reports";


reportslist:any=[];


  ngOnInit(): void {

this.reportslist=[
  {'icon':'bi-file-earmark-check','name':'Pending Approval List','description':'Lorem Ipsum is simply dummy text of the printing and typesetting industry.','link':'../pendingapprovals'},
  {'icon':'bi-share','name':'Shared Documents','description':'Lorem Ipsum is simply dummy text of the printing and typesetting industry.','link':'../sharedfilewise'},
  {'icon':'bi-folder','name':'Folder Based','description':'Lorem Ipsum is simply dummy text of the printing and typesetting industry.','link':'../folderwise'},
  {'icon':'bi-search','name':'Search Report','description':'Lorem Ipsum is simply dummy text of the printing and typesetting industry.','link':'../searchwise'},
  {'icon':'bi-trash3','name':'Retention','description':'Lorem Ipsum is simply dummy text of the printing and typesetting industry.','link':'../newarretiondate'},
  {'icon':'bi-file-earmark-text','name':'All Documents','description':'Lorem Ipsum is simply dummy text of the printing and typesetting industry.','link':'../allfiles'}
]

  }


}
