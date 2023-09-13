import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { CommonconfigService } from 'src/app/services/commonconfig.service';

@Injectable({
  providedIn: 'root'
})
export class ValidatorchecklistService {

  constructor(private comConfigServ :CommonconfigService) { }

  blockSpecialCharacterAllPostion(evt:any,type:any=0)
  {
    if((type == true) || (type == 'true') || evt.target.type=="email"){
      return true;
    }
  
    let txtValue:string = evt.target.value;
    let length = txtValue.length;
    let validStatus = true;
    
    if(txtValue.charCodeAt(0) == 32)  {
     
      evt.target.value='';
    }

    switch (txtValue.charCodeAt(length-1)) {
      case 44:
      {
        
         // viewAlert(", Not allowed!!!");

          validStatus =  false;
          break;
      }

      case 47:
      {
        
          validStatus =  false;
          break;
      }

      case 58:
      {
        
          validStatus =  false;
          break;
      }

      case 46:
      {
        
        validStatus =  false;
        break;
      }

      case 39:
      {
        
        validStatus =  false;
        break;
      }

      // case 32:
      // {
      //     Swal.fire({
      //       icon: 'error',
      //       text: 'White Space not allowed'+'!!!'
      //     });
      //     validStatus =  false;
      //     break;
      //    // return false;
      // }

      case 40:
      {
        
        validStatus =  false;
       break;
      }

      case 41:
      {
        

        validStatus =  false;
        break;
      }

      case 45:
      {
          
          validStatus =  false;
            break;
      }

      case 95:
      {if(type !=1)
        {
          
          validStatus =  false;
        }

        break;
      }

      case 59:
      {
        
        validStatus =  false;
        break;
      }

      case 124:
      {

        
        validStatus =  false;
        break;
      }

      case 63:
      {
        
        validStatus =  false;
        break;
      }


      case 34:
      {
        
        validStatus =  false;
        break;
      }

      case 35:
      {
        
        validStatus =  false;
        break;

      }

      case 36:
      {
        
        validStatus =  false;
        break;
      }

      case 38:
      {
        
        validStatus =  false;
        break;
      }

      case 126:
      {
        
        validStatus =  false;
        break;
      }

      case 96:
      {
       
        validStatus =  false;
        break;
      }

      case 33:
      {
        
        validStatus =  false;
        break;
      }

      case 37:
      {
        
        validStatus =  false;
        break;
      }

      case 94:
      {
        
        validStatus =  false;
        break;
      }

      case 42:
      {
        
        validStatus =  false;
        break;
      }
      case 92:
      {
        
        validStatus =  false;
        break;
      }

      case 43:
      {
        
        validStatus =  false;
        break;
      }
      case 61:
      {
        
        validStatus =  false;
        break;
      }
      case 123:
      {
       
        validStatus =  false;
        break;
      }

      case 125:
      {
       
        validStatus =  false;
        break;
      }

      case 91:
      {
        
        validStatus =  false;
        break;
      }

      case 93:
      {
        
        validStatus =  false;
        break;
      }

      case 60:
      {
        
        validStatus =  false;
        break;
      }

      case 62:
      {
        
        validStatus =  false;
        break;
      }
      case 64:
      {
       
        validStatus =  false;
        break;
      }
      default :
      validStatus =  true;
      break;
     }
  if(validStatus == false)
    {
      // (<HTMLInputElement>document.getElementById(evt.target.id)).value='';
      evt.target.value='';
    }
    return validStatus;


    if(evt.target.value.indexOf(' ') > 0)
      {
        Swal.fire({
          icon: 'error',
          text: 'Space not allowed'
        });
        // (<HTMLInputElement>document.getElementById(evt.target.id)).value='';
        evt.target.value='';
        return false;
      }
      return true;



  }




  blankCheck(elmVal: any, msg: any, elmId: any = "") {
  //  alert("hey");
    if (elmVal == '' || typeof (elmVal) == undefined || elmVal == null) {
      Swal.fire({
        icon: 'error',
        text: msg
      }).then(function () {
        if (elmId != "") {
          setTimeout(() => {
            const element = <HTMLInputElement>document.getElementById(elmId);
            element.focus();
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }, 500);
        }
      });
      return false;
    }
    return true;
  }

  blankImgCheck(elmVal:any, msg:any)
  {
      if(elmVal == '' || typeof (elmVal) == undefined || elmVal == null)
      {
        Swal.fire({
          icon: 'error',
          text: this.comConfigServ.langReplace('Please')+' '+msg
        });
        return false;
      }
      return true;
  }

  blankCheckRdo(elmNm:any, msg:any,elmId:any="")
  {
    
      let ele = document.getElementsByName(elmNm);
      let checkedCtr:number = 0;
      for(let i = 0; i < ele.length; i++) {

         if((ele[i] as HTMLInputElement).checked)
         {
          
          checkedCtr++;
         }

      }
      if(checkedCtr==0)
      {
        Swal.fire({
          icon: 'error',
          text: this.comConfigServ.langReplace('Select')+' '+msg
        }).then(function(){

          if(elmId!="")

          {

            setTimeout(() => {

              (<HTMLInputElement>document.getElementById(elmId)).focus();

               (<HTMLInputElement>document.getElementById(elmId)).scrollTo(
                {top: (<HTMLInputElement>document.getElementById(elmId)).getBoundingClientRect().top -
                  document.body.getBoundingClientRect().top -50}
                );

            }, 500);

          }

        });

        return false;
      }
      return true;
  }
  isNumericKey(elmId:any,elmVal: any) {
   let  msg: any='';
    if(elmVal !=''){
      var val = /^[0-9]+$/;
      if (val.test(elmVal)) {
        return true;
      }
      else {
        Swal.fire({
          icon: 'error',
          text: msg + ' Only Numeric Value Allowed!'
        }).then(function () {
          if (elmId != "") {
            setTimeout(() => {
              const element = <HTMLInputElement>document.getElementById(elmId);
              element.focus();
              element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 500);
          }
        });
        return false;
      }
    }return true;
   
  }

  isAlphaNumericKey(elmId:any,elmVal: any) {
    let msg='';
    var val = /^[0-9a-zA-Z @.-/,]*$/;
    if (val.test(elmVal)) {
      return true;
    }
    else {
      Swal.fire({
        icon: 'error',
        text: msg + ' Only Alpha-Numeric Value Allowed!'
      }).then(function () {
        if (elmId != "") {
          setTimeout(() => {
            const element = <HTMLInputElement>document.getElementById(elmId);
            element.focus();
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }, 500);
        }
      });
      return false;
    }
  }




  blankCheckRdoDynamic(clsName:any, msg:any,elmId:any="")
  
 {
  // alert("jj");


  let className =  'cls_'+clsName;

  let ele = document.getElementsByClassName(className);

  let checkedCtr:number = 0;

  for(let i = 0; i < ele.length; i++) {



     if((ele[i] as HTMLInputElement).checked)

     {

     

      checkedCtr++;

     }



  }

  if(checkedCtr==0)

  {

    Swal.fire({

      icon: 'error',

      text: this.comConfigServ.langReplace('Select')+' '+msg

    }).then(function(){

     // console.log()

      if(ele[0]!=undefined )

      {

        setTimeout(() => {



          (<HTMLInputElement>document.getElementById(ele[0].id)?.closest('div')).focus();



          (<HTMLInputElement>document.getElementById(ele[0].id)).scrollIntoView();



        }, 500);

      }



    });



    return false;

  }

  return true;

}


  blankCheckChkboxDynamic(clsName:any, msg:any,elmId:any="")
  {
    // alert("Arpita");
      let className =  'cls_'+clsName;
      let ele = document.getElementsByClassName(className);
      let checkedCtr:number = 0;
      for(let i = 0; i < ele.length; i++) {

         if((ele[i] as HTMLInputElement).checked)
         {
        
          checkedCtr++;
         }

      }
      if(checkedCtr==0)
      {
        Swal.fire({
          icon: 'error',
          text: this.comConfigServ.langReplace('Select')+' '+msg
        }).then(function(){

          if(elmId!="")

          {

            setTimeout(() => {

              (<HTMLInputElement>document.getElementById(elmId)).focus();

               (<HTMLInputElement>document.getElementById(elmId)).scrollTo(
                {top: (<HTMLInputElement>document.getElementById(elmId)).getBoundingClientRect().top -
                  document.body.getBoundingClientRect().top -50}
                );

            }, 500);

          }

        });

        return false;
      }
      return true;
  }

  selectDropdown(elmVal:any, msg:any,elmId:any="")
  {
      if(elmVal == 0 || elmVal == '' || typeof (elmVal) == undefined || elmVal == null)
      {
        Swal.fire({
          icon: 'error',
          text: this.comConfigServ.langReplace('Select')+' '+msg
        }).then(function(){

          if(elmId!="")

          {

            setTimeout(() => {
              const element = <HTMLInputElement>document.getElementById(elmId);
              element.focus();
              element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 500);

          }

        });
        return false;
      }
      return true;
  }
  maxLength(elmVal:any,fldLngth:any, msg:any,elmId:any="")
  {
      if(elmVal.length>0 && elmVal.length>fldLngth)
      {
        Swal.fire({
          icon: 'error',
          text: msg+' '+this.comConfigServ.langReplace('should not more than')+' ' + fldLngth + ' '+this.comConfigServ.langReplace('character')
        }).then(function(){

          if(elmId!="")

          {

            setTimeout(() => {
              const element = <HTMLInputElement>document.getElementById(elmId);
              element.focus();
              element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 500);

          }

        });
        return false;
      }
      return true;
  }

  minLength(elmVal:any,fldLngth:any, msg:any,elmId:any="")
  {
   
      if(elmVal.length>0 && elmVal.length<fldLngth)
      {
        //alert("hii");
        Swal.fire({
          icon: 'error',
          text: msg+' '+this.comConfigServ.langReplace('should not be less than')+' ' + fldLngth + ' '+this.comConfigServ.langReplace('character')
        }).then(function(){

          if(elmId!="")

          {

            setTimeout(() => {
              const element = <HTMLInputElement>document.getElementById(elmId);
              element.focus();
              element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 500);

          }

        });
        return false;
      }
      return true;
  }


  validEmail(elmVal:any,elmId:any="")
  {
  
   
      let pattern = new RegExp(/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/);
      if (elmVal != '')
      {
    
          if (pattern.test(elmVal) == true)
            return true;
          else
          {
            Swal.fire({
              icon: 'error',
              text: this.comConfigServ.langReplace('Please enter a valid email id')
            }).then(function(){

              if(elmId!="")
    
              {
    
                setTimeout(() => {
                  const element = <HTMLInputElement>document.getElementById(elmId);
                  element.focus();
                  element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 500);
    
              }
    
            });
    
    
            return false;
          }
      }
      return true;
  }
  validMob(elmVal:any,elmId:any="")
  {
      let pattern = new RegExp(/^[6-9][0-9]{9}$/);
      if (elmVal != '')
      {
          if (pattern.test(elmVal) == true)
            return true;
          else
          {
            Swal.fire({
              icon: 'error',
              text: this.comConfigServ.langReplace('Please enter a valid mobile no')
            }).then(function(){

              if(elmId!="")
    
              {
    
                setTimeout(() => {
                  const element = <HTMLInputElement>document.getElementById(elmId);
                  element.focus();
                  element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 500);
    
              }
    
            });
            return false;
          }
      }
      return true;
  }

  blockspecialchar_first(evt:any,blockStatus:boolean)
    {
      let validStatus = true;
      if(blockStatus == true)
        {
          return validStatus;
        }

      let txtValue:string = evt.target.value;
      // console.log(txtValue);
      // if(txtValue.length == 0)
      //   {
      //     Swal.fire({
      //       icon: 'error',
      //       text: this.comConfigServ.langReplace('White Space not allowed in 1st Place')+"!!!"
      //     });
      //     (<HTMLInputElement>document.getElementById(evt.target.id)).value='';
      //     return false;
      //   }
      switch (txtValue.charCodeAt(0)) {
        case 44:
        {
          Swal.fire({
            icon: 'error',
            text: ', '+this.comConfigServ.langReplace('Not allowed in 1st Place')+'!!!'
          });
           // viewAlert(", Not allowed in 1st Place!!!");

            validStatus =  false;
            break;
        }

        case 47:
        {
          Swal.fire({
            icon: 'error',
            text: '/ '+this.comConfigServ.langReplace('Not allowed in 1st Place')+'!!!'
          });
            validStatus =  false;
            break;
        }

        case 58:
        {
          Swal.fire({
            icon: 'error',
            text: ': '+this.comConfigServ.langReplace('Not allowed in 1st Place')+'!!!'
          });
            validStatus =  false;
            break;
        }

        case 46:
        {
          Swal.fire({
            icon: 'error',
            text: '. '+this.comConfigServ.langReplace('Not allowed in 1st Place')+'!!!'
          });
          validStatus =  false;
          break;
        }

        case 39:
        {
          Swal.fire({
            icon: 'error',
            text: this.comConfigServ.langReplace('Single Quote not allowed in 1st Place')+'!!!'
          });
          validStatus =  false;
          break;
        }

        case 32:
        {
            Swal.fire({
              icon: 'error',
              text: this.comConfigServ.langReplace('White Space not allowed in 1st Place')+'!!!'
            });
            validStatus =  false;
            break;
           // return false;
        }

        case 40:
        {
          Swal.fire({
            icon: 'error',
            text: this.comConfigServ.langReplace('Not allowed in 1st Place')+'!!!'
          });
          validStatus =  false;
         break;
        }

        case 41:
        {
          Swal.fire({
            icon: 'error',
            text: ') '+this.comConfigServ.langReplace('Not allowed in 1st Place')+'!!!'
          });

          validStatus =  false;
          break;
        }

        case 45:
        {
            Swal.fire({
              icon: 'error',
              text: '- '+this.comConfigServ.langReplace('Not allowed in 1st Place')+'!!!'
            });
            validStatus =  false;
              break;
        }

        case 95:
        {
          Swal.fire({
            icon: 'error',
            text: '"_ '+this.comConfigServ.langReplace('Not allowed in 1st Place')+'!!!'
          });
          validStatus =  false;
          break;
        }

        case 59:
        {
          Swal.fire({
            icon: 'error',
            text: '"; '+this.comConfigServ.langReplace('Not allowed in 1st Place')+'!!!'
          });
          validStatus =  false;
          break;
        }

        case 124:
        {

          Swal.fire({
            icon: 'error',
            text: '"| '+this.comConfigServ.langReplace('Not allowed in 1st Place')+'!!!'
          });
          validStatus =  false;
          break;
        }

        case 63:
        {
          Swal.fire({
            icon: 'error',
            text: '"? '+this.comConfigServ.langReplace('Not allowed in 1st Place')+'!!!'
          });
          validStatus =  false;
          break;
        }


        case 34:
        {
          Swal.fire({
            icon: 'error',
            text: '" '+this.comConfigServ.langReplace('Not allowed in 1st Place')+'!!!'
          });
          validStatus =  false;
          break;
        }

        case 35:
        {
          Swal.fire({
            icon: 'error',
            text: '# '+this.comConfigServ.langReplace('Not allowed in 1st Place')+'!!!'
          });
          validStatus =  false;
          break;

        }

        case 36:
        {
          Swal.fire({
            icon: 'error',
            text: '$ '+this.comConfigServ.langReplace('Not allowed in 1st Place')+'!!!'
          });
          validStatus =  false;
          break;
        }

        case 38:
        {
          Swal.fire({
            icon: 'error',
            text: '& '+this.comConfigServ.langReplace('Not allowed in 1st Place')+'!!!'
          });
          validStatus =  false;
          break;
        }

        case 126:
        {
          Swal.fire({
            icon: 'error',
            text: '~ '+this.comConfigServ.langReplace('Not allowed in 1st Place')+'!!!'
          });
          validStatus =  false;
          break;
        }

        case 96:
        {
          Swal.fire({
            icon: 'error',
            text: '` '+this.comConfigServ.langReplace('Not allowed in 1st Place')+'!!!'
          });
          validStatus =  false;
          break;
        }

        case 33:
        {
          Swal.fire({
            icon: 'error',
            text: '! '+this.comConfigServ.langReplace('Not allowed in 1st Place')+'!!!'
          });
          validStatus =  false;
          break;
        }

        case 37:
        {
          Swal.fire({
            icon: 'error',
            text: '% '+this.comConfigServ.langReplace('Not allowed in 1st Place')+'!!!'
          });
          validStatus =  false;
          break;
        }

        case 94:
        {
          Swal.fire({
            icon: 'error',
            text: '^ '+this.comConfigServ.langReplace('Not allowed in 1st Place')+'!!!'
          });
          validStatus =  false;
          break;
        }

        case 42:
        {
          Swal.fire({
            icon: 'error',
            text: '* '+this.comConfigServ.langReplace('Not allowed in 1st Place')+'!!!'
          });
          validStatus =  false;
          break;
        }
        case 92:
        {
          Swal.fire({
            icon: 'error',
            text: '\\ '+this.comConfigServ.langReplace('Not allowed in 1st Place')+'!!!'
          });
          validStatus =  false;
          break;
        }

        case 43:
        {
          Swal.fire({
            icon: 'error',
            text: '+ '+this.comConfigServ.langReplace('Not allowed in 1st Place')+'!!!'
          });
          validStatus =  false;
          break;
        }
        case 61:
        {
          Swal.fire({
            icon: 'error',
            text: '= '+this.comConfigServ.langReplace('Not allowed in 1st Place')+'!!!'
          });
          validStatus =  false;
          break;
        }
        case 123:
        {
          Swal.fire({
            icon: 'error',
            text: '{ '+this.comConfigServ.langReplace('Not allowed in 1st Place')+'!!!'
          });
          validStatus =  false;
          break;
        }

        case 125:
        {
          Swal.fire({
            icon: 'error',
            text: '} '+this.comConfigServ.langReplace('Not allowed in 1st Place')+'!!!'
          });
          validStatus =  false;
          break;
        }

        case 91:
        {
          Swal.fire({
            icon: 'error',
            text: '[ '+this.comConfigServ.langReplace('Not allowed in 1st Place')+'!!!'
          });
          validStatus =  false;
          break;
        }

        case 93:
        {
          Swal.fire({
            icon: 'error',
            text: '] '+this.comConfigServ.langReplace('Not allowed in 1st Place')+'!!!'
          });
          validStatus =  false;
          break;
        }

        case 60:
        {
          Swal.fire({
            icon: 'error',
            text: '< '+this.comConfigServ.langReplace('Not allowed in 1st Place')+'!!!'
          });
          validStatus =  false;
          break;
        }

        case 62:
        {
          Swal.fire({
            icon: 'error',
            text: '> '+this.comConfigServ.langReplace('Not allowed in 1st Place')+'!!!'
          });
          validStatus =  false;
          break;
        }
        case 64:
        {
          Swal.fire({
            icon: 'error',
            text: '@ '+this.comConfigServ.langReplace('Not allowed in 1st Place')+'!!!'
          });
          validStatus =  false;
          break;
        }
        default :
        validStatus =  true;
        break;
    }
    if(validStatus == false)
      {
        // (<HTMLInputElement>document.getElementById(evt.target.id)).value='';
        evt.target.value='';
      }
      return validStatus;
    }




    checkForSpecialCharacterAllPostion(evt:any,type:any)
    {
      // ||evt.target.type=="email"
      if(type == true ){
        return true;
      }
     
      let txtValue:string = evt.target.value;
      let length = txtValue.length;
      let validStatus = true;
      
      if(txtValue.charCodeAt(0) == 32)  {
        Swal.fire({
          icon: 'error',
          text: 'White space '+'not allowed in first place'+'!!!'
        });
        evt.target.value='';
      }

      switch (txtValue.charCodeAt(length-1)) {
        case 44:
        {
          Swal.fire({
            icon: 'error',
            text: ', '+'Not allowed'+'!!!'
          });
           // viewAlert(", Not allowed!!!");

            validStatus =  false;
            break;
        }

        case 47:
        {
          Swal.fire({
            icon: 'error',
            text: '/ '+'Not allowed'+'!!!'
          });
            validStatus =  false;
            break;
        }

        case 58:
        {
          Swal.fire({
            icon: 'error',
            text: ': '+'Not allowed'+'!!!'
          });
            validStatus =  false;
            break;
        }

        case 46:
        {
          Swal.fire({
            icon: 'error',
            text: '. '+'Not allowed'+'!!!'
          });
          validStatus =  false;
          break;
        }

        case 39:
        {
          Swal.fire({
            icon: 'error',
            text: 'Single Quote not allowed'+'!!!'
          });
          validStatus =  false;
          break;
        }

        case 32:
        {
            Swal.fire({
              icon: 'error',
              text: 'White Space not allowed'+'!!!'
            });
            validStatus =  false;
            break;
           // return false;
        }

        case 40:
        {
          Swal.fire({
            icon: 'error',
            text: 'Not allowed'+'!!!'
          });
          validStatus =  false;
         break;
        }

        case 41:
        {
          Swal.fire({
            icon: 'error',
            text: ') '+'Not allowed'+'!!!'
          });

          validStatus =  false;
          break;
        }

        case 45:
        {
            Swal.fire({
              icon: 'error',
              text: '- '+'Not allowed'+'!!!'
            });
            validStatus =  false;
              break;
        }

        case 95:
        {if(type !=1)
          {
            Swal.fire({
              icon: 'error',
              text: '"_ '+'Not allowed'+'!!!'
            });
            validStatus =  false;
          }

          break;
        }

        case 59:
        {
          Swal.fire({
            icon: 'error',
            text: '"; '+'Not allowed'+'!!!'
          });
          validStatus =  false;
          break;
        }

        case 124:
        {

          Swal.fire({
            icon: 'error',
            text: '"| '+'Not allowed'+'!!!'
          });
          validStatus =  false;
          break;
        }

        case 63:
        {
          Swal.fire({
            icon: 'error',
            text: '"? '+'Not allowed'+'!!!'
          });
          validStatus =  false;
          break;
        }


        case 34:
        {
          Swal.fire({
            icon: 'error',
            text: '" '+'Not allowed'+'!!!'
          });
          validStatus =  false;
          break;
        }

        case 35:
        {
          Swal.fire({
            icon: 'error',
            text: '# '+'Not allowed'+'!!!'
          });
          validStatus =  false;
          break;

        }

        case 36:
        {
          Swal.fire({
            icon: 'error',
            text: '$ '+'Not allowed'+'!!!'
          });
          validStatus =  false;
          break;
        }

        case 38:
        {
          Swal.fire({
            icon: 'error',
            text: '& '+'Not allowed'+'!!!'
          });
          validStatus =  false;
          break;
        }

        case 126:
        {
          Swal.fire({
            icon: 'error',
            text: '~ '+'Not allowed'+'!!!'
          });
          validStatus =  false;
          break;
        }

        case 96:
        {
          Swal.fire({
            icon: 'error',
            text: '` '+'Not allowed'+'!!!'
          });
          validStatus =  false;
          break;
        }

        case 33:
        {
          Swal.fire({
            icon: 'error',
            text: '! '+'Not allowed'+'!!!'
          });
          validStatus =  false;
          break;
        }

        case 37:
        {
          Swal.fire({
            icon: 'error',
            text: '% '+'Not allowed'+'!!!'
          });
          validStatus =  false;
          break;
        }

        case 94:
        {
          Swal.fire({
            icon: 'error',
            text: '^ '+'Not allowed'+'!!!'
          });
          validStatus =  false;
          break;
        }

        case 42:
        {
          Swal.fire({
            icon: 'error',
            text: '* '+'Not allowed'+'!!!'
          });
          validStatus =  false;
          break;
        }
        case 92:
        {
          Swal.fire({
            icon: 'error',
            text: '\\ '+'Not allowed'+'!!!'
          });
          validStatus =  false;
          break;
        }

        case 43:
        {
          Swal.fire({
            icon: 'error',
            text: '+ '+'Not allowed'+'!!!'
          });
          validStatus =  false;
          break;
        }
        case 61:
        {
          Swal.fire({
            icon: 'error',
            text: '= '+'Not allowed'+'!!!'
          });
          validStatus =  false;
          break;
        }
        case 123:
        {
          Swal.fire({
            icon: 'error',
            text: '{ '+'Not allowed'+'!!!'
          });
          validStatus =  false;
          break;
        }

        case 125:
        {
          Swal.fire({
            icon: 'error',
            text: '} '+'Not allowed'+'!!!'
          });
          validStatus =  false;
          break;
        }

        case 91:
        {
          Swal.fire({
            icon: 'error',
            text: '[ '+'Not allowed'+'!!!'
          });
          validStatus =  false;
          break;
        }

        case 93:
        {
          Swal.fire({
            icon: 'error',
            text: '] '+'Not allowed'+'!!!'
          });
          validStatus =  false;
          break;
        }

        case 60:
        {
          Swal.fire({
            icon: 'error',
            text: '< '+'Not allowed'+'!!!'
          });
          validStatus =  false;
          break;
        }

        case 62:
        {
          Swal.fire({
            icon: 'error',
            text: '> '+'Not allowed'+'!!!'
          });
          validStatus =  false;
          break;
        }
        case 64:
        {
          Swal.fire({
            icon: 'error',
            text: '@ '+'Not allowed'+'!!!'
          });
          validStatus =  false;
          break;
        }
        default :
        validStatus =  true;
        break;
       }
    if(validStatus == false)
      {
        // (<HTMLInputElement>document.getElementById(evt.target.id)).value='';
        evt.target.value='';
      }
      return validStatus;


      if(evt.target.value.indexOf(' ') > 0)
        {
          Swal.fire({
            icon: 'error',
            text: 'Space not allowed'
          });
          // (<HTMLInputElement>document.getElementById(evt.target.id)).value='';
          evt.target.value='';
          return false;
        }
        return true;

    }
    textareaSpecialCharacterAllPostion(evt:any,type:any=0)
    {
      let txtValue:string = evt.target.value;
     // console.log(evt.target.value);
      let length = txtValue.length;
      let validStatus = true;

      switch (txtValue.charCodeAt(length-1)) {
        case 47:
        {
          Swal.fire({
            icon: 'error',
            text: '/ '+'Not allowed'+'!!!'
          });
            validStatus =  false;
            break;
        }
        case 58:
        {
          Swal.fire({
            icon: 'error',
            text: ': '+'Not allowed'+'!!!'
          });
            validStatus =  false;
            break;
        }
        case 39:
        {
          Swal.fire({
            icon: 'error',
            text: 'Single Quote not allowed'+'!!!'
          });
          validStatus =  false;
          break;
        }
        case 95:
        {if(type !=1)
          {
            Swal.fire({
              icon: 'error',
              text: '"_ '+'Not allowed'+'!!!'
            });
            validStatus =  false;
          }

          break;
        }
        case 59:
        {
          Swal.fire({
            icon: 'error',
            text: '"; '+'Not allowed'+'!!!'
          });
          validStatus =  false;
          break;
        }
        case 124:
        {

          Swal.fire({
            icon: 'error',
            text: '"| '+'Not allowed'+'!!!'
          });
          validStatus =  false;
          break;
        }
        case 34:
        {
          Swal.fire({
            icon: 'error',
            text: '" '+'Not allowed'+'!!!'
          });
          validStatus =  false;
          break;
        }
        case 35:
        {
          Swal.fire({
            icon: 'error',
            text: '# '+'Not allowed'+'!!!'
          });
          validStatus =  false;
          break;

        }
        case 36:
        {
          Swal.fire({
            icon: 'error',
            text: '$ '+'Not allowed'+'!!!'
          });
          validStatus =  false;
          break;
        }
        case 38:
        {
          Swal.fire({
            icon: 'error',
            text: '& '+'Not allowed'+'!!!'
          });
          validStatus =  false;
          break;
        }
        case 126:
        {
          Swal.fire({
            icon: 'error',
            text: '~ '+'Not allowed'+'!!!'
          });
          validStatus =  false;
          break;
        }
        case 96:
        {
          Swal.fire({
            icon: 'error',
            text: '` '+'Not allowed'+'!!!'
          });
          validStatus =  false;
          break;
        }
        case 33:
        {
          Swal.fire({
            icon: 'error',
            text: '! '+'Not allowed'+'!!!'
          });
          validStatus =  false;
          break;
        }
        case 37:
        {
          Swal.fire({
            icon: 'error',
            text: '% '+'Not allowed'+'!!!'
          });
          validStatus =  false;
          break;
        }
        case 94:
        {
          Swal.fire({
            icon: 'error',
            text: '^ '+'Not allowed'+'!!!'
          });
          validStatus =  false;
          break;
        }
        case 42:
        {
          Swal.fire({
            icon: 'error',
            text: '* '+'Not allowed'+'!!!'
          });
          validStatus =  false;
          break;
        }
        case 92:
        {
          Swal.fire({
            icon: 'error',
            text: '\\ '+'Not allowed'+'!!!'
          });
          validStatus =  false;
          break;
        }
        case 43:
        {
          Swal.fire({
            icon: 'error',
            text: '+ '+'Not allowed'+'!!!'
          });
          validStatus =  false;
          break;
        }
        case 61:
        {
          Swal.fire({
            icon: 'error',
            text: '= '+'Not allowed'+'!!!'
          });
          validStatus =  false;
          break;
        }
        case 123:
        {
          Swal.fire({
            icon: 'error',
            text: '{ '+'Not allowed'+'!!!'
          });
          validStatus =  false;
          break;
        }

        case 125:
        {
          Swal.fire({
            icon: 'error',
            text: '} '+'Not allowed'+'!!!'
          });
          validStatus =  false;
          break;
        }

        case 91:
        {
          Swal.fire({
            icon: 'error',
            text: '[ '+'Not allowed'+'!!!'
          });
          validStatus =  false;
          break;
        }

        case 93:
        {
          Swal.fire({
            icon: 'error',
            text: '] '+'Not allowed'+'!!!'
          });
          validStatus =  false;
          break;
        }

        case 60:
        {
          Swal.fire({
            icon: 'error',
            text: '< '+'Not allowed'+'!!!'
          });
          validStatus =  false;
          break;
        }

        case 62:
        {
          Swal.fire({
            icon: 'error',
            text: '> '+'Not allowed'+'!!!'
          });
          validStatus =  false;
          break;
        }
        case 64:
        {
          Swal.fire({
            icon: 'error',
            text: '@ '+'Not allowed'+'!!!'
          });
          validStatus =  false;
          break;
        }
        default :
        validStatus =  true;
        break;
       }
    if(validStatus == false)
      {
        // (<HTMLInputElement>document.getElementById(evt.target.id)).value='';
        evt.target.value='';
      }
      return validStatus;


      if(evt.target.value.indexOf(' ') > 0)
        {
          Swal.fire({
            icon: 'error',
            text: 'Space not allowed'
          });
          // (<HTMLInputElement>document.getElementById(evt.target.id)).value='';
          evt.target.value='';
          return false;
        }
        return true;

    }

  validPassword(elmVal:any,elmId:any="")
  {
      let pattern = new RegExp(/^.*(?=.{8,15})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&!%()*?]).*$/);
      if (elmVal != '')
      {
        //alert("hii");
          if (pattern.test(elmVal) == true)
            return true;
          else
          {
            Swal.fire({
              icon: 'error',
              text: this.comConfigServ.langReplace('Please enter a valid password')
            }).then(function(){

              if(elmId!="")
    
              {
    
                setTimeout(() => {
    
                  (<HTMLInputElement>document.getElementById(elmId)).focus();
    
                   (<HTMLInputElement>document.getElementById(elmId)).scrollTo(
                {top: (<HTMLInputElement>document.getElementById(elmId)).getBoundingClientRect().top -
                  document.body.getBoundingClientRect().top -50}
                );
    
                }, 500);
    
              }
    
            });
            return false;
          }
      }
      return true;
  }

// validates Aadhar number received as string
  validAadhar(elmVal:any) {
    if (elmVal != '')
      {
          // multiplication table
          const d = [
            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
            [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
            [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
            [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
            [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
            [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
            [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
            [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
            [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
          ]

          // permutation table
          const p = [
            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
            [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
            [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
            [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
            [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
            [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
            [7, 0, 4, 6, 9, 1, 3, 2, 5, 8]
          ]
          let c = 0
          let invertedArray = elmVal.split('').map(Number).reverse()

          invertedArray.forEach((val:any, i:any) => {
            c = d[c][p[(i % 8)][val]]
          })
          if (c === 0)
            return true;
          else
          {
            Swal.fire({
              icon: 'error',
              text: this.comConfigServ.langReplace('Please enter a valid aadhaar no')
            });
            return false;
          }
      }
      return true;
  }

  isCharKey(event:any){
    var charCode2 = (event.which) ? event.which : event.keyCode
    if (charCode2 > 32 && (charCode2 < 65 || charCode2 > 90) &&
            (charCode2 < 97 || charCode2 > 122) ) {
        return false;
    }
    return true;
  }
  isCharKeyMob(val: any) {
    return val.replace(/[^a-zA-z ]/g, '');
  }


  isNumberKey(event:any)
  {
      let charCode = (event.which) ? event.which : event.keyCode
      if (charCode > 31 && (charCode < 48 || charCode > 57))
          return false;
      return true;
  }
  isNumberKeyMob(val: any) {
    return val.replace(/[^0-9]/g, '');
  }

  isAlphaNumeric(event:any){
    console.log(event);
    const charCode2 = (event.which) ? event.which : event.keyCode
    if (charCode2 > 32 && (charCode2 < 65 || charCode2 > 90) && (charCode2 < 97 || charCode2 > 122) && (charCode2 > 31 && (charCode2 < 48 || charCode2 > 57) )) {
        return false;
    }

    return true;

  }


  isAlphaNumericDynamic(event:any,blockSpecialChars:any){
      let isshift:any=event.shiftKey;
      const charCode2 = (event.which) ? event.which : event.keyCode
        if(blockSpecialChars == false){
            if (charCode2 > 32 && (charCode2 < 65 || charCode2 > 90) && (charCode2 < 97 || charCode2 > 122) && (charCode2 > 31 && (charCode2 < 48 || charCode2 > 57) )) {
                return false;
            }
            return true;
        }
        else if( blockSpecialChars == true){
              if(((isshift==false) && charCode2 >= 48 && charCode2 <=57) || ((isshift==false) && charCode2 >= 65 && charCode2 <=90) || (charCode2==8) || ((isshift==false) && charCode2==190) || ((isshift==false) && charCode2 == 188) ||((isshift==false) && charCode2 == 189)|| ((isshift == true) && (charCode2 == 191) || (charCode2==48) || (charCode2==57) ))
              return true;

            }
        return false;
    
  }

  allowspecialChar(event:any){

    const charCode2 = (event.which) ? event.which : event.keyCode
    if (charCode2 > 32 && (charCode2 < 65 || charCode2 > 90) && (charCode2 < 97 || charCode2 > 122) && (charCode2 > 31 && (charCode2 <= 48 || charCode2 >= 57) && (charCode2 >= 188 || charCode2 <= 191))) {
        return false;
    }

    return true;

  }


  isAlphaNumericMob(val:any){
    var numPattern = new RegExp(/^[a-zA-Z0-9-.@ /]*$/);
    if (numPattern.test(val))
      return true;
    return false;
  }

  isDecimal(event:any){
    let charCode = (event.which) ? event.which : event.keyCode;
    var txtVal = event.target.value;
    if ((charCode > 47 && charCode < 58) || charCode == 46 || charCode == 8 || charCode == 190)
    {
        if (txtVal.indexOf(".") > 0 && charCode == 190)
        {
          return false;
        }
        else
            return true;
    }
    return false;
  }

  isDecimalMob(val: any) {
    return val.replace(/[^\d+(\.\d{1,2}]/g, '');
  }


  dynCtrlVal(ctrlValParam:any,elemObj:any)
  {
    let dynData       = ctrlValParam['dynDataObj'];
    let elmVal        = ctrlValParam['ctrlVal'];
    let drftSts       = ctrlValParam['drftSts'];
    let dispNnSts     = ctrlValParam['dispNnSts'];
    let sectnCtrlType = ctrlValParam['ctrlType'];
    let ctrlNm      = '';
    let lblName     = '';
    let ctrlType    = 0;
    let mndSts      = 0;
    let fldLngth    = 0;
    if(sectnCtrlType==8)
    {
      ctrlNm      = '';
      lblName     = dynData['columnName'];
      ctrlType    = dynData['columnType'];
      mndSts      = (dispNnSts===false)?dynData['columnMnd']:0;
      fldLngth    = dynData['fieldLen'];
    }
    else{
      ctrlNm      = dynData['jsnControlArray'][0]['ctrlName'];
      lblName     = dynData['vchLabelName'];
      ctrlType    = dynData['tinControlType'];
      mndSts      = (dispNnSts===false)?dynData['tinMandatorySts']:0;
      fldLngth    = dynData['intFieldLength'];
    }

    let valSts = true;

    // for select tag
    if (mndSts==1 && ctrlType==2) {
      if(drftSts==false)
      {
        if(!this.selectDropdown(elmVal,lblName))
        {
          valSts = false;
        }
      }
    }
    // for radio button
    else if (mndSts==1 && (ctrlType==5 || ctrlType==1)) {
      if(drftSts==false)
      {
        if(!this.blankCheckRdoDynamic(ctrlNm,lblName))
        {
          valSts = false;
        }
      }
    }
    // for text box
    else if (mndSts==1 && ctrlType==6) {;
      if(drftSts==false)
      {
        if(!this.blankCheck(elmVal,lblName))
        {
          valSts = false;
          //dynData.focus();
        }
      }
      if(!this.maxLength(elmVal,fldLngth,lblName))
      {
        valSts = false;
        //dynData.focus();
      }
    }
    // for text area
    else if (mndSts==1 && ctrlType==7) {
      if(drftSts==false)
      {
        if(!this.blankCheck(elmVal,lblName))
        {
          valSts = false;
          //dynData.focus();
        }
      }
      if(!this.maxLength(elmVal,fldLngth,lblName))
      {
        valSts = false;
        //dynData.focus();
      }
    }

    // for date box
    else if (mndSts==1 && ctrlType==9) {
      if(drftSts==false)
      {
        if(!this.blankCheck(elmVal,lblName))
        {
          valSts = false;
        }
      }
    }

    // for time box
    else if (mndSts==1 && ctrlType==10) {
      if(drftSts==false)
      {
        if(!this.blankCheck(elmVal,lblName))
        {
          valSts = false;
        }
      }
    }

    // for date time box
    else if (mndSts==1 && ctrlType==11) {
      if(drftSts==false)
      {
        if(!this.blankCheck(elmVal,lblName))
        {
          valSts = false;
        }
      }
    }

    else{
      valSts = true;
    }
    return valSts;
  }

  isDashSlashNumeric(event:any){
    let charCode = (event.which) ? event.which : event.keyCode
    // console.log(charCode);
    if (charCode > 31 && (charCode < 45 || charCode > 57 || charCode==46))
        return false;
    return true;
  }
  isDashSlashNumericMob(val: any) {
    return val.replace(/[^0-9/-]/g, '');
  }
  is_url(str:any)
  {
    if(str=='' || str == null)
  {
    return true;
  }
  else
  { 
      // let regexp =  /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
      let regexp=/^https?\:\/\/[^\/\s]+(\/.*)?$/;      //Accept both private and domain api url
      if (regexp.test(str))
          {
            return true;
          }
          else
          {
            Swal.fire({
              icon: 'error',
              text: this.comConfigServ.langReplace('Enter valid URL')
            });
            return false;
          }
      
      }
  }
  chkPassword(str:any)
  {
    let regexp =  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
          if (regexp.test(str))
          {
            return true;
          }
          else
          {

            return false;
          }
  }
  chkblankspace(evt:any)
  {
    var inputVal = evt?.target?.value;
    // console.log(inputVal);
    
    var regexp = /^\S*$/
          if (regexp.test(inputVal))
          {
            return true;
          }
          else
          {
            Swal.fire({
              icon: 'error',
              text: this.comConfigServ.langReplace('Space not allowed')
            });
            (<HTMLInputElement>document.getElementById(evt.target.id)).value='';
            return false;
          }
  }
  validateFile(fileUploadType: string ,actualFileType:any) {
    // var ext = fileUploadType.substring(fileUploadType.lastIndexOf('/') + 1);
    // console.log(ext)
    // if(ext.indexOf(".") > 0)
    // {
    //   ext = ext.substring(fileUploadType.lastIndexOf('.') + 1);
    // }
  
     if (actualFileType.includes(fileUploadType)) {
        return true;
     }
     else {
         return false;
     }
}
    validateFileSize(uploadedFileSize:any,actualFileSize:any,actualFileSizeType:any)
    {

      if (actualFileSizeType.toLowerCase() == 'kb')
      {
        actualFileSize = 1024*actualFileSize;
      }
      else
      {
        actualFileSize = 1024*1024*actualFileSize;
      }

      let fileValidStatus = true;
        if(uploadedFileSize > actualFileSize)
          {
            fileValidStatus = false;
          }
      return fileValidStatus;
    }

    tablenameval(obj:any) {
      obj.target.value=obj.target.value.toUpperCase().replaceAll("-", "_");
    }

    checkForSpaceInAllPostion(evt:any)
      {
       
        // console.log(evt.target);
        
        if(evt.target.value.indexOf(' ') > 0)
          {
            Swal.fire({
              icon: 'error',
              text: this.comConfigServ.langReplace('Space not allowed')
            });
            (<HTMLInputElement>document.getElementById(evt.target.id)).value='';
            return false;
          }
          return true;

      }

      // splregaxValidation(obj:any)
      // {
      //   let regexp=/[!@#$%^&*()+\=\[\]{};':"\\|,.<>\/?]/;
      //   if (regexp.test(obj))
      //         {
      //           return true;
      //         }
      //         else
      //         {
      //           Swal.fire({
      //             icon: 'error',
      //             text: this.comConfigServ.langReplace('Special character not allowed except _')
      //           });
      //           return false;
      //         }
      // }

}
