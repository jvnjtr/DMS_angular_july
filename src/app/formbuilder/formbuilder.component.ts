import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-formbuilder',
  templateUrl: './formbuilder.component.html',
  styleUrls: ['./formbuilder.component.scss']
})
export class FormbuilderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  showHide(){
 
    let pagecontent:any = document.querySelector('.page-container');
    let sidemenu:any = document.querySelector('.sidemenu');
    // var overlay = document.querySelector(".overlay");
    
    // Full width less than 800
    var windowWidth=window.outerWidth;
    if(windowWidth < 800 ){
    
     pagecontent.classList.add("display-full");
     sidemenu.classList.remove("active");
    }
    else{
      pagecontent.classList.remove("display-full");
      sidemenu.classList.add("active");
    }
     // Full width less than 800
    
      }
}
