import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { EncrypyDecrpyService } from 'src/app/services/encrypy-decrpy.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import {Location} from '@angular/common';
import { Buffer } from 'buffer';
import * as CryptoJS from 'crypto-js';
import * as $ from 'jquery';
import { ConsoleservicesService } from 'src/app/services/consoleservices.service';


@Component({
  selector: 'app-cutils',
  templateUrl: './cutils.component.html',
  styleUrls: ['./cutils.component.scss']
})
export class CutilsComponent implements OnInit {

  

  message: any;
  @Input() childMessage: any;

  @Input() sendIds: any;
  @Input() funType: any;
  @Input() pubUnpubStatus: any;
  @Input() activeDeactiveStatus: any;
  @Output("callfunction") callfunction: EventEmitter<any> = new EventEmitter();
  @Output("callfunction3") callfunction3: EventEmitter<any> = new EventEmitter();
  @Input() reloadUrl: any;
  langKey: any = 'en';
  @Input() tableName: any;

  @Input() processId: any;


  userPermissionDetails:any;
  intDeleteRight:any=0;
  intEditRight:any=0;
  intViewManageRight:any=0;
  intaddRight:any=0;
  intallRight:any=0;
  publishRight:any=0;
  admin_privilege: any;
  constructor(private route: Router,
    private httpClient: HttpClient,
   private commonService:ConsoleservicesService,
    private _location: Location,
    private encDec: EncrypyDecrpyService) { }

  ngOnInit(): void {
    // console.log(this.processId);
    let USER_PERMISSIONTOKEN: any = sessionStorage.getItem('ADMIN_SESSION');
    let USER_PERMISSION_DETAILS = JSON.parse(
      CryptoJS.AES.decrypt(
        USER_PERMISSIONTOKEN,
        environment.apiHashingKey
      ).toString(CryptoJS.enc.Utf8)
    );
    
    this.userPermissionDetails = USER_PERMISSION_DETAILS.USER_PERMISSION;
    this.admin_privilege = USER_PERMISSION_DETAILS.ADMIN_PRIVILEGE;
    console.log(this.admin_privilege);
    
    if(this.admin_privilege==1 || this.admin_privilege==2){
      this.intDeleteRight=1;
      this.intEditRight=1;
      this.intViewManageRight=1;
      this.intaddRight=1;
      this.intallRight=1;
      this.publishRight=1;

    }
    else{
      console.log(this.processId);
       // this.allPermissionList(this.processId);

    }
    this.addChangeEventForLabel();

  }
  opensearch() {

    $(".search-container").toggleClass("active");
  }

  printTable() {
    let printContents;
    let popupWin: any;
    printContents = $(".print-section").html();
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
  <html>
    <head>
    <link href="../../assets/css/print.css" rel="stylesheet">
     
    </head>
<body onload="window.print();window.close()">
<div class="header">
<img src="../../assets/img/logoblack.png">
</div>

${printContents}</body>
  </html>`
    );
    popupWin.document.close();
  }

  deleteAll(ids: any, ftype: any,tableName:any = '') {
    // alert("hey");
  //   if (ids.length == 0) {
  //     Swal.fire({
  //       icon: 'error',
  //       text: 'Please select the record you want to delete' + '.',

  //     });
  //   }
  //   else {
  //     var itemids = ids.toString();

  //     let letterParams = {
  //       "itemId": itemids,
  //       "itemStatus": "1",
  //       "tableName": tableName
       
  //     };

  //     Swal.fire({
  //       title: 'Are you sure' + '?',
  //       text: "You want to delete this record",
  //       icon: 'warning',
  //       showCancelButton: true,
  //       cancelButtonText: 'Cancel',
  //       confirmButtonColor: '#3085d6',
  //       cancelButtonColor: '#d33',
  //       confirmButtonText: 'Yes' + ', ' + 'delete it' + '!'
  //     }).then((result: any) => {
  //       if (result.isConfirmed) {
  //         this.commonService.deleteAll(letterParams, ftype).subscribe((response: any) => {
  //           // console.log(response);
  //           let respData = response.RESPONSE_DATA;
  //           let respToken = response.RESPONSE_TOKEN;
  //           let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
  //           // console.log(respToken);
  //           // console.log(verifyToken);

  //           if (respToken == verifyToken) {
  //             let res: any = Buffer.from(respData, 'base64');
  //             res = JSON.parse(res.toString());
  //             // console.log(res.status);

  //             if (res.status == 200) {
  //               Swal.fire(
  //                 'Deleted!',
  //                 'Record has been deleted',
  //                 'success'
  //               )
  //               $('.checkAll').prop('checked', false);
  //               this.callfunction.emit();
  //               this.callfunction3.emit();
  //             } else if (res.status == 417) {
  //               Swal.fire({
  //                 icon: 'error',
  //                 text: 'Invalid',
  //               });
  //             }
  //             else {

  //               Swal.fire({
  //                 icon: 'error',
  //                 text: 'Something Went Wrong',

  //               });
  //             }
  //           } else {
  //             Swal.fire({
  //               icon: 'error',
  //               text: 'Invalid',
  //             });
  //           }


  //         });



  //       }
  //     })



  //   }
  }
   backClicked() {
  //   this._location.back();
   }
  activeAll(ids: any, ftype: any, activeDeactiveStatus: any, tableName:any = '') {
    let puberroStatus: any = 0;
    for (let klp of activeDeactiveStatus) {
      //  console.log(klp);
      if (klp.activeInactiveStatus == 1) {
        puberroStatus = 1;
        break;
      }
    }
    if (puberroStatus == 1) {
      Swal.fire({
        icon: 'error',
        text: 'Please select the Inactivated record to Active' + '.',

      });
      return
    }

    if (ids.length == 0) {
      Swal.fire({
        icon: 'error',
        text: 'Please select the record you want to Active' + '.',

      });
    }
    else {
    
    let itemids = ids.toString();

    let letterParams = {
      "itemId": itemids,
      "itemStatus": "4",
      "tableName": tableName
    };
 
    Swal.fire({
      text: "You want to active this record",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes' + ', ' +'activate it' + '!'
    }).then((result: any) => {
      if (result.isConfirmed) {

        this.commonService.publishAll(letterParams, ftype).subscribe((response: any) => {
          let respData = response.RESPONSE_DATA;
          let respToken = response.RESPONSE_TOKEN;
          let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
          if (respToken == verifyToken) {
            let res: any = Buffer.from(respData, 'base64');
            res = JSON.parse(res.toString());
            if (res.status == 200) {
              Swal.fire(
                'Activated!',
                'Active Records Successfully',
                'success'
              )
              $('.checkAll').prop('checked', false);
              this.callfunction.emit();
              this.callfunction3.emit();
            } else if (res.status == 417) {
              Swal.fire({
                icon: 'error',
                text: 'Invalid',
              });
            }
            else {
              Swal.fire({
                icon: 'error',
                text: 'Something Went Wrong',

              });
            }
          } else {
            Swal.fire({
              icon: 'error',
              text: 'Invalid',
            });
          }


        });

      }

    });
  }
}
  inactiveAll(ids: any, ftype: any, activeDeactiveStatus: any, tableName:any = '') {
    let puberroStatus: any = 0;
    for (let klp of activeDeactiveStatus) {
      // console.log(klp);
      if (klp.activeInactiveStatus == 2) {
        puberroStatus = 2;
        break;
      }
    }
    if (puberroStatus == 2) {
      Swal.fire({
        icon: 'error',
        text: 'Please select the active record to inactive' + '.',

      });
      return
    }

    if (ids.length == 0) {
      Swal.fire({
        icon: 'error',
        text: 'Please select the record you want to inactive' + '.',

      });
    }
    else {
      let itemids = ids.toString();

      let letterParams = {
        "itemId": itemids,
        "itemStatus": "5",
        "tableName": tableName
      };
      Swal.fire({
        text: "You want to inactive this record",
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Cancel',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes' + ', ' + 'inactive it'
      }).then((result: any) => {
        if (result.isConfirmed) {
          this.commonService.unpublishAll(letterParams, ftype).subscribe((response: any) => {
            console.log(response)
            let respData = response.RESPONSE_DATA;
            let respToken = response.RESPONSE_TOKEN;
            let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
            if (respToken == verifyToken) {
              let res: any = Buffer.from(respData, 'base64');
              res = JSON.parse(res.toString());
              if (res.status == 200) {
                Swal.fire(
                  'Inactivated !',
                  'inactive Records Successfully' + '.',
                  'success'
                )
                itemids = '';
                $('.checkAll').prop('checked', false);
                this.callfunction.emit();
                this.callfunction3.emit();
              } else if (res.status == 417) {
                Swal.fire({
                  icon: 'error',
                  text: 'Invalid',
                });
              }
              else {
                Swal.fire({
                  icon: 'error',
                  text: 'Something Went Wrong',

                });
              }
            } else {
              Swal.fire({
                icon: 'error',
                text: 'Invalid',
              });
            }
          });
        }
      })

  }
}
  publishAll(ids: any, ftype: any, pubUnpubStatus: any, tableName:any = '') {

    // let puberroStatus: any = 0;
    // for (let klp of pubUnpubStatus) {
     
    //   if (klp.publishUnpublisStatus == 1) {
    // //alert("arpi");
    //     puberroStatus = 1;
    //     break;
    //   }
    // }
    // if (puberroStatus == 1) {
     
    //   Swal.fire({
    //     icon: 'error',
    //     text: 'Please select the unpublished record to publish' + '.',

    //   });
    //   return
    // }

    // if (ids.length == 0) {
    //   Swal.fire({
    //     icon: 'error',
    //     text: 'Please select the record you want to publish' + '.',

    //   });
    // }
    // else {

    //   let itemids = ids.toString();

    //   let letterParams = {
    //     "itemId": itemids,
    //     "itemStatus": "2",
    //     "tableName": tableName
    //   };

    //   Swal.fire({
    //     text: "You want to publish this record",
    //     icon: 'warning',
    //     showCancelButton: true,
    //     cancelButtonText: 'Cancel',
    //     confirmButtonColor: '#3085d6',
    //     cancelButtonColor: '#d33',
    //     confirmButtonText: 'Yes' + ', ' + 'publish it' + '!'
    //   }).then((result: any) => {

    //     if (result.isConfirmed) {

    //       this.commonService.publishAll(letterParams, ftype).subscribe((response: any) => {
    //         let respData = response.RESPONSE_DATA;
    //         let respToken = response.RESPONSE_TOKEN;
    //         let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
    //         if (respToken == verifyToken) {
    //           let res: any = Buffer.from(respData, 'base64');
    //           res = JSON.parse(res.toString());
    //           if (res.status == 200) {
    //             Swal.fire(
    //               'Published!',
    //               'Publish Records Successfully',
    //               'success'
    //             )
    //             $('.checkAll').prop('checked', false);
    //             this.callfunction.emit();
    //             this.callfunction3.emit();
    //           } else if (res.status == 417) {
    //             Swal.fire({
    //               icon: 'error',
    //               text: 'Invalid',
    //             });
    //           }
    //           else {
    //             Swal.fire({
    //               icon: 'error',
    //               text: 'Something Went Wrong',

    //             });
    //           }
    //         } else {
    //           Swal.fire({
    //             icon: 'error',
    //             text: 'Invalid',
    //           });
    //         }


    //       });

    //     }
    //   })



    // }
  }
  unpublishAll(ids: any, ftype: any, pubUnpubStatus: any, tableName:any = '') {
    // let puberroStatus: any = 0;
    // for (let klp of pubUnpubStatus) {
    //   if (klp.publishUnpublisStatus == 2) {
    //     puberroStatus = 2;
    //     break;
    //   }
    // }
    // if (puberroStatus == 2) {
    //   Swal.fire({
    //     icon: 'error',
    //     text: 'Please select the published record to unpublish' + '.',

    //   });
    //   return
    // }

    // if (ids.length == 0) {
    //   Swal.fire({
    //     icon: 'error',
    //     text: 'Please select the record you want to unpublish' + '.',

    //   });
    // }
    // else {
    //   let itemids = ids.toString();

    //   let letterParams = {
    //     "itemId": itemids,
    //     "itemStatus": "3",
    //     "tableName": tableName
    //   };
    //   Swal.fire({
    //     text: "You want to unpublish this record",
    //     icon: 'warning',
    //     showCancelButton: true,
    //     cancelButtonText: 'Cancel',
    //     confirmButtonColor: '#3085d6',
    //     cancelButtonColor: '#d33',
    //     confirmButtonText: 'Yes' + ', ' + 'unpublish it'
    //   }).then((result: any) => {
    //     if (result.isConfirmed) {
    //       this.commonService.unpublishAll(letterParams, ftype).subscribe((response: any) => {
    //         console.log(response)
    //         let respData = response.RESPONSE_DATA;
    //         let respToken = response.RESPONSE_TOKEN;
    //         let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
    //         if (respToken == verifyToken) {
    //           let res: any = Buffer.from(respData, 'base64');
    //           res = JSON.parse(res.toString());
    //           if (res.status == 200) {
    //             Swal.fire(
    //               'Unpublished !',
    //               'Unpublish Records Successfully' + '.',
    //               'success'
    //             )
    //             itemids = '';
    //             $('.checkAll').prop('checked', false);
    //             this.callfunction.emit();
    //             this.callfunction3.emit();
    //           } else if (res.status == 417) {
    //             Swal.fire({
    //               icon: 'error',
    //               text: 'Invalid',
    //             });
    //           }
    //           else {
    //             Swal.fire({
    //               icon: 'error',
    //               text: 'Something Went Wrong',

    //             });
    //           }
    //         } else {
    //           Swal.fire({
    //             icon: 'error',
    //             text: 'Invalid',
    //           });
    //         }
    //       });
    //     }
    //   })
    // }
  }
  addChangeEventForLabel() {
    // let sessionUserLangtoken: any = sessionStorage.getItem('USER_LANGPREF');
    // let sessionUserLang = JSON.parse(CryptoJS.AES.decrypt(sessionUserLangtoken, environment.apiHashingKey).toString(CryptoJS.enc.Utf8));
    // setTimeout(() => {
    //   this.langKey = sessionUserLang;
    //   let labelChangeEle: any = document.getElementById('languageListH');
    //   labelChangeEle.addEventListener('change', () => {
    //     this.langKey = labelChangeEle.value;
    //   });
    // }, 1000);

  }

  allPermissionList(processId:any){
    this.userPermissionDetails.forEach((ele: any) => {
      if(ele.intLinkId == processId){
        // console.log(processId);

        this.intDeleteRight         = ele.intDelete;
        this.intEditRight           = ele.intEditRight;
        this.intViewManageRight     = ele.intViewManageRight;
        this.intaddRight            = ele.intadd;
        this.intallRight            = ele.intall;
        this.publishRight           = ele.publish;

      }
      
    });
  }











/*

  message:any;
  @Input() childMessage:any;
  @Input() sendIds:any;
  @Input() funType:any;
  @Input() pubUnpubStatus:any
  @Input() activeDeactiveStatus: any;
  @Output("callfunction") callfunction:EventEmitter<any> = new EventEmitter();
  @Output("callfunction3") callfunction3:EventEmitter<any> = new EventEmitter();
   @Input() reloadUrl:any;

  constructor(private route: Router,
    private httpClient: HttpClient,
    private commonService: CommonconfigService,
    private _location: Location,
    private encDec:EncrypyDecrpyService ) { }
  
  ngOnInit(): void {



  }
  opensearch(){
    
    $(".search-container").toggleClass("active");
  }

  printTable(){
    let printContents;
    let popupWin:any;
    printContents =  $(".print-section").html();
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
  <html>
    <head>
    <link href="../../assets/css/print.css" rel="stylesheet">
     
    </head>
<body onload="window.print();window.close()">
<div class="header">
<img src="../../assets/img/logoblack.png">
</div>

${printContents}</body>
  </html>`
    );
    popupWin.document.close();
  }

  deleteAll(ids:any,ftype:any) {
  let encSchemeStr = this.encDec.encText(ids.toString());
  if(ids.length == 0){
    Swal.fire({
      icon: 'error',
      text: 'Please select the record you want to delete.',
      
    });
  }
else{
    var itemids = ids.toString(); 
     // alert(itemids);

      let letterParams = {
        "itemId":itemids,
        "itemStatus" :"1" 
   };

   Swal.fire({
    title: 'Are you sure?',
    text: "You want to delete this record",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result:any) => {
    if (result.isConfirmed) {
      this.commonService.deleteAll(letterParams,ftype).subscribe((response:any)=>{
        let respData = response.RESPONSE_DATA;
        let respToken = response.RESPONSE_TOKEN;
        let res = JSON.parse(atob(respData));  
        if(res.status==200){
          Swal.fire(
            'Deleted!',
            'Record has been deleted.',
            'success'
          )
          $('.checkAll').prop('checked', false);
          this.callfunction.emit();
           this.callfunction3.emit();
        }
        else{
         
          Swal.fire({
            icon: 'error',
            text: 'Something Went Wrong',
            
          }); 
        }
         
         });
    
     
  
    }
  })



        }
  }
  backClicked() {
    this._location.back();
  }
  publishAll(ids: any, ftype: any, pubUnpubStatus: any) {

    let puberroStatus: any = 0;
    for (let klp of pubUnpubStatus) {

      if (klp.publishUnpublisStatus == 1) {
        puberroStatus = 1;
        break;
      }
    }
    if (puberroStatus == 1) {
      Swal.fire({
        icon: 'error',
        text: ('Please select the unpublished record to publish')+'.',

      });
      return
    }

    if (ids.length == 0) {
      Swal.fire({
        icon: 'error',
        text: ('Please select the record you want to publish')+'.',

      });
    }
    else {

      let itemids = ids.toString();

      let letterParams = {
        "itemId": itemids,
        "itemStatus": "2"
      };

      Swal.fire({
        text: ("You want to publish this record"),
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText:('Cancel'),
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: ('Yes')+', '+('publish it')+'!'
      }).then((result: any) => {
          console.log(result);
        if (result.isConfirmed) {

          this.commonService.publishAll(letterParams, ftype).subscribe((res: any) => {
           
            if (res.status == 200) {

              Swal.fire(
                'Published!',
                ('Publish Records Successfully'),
                'success'
              )

              $('.checkAll').prop('checked', false);
              this.callfunction.emit();
              this.callfunction3.emit();
            }
            else {

              Swal.fire({
                icon: 'error',
                text: ('Something Went Wrong'),

              });
            }

          });

        }
      })



    }
  }
  unpublishAll(ids: any, ftype: any, pubUnpubStatus: any) {
    let puberroStatus: any = 0;
    for (let klp of pubUnpubStatus) {
      if (klp.publishUnpublisStatus == 0) {
        puberroStatus = 1;
        break;
      }
    }
    if (puberroStatus == 1) {
      Swal.fire({
        icon: 'error',
        text: ('Please select the published record to unpublish')+'.',

      });
      return
    }

    if (ids.length == 0) {
      Swal.fire({
        icon: 'error',
        text: ('Please select the record you want to unpublish')+'.',

      });
    }
    else {
      let itemids = ids.toString();

      let letterParams = {
        "itemId": itemids,
        "itemStatus": "3"
      };
      Swal.fire({
        text: ("You want to unpublish this record"),
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText:('Cancel'),
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: ('Yes')+', '+('unpublish it')
      }).then((result: any) => {
        if (result.isConfirmed) {
          this.commonService.unpublishAll(letterParams, ftype).subscribe((res: any) => {
          
            if (res.status == 200) {

              Swal.fire(
                'Unpublished !',
                ('Unpublish Records Successfully')+'.',
                'success'
              )
              itemids = '';
              $('.checkAll').prop('checked', false);
              this.callfunction.emit();
              this.callfunction3.emit();
            }
            else {

              Swal.fire({
                icon: 'error',
                text: ('Something Went Wrong'),

              });
            }

          });

        }
      })


    }
  }




  */
}
