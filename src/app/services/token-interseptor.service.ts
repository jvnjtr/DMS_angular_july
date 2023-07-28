import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpHeaders, HttpRequest, HttpHandler, HttpEvent,HttpErrorResponse,HttpClient} from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
//import { AuthenticationService } from './authentication.service';


@Injectable({
  providedIn: 'root'
})
export class TokenInterseptorService implements HttpInterceptor{

 token:any;
    
      constructor( 
        private injector: Injector,
        private router: Router,
       private http: HttpClient
      ) { 
        
      }
     

  intercept(req:HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    this.token=sessionStorage.getItem('TOKEN');
    let tokenHeader =req.clone({
     
      headers: req.headers.set(
        'Authorization', 'bearer ' + this.token
     )
    
    })



  return next.handle(tokenHeader)
  //  .pipe(catchError((error: HttpErrorResponse) => {
  //    alert(0)
  //                   let errorMsg = '';
  //                   if (error.error instanceof ErrorEvent) {
  //                      console.log('This is client side error');
  //                      errorMsg = `Error: ${error.error.message}`;
  //                   } else {
  //                      console.log('This is server side error');
  //                      errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
  //                   }
  //                   console.log(errorMsg);
  //                   return throwError(errorMsg);
  //                })
  //          )


  }
 
//  sessionStorage.removeItem('ADMIN_SESSION');
//       sessionStorage.removeItem('TOKEN');
//       this.router.navigateByUrl('/login');

}
