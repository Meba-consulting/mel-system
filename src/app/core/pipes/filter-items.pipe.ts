import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterItems',
  pure: false
})
export class FilterItemsPipe implements PipeTransform {
  transform(items: any[], searchingText: any): any {
    const splittedName = searchingText ? searchingText.split(/[\.\-_,; ]/) : [];
    return splittedName.length > 0
      ? items.filter((item: any) =>
          splittedName.some(
            (nameString: string) =>
              item.name.toLowerCase().indexOf(nameString.toLowerCase()) !== -1
          )
        )
      : items;
  }
}
