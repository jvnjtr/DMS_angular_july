import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonServicesService } from 'src/app/services/common-services.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input() page:any;
  @Input() count:any;
  @Input() tableSize:any;

  @Output("callfunction") callfunction:EventEmitter<any> = new EventEmitter();
  constructor(public commonserveice:CommonServicesService) { }

  ngOnInit(): void {
  }
  onTableDataChange(event: any) {
    this.callfunction.emit(event);
  }
}
