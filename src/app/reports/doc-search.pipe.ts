import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'docSearch'
})
export class DocSearchPipe implements PipeTransform {

  transform(value: any,args?: any): any {
    if(!args){
      return value;
    }
    return value.filter((val:any)=>{
        let rVal= (val.SearchedKeyWord.toLocaleLowerCase().includes(args) || val.typeName.toLocaleLowerCase().includes(args) || val.createdOn.includes(args) || val.totalCount.toString().includes(args) ) ;
      return rVal;
    })
  }
}
// || val.totalCount.includes(args) || val.typeName.includes(args) || (val.createdOn.includes(args))