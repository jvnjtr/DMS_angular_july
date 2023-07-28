import { Component, OnInit, Input } from '@angular/core';
import { CommonServicesService } from 'src/app/services/common-services.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {
  message: any;
  @Input() tabMessage: any;
  @Input() activeid: any;
  tabURL: any;
  constructor(public commonserveice:CommonServicesService,) {}

  ngOnInit(): void {
    this.tabURL = this.tabMessage.tabUrl;
    if (typeof this.tabMessage.id != 'undefined' && this.tabMessage.id != '') {
      this.tabURL = this.tabMessage.tabUrl + '/' + this.tabMessage.id;
    }
  }
}
