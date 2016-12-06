import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tree'
})
export class TreePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let v: string;
    if (typeof value === 'object') {
      v = value.label;
    } else {
      v = value;
    }

    return v;
  }

}
