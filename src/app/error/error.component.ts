import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {
siteUrl = environment.siteURL;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  backtohome(){

    
    
    this.router.navigateByUrl('/admin/login');
    
    }
}
