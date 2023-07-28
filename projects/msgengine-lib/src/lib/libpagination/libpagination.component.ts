import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'lib-libpagination',
  templateUrl: './libpagination.component.html',
  styleUrls: ['./libpagination.component.css']
})
export class LibpaginationComponent implements OnInit {
  @Input() page:any;
  @Input() count:any;
  @Input() tableSize:any;

  @Output("callfunction") callfunction:EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
  onTableDataChange(event: any) {
    this.callfunction.emit(event);
  }
}
