import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'summarizeSelection'
})
export class SummarizeSelectionPipe implements PipeTransform {
  transform(selectionList: any[], maxToShow: number = 1): any {
    const selectionNames = (selectionList || [])
      .map((selection: any) => selection.name)
      .filter(selectionName => selectionName);
    return selectionNames.join(', ');
  }
}
