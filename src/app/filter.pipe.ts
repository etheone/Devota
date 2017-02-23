import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

      transform(items: any[], arg: string): any {
        // filter items array, items which match and return true will be kept, false will be filtered out
        var itemsToReturn = [];
        console.log("in filter pipe");
        console.log(arg);
        if(arg == "") {
          return items;
        } else {
          for(let item of items) {
            if(item.DeviceId == arg) {
              itemsToReturn.push(item);
            }
          }
        }
        return itemsToReturn;
    }

}
