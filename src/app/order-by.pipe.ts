import { Pipe, PipeTransform } from '@angular/core';
import { Device } from './device';
@Pipe({ name: 'orderBy', pure: false })

export class DeviceOrderByPipe implements PipeTransform {
  transform(array: Array<Device>, args: string): Array<Device> {
    array.sort((a: any, b: any) => {
      if (a.updatedAt < b.updatedAt) {
        return 1;
      } else if (a.updatedAt > b.updatedAt) {
        return -1;
      } else {
        return 0;
      }
    });
    return array;
  }
}