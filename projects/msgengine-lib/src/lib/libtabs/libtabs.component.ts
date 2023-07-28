import { Component, Input, OnInit } from '@angular/core';
import { MsgengineLibService } from '../msgengine-lib.service';

@Component({
  selector: 'lib-libtabs',
  templateUrl: './libtabs.component.html',
  styleUrls: ['./libtabs.component.css']
})
export class LibtabsComponent implements OnInit {
  message: any;
  @Input() tabMessage: any;
  @Input() activeid: any;
  tabURL: any;
  constructor(public commonserveice:MsgengineLibService) { }

  ngOnInit(): void {
    this.tabURL = this.tabMessage.tabUrl;
    if (typeof this.tabMessage.id != 'undefined' && this.tabMessage.id != '') {
      this.tabURL = this.tabMessage.tabUrl + '/' + this.tabMessage.id;
    }
  }

}
