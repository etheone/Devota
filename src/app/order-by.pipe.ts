import { Pipe, PipeTransform } from '@angular/core';
import { Device } from './device';
@Pipe({ name: 'orderBy', pure: false })

export class DeviceOrderByPipe implements PipeTransform {
  transform(array: Array<any>, arg1: string, arg2: boolean): Array<any> {
    array.sort((a: any, b: any) => {
      if (arg2) {
        if (a[arg1] > b[arg1]) {
          return 1;
        } else if (a[arg1] < b[arg1]) {
          return -1;
        } else {
          return 0;
        }
      } else {
        if (a[arg1] < b[arg1]) {
          return 1;
        } else if (a[arg1] > b[arg1]) {
          return -1;
        } else {
          return 0;
        }
      }
    });
    return array;
  }
}