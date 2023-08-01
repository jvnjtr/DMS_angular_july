import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'metasearch'
})
export class MetasearchPipe implements PipeTransform {

  transform(value: any,args?: any): any {
    if(!args){
      return value;
    }
    return value.filter((val:any)=>{
      let rVal=(val.metaName.toLocaleLowerCase().includes(args)) || ( val.description.toLocaleLowerCase().includes(args) || (val.createdOn.includes(args)) ||  (val.createdBy.toLocaleLowerCase().includes(args)));
      return rVal;
    })
  }

}
