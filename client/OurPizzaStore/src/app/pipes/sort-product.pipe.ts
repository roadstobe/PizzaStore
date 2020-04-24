import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortProduct'
})
export class SortProductPipe implements PipeTransform {

  transform(value: any[], sort) {
    if(!sort){
      return  value
    }
    return value.filter(el => el.kind.indexOf(sort) > -1)
  }

}
