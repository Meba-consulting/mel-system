import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'filterByName',
  pure: false,
})
export class FilterByNamePipe implements PipeTransform {
  transform(arrayElements: any, searchingText: any): any {
    if (searchingText && arrayElements.length > 0) {
      let filteredArrayElement = [];
      let splittedText = searchingText;
      [',', '[', ']', '(', ')', ',', '.', '-', '_'].forEach((char) => {
        splittedText = splittedText.split(char).join(' ');
      });
      _.each(splittedText.split(' '), (partOfSearchingText) => {
        if (partOfSearchingText != '') {
          _.map(arrayElements, (element: any) => {
            if (
              (element.displayName &&
                element.displayName
                  .toLowerCase()
                  .indexOf(partOfSearchingText.toLowerCase()) > -1) ||
              (element.name &&
                element.name
                  .toLowerCase()
                  .indexOf(partOfSearchingText.toLowerCase()) > -1)
            ) {
              filteredArrayElement.push(element);
            }
          });
        }
      });
      return filteredArrayElement;
    } else {
      return arrayElements;
    }
  }
}
