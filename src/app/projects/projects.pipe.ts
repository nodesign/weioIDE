import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'projectsPipe'
})
export class ProjectsPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    console.log(value, args);
    return null;
  }

}
