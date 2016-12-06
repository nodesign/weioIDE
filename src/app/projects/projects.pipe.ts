import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'projectsPipe'
})
export class ProjectsPipe implements PipeTransform {

  arr: Array<any> = [];

  transform(value: any, args?: any): any {

    return value.map((item, index) => {
      console.log('item', item, 'index', index, 'type', typeof item);
      return item;
    });
  }

  getChildren(items) {
    items.map((item,index)=>{

    });
  }

}
