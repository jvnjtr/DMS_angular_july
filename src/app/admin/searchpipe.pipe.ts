import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'folderSearch'
})
export class SearchpipePipe implements PipeTransform {

  transform(value: any,args?: any): any {
    if(!args){
      return value;
    }
    return value.filter((val:any)=>{
      let rVal=(val.folderName.toLocaleLowerCase().includes(args)) || (val.folderSize.includes(args) || (val.createdAt.includes(args)) ||  (val.createdByName.toLocaleLowerCase().includes(args)));
      return rVal;
    })
  }

}
// <td>{{flist.createdAt}}</td>
// <td>{{flist.createdByName}}</td>