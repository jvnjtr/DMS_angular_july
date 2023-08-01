import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpHeaders, HttpRequest, HttpHandler, HttpEvent,HttpErrorResponse,HttpClient} from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
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



  return next.handle(tokenHeader).pipe(
    catchError((err: HttpErrorResponse) => {
      this.handleServerSideError(err);
      return throwError(err);
    })
  );
  


  }
 
//  sessionStorage.removeItem('ADMIN_SESSION');
//       sessionStorage.removeItem('TOKEN');
//       this.router.navigateByUrl('/login');



private handleServerSideError(error: HttpErrorResponse) {
  switch (error.status) {

    case 400: //  means the request could not be understood by the server.
    Swal.fire({
      icon: 'error',
      text: "Bad Request, please try again later ."
    });
    
      break;
    case 401: // means lacks valid authentication credentials for the target resource. 
  Swal.fire({
      icon: 'error',
      text: "Unauthorized, please try again later."
    });
      break;
    case 403: //  means you are not allowed access to the target resource.
    Swal.fire({
      icon: 'error',
      text: "Forbidden access is denied"
    });
    
      break;
    case 500: // means there's an issue or temporary glitch with the application's programming
    Swal.fire({
      icon: 'error',
      text: "Session time out, Please login again"
    });
  
      break;
  }
}

}
