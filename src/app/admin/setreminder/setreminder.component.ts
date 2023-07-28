import { Component, OnInit } from '@angular/core';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import {Buffer} from 'buffer';


@Component({
  selector: 'app-setreminder',
  templateUrl: './setreminder.component.html',
  styleUrls: ['./setreminder.component.scss']
})
export class SetreminderComponent implements OnInit {
  nameList:any = [];
  selectedItems:any = [];
  dropdownSettings:any = {};
  txtEfminDate:any='';
  txtEtminDate:any='';
  rdoSharethrough:any="1";
  txtEffeciveFrom:any=new Date();
  
  constructor( private readonly calendar: NgbCalendar,) { }

  ngOnInit(): void {
    this.nameList = [
      { id: 1, itemName: 'Sudam Ch Panda' },
      { id: 2, itemName: 'Sunil Parida' },
      { id: 3, itemName: 'Biikash Kumar Panda' },
      { id: 4, itemName: 'Rohit Behera' },
      { id: 5, itemName: 'Soumaya Das' },
      { id: 6, itemName: 'Priyadarshini Moganty' }
     
    ];

    // this.selectedItems = [
    //   { id: 2, itemName: 'Singapore' },
    //   { id: 3, itemName: 'Australia' },
    //   { id: 4, itemName: 'Canada' },
    //   { id: 5, itemName: 'South Korea' }
    // ];
    this.dropdownSettings = {
      singleSelection: false,
      text: 'Select Name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: 'myclass custom-class'
    };
  }
  onItemSelect(item: any) {
    console.log(item);
    console.log(this.selectedItems);
  }
  OnItemDeSelect(item: any) {
    console.log(item);
    console.log(this.selectedItems);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  onDeSelectAll(items: any) {
    console.log(items);
  }
}
