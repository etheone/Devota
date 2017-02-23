import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unique'
})
export class UniquePipe implements PipeTransform {
      transform(items: any[], args: any[]): any {
        // filter items array, items which match and return true will be kept, false will be filtered out
        var deviceNames = [];
        var itemsToReturn = [];
        for(let item of items) {
          if(deviceNames.indexOf(item.device_name) == -1) {
            deviceNames.push(item.device_name);
            itemsToReturn.push(item);
          }
        }

        return itemsToReturn;
        
    }

  /*  filterNames(name, deviceNames) {
      if(deviceNames.indexOf(item)) {
        
      }
    }*/

}
