import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'capitalizeItemName'
})
export class CapitalizeItemNamePipe implements PipeTransform {
  transform(name: string, ...args: unknown[]): unknown {
    return _.capitalize(name);
  }
}
