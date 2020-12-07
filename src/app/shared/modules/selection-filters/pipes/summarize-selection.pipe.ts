import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'summarizeSelection'
})
export class SummarizeSelectionPipe implements PipeTransform {
  transform(selectionList: any[], maxToShow: number = 1): any {
    const selectionNames = _.take(
      (selectionList || [])
        .map((selection: any) => selection.name)
        .filter(selectionName => selectionName),
      8
    );
    return selectionNames.join(', ');
  }
}
