import { Pipe, PipeTransform } from '@angular/core';
import { filter, find } from 'lodash';

@Pipe({
  name: 'removeItems',
})
export class RemoveItemsPipe implements PipeTransform {
  transform(items: any, itemsToRemove: any[]): any {
    return filter(
      items || [],
      (item: any) => !find(itemsToRemove, ['id', item.id])
    );
  }
}
