import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  OnChanges,
} from '@angular/core';
import { Store } from '@ngrx/store';

import * as _ from 'lodash';
import { State } from 'src/app/store';
import { LoadVisualizationAnalyticsAction } from '../../store';

@Component({
  selector: 'app-signle-value-visualization',
  templateUrl: './signle-value-visualization.component.html',
  styleUrls: ['./signle-value-visualization.component.css'],
})
export class SignleValueVisualizationComponent implements OnInit, OnChanges {
  @Input() visualizationLayers: any[];
  @Input() globalSelections: any;
  @Output() globalSelectionsChanged = new EventEmitter<any>();
  @Input() loadSingleValueAnalytics: boolean;
  @Input() id: string;

  formattedSingleValueObject: any = {};
  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    let valueIndex;
    let elementIndex;
    _.map(this.visualizationLayers[0]?.analytics?.headers, (header, index) => {
      if (header?.name == 'value') {
        valueIndex = index;
      }
    });

    _.map(this.visualizationLayers[0]?.analytics?.headers, (header, index) => {
      if (header?.name == 'dx') {
        elementIndex = index;
      }
    });
    _.map(this.visualizationLayers[0]?.analytics?.rows, (row) => {
      this.formattedSingleValueObject[
        'name'
      ] = this.visualizationLayers[0]?.analytics?.metaData?.names[
        row[elementIndex]
      ];
    });
    let value = 0;
    _.map(this.visualizationLayers[0]?.analytics?.rows, (row) => {
      value += Number(row[valueIndex]);
    });
    this.formattedSingleValueObject['value'] = value;

    this.formattedSingleValueObject['period'] = (_.filter(
      this.visualizationLayers[0]?.dataSelections,
      { dimension: 'pe' }
    ) || [])[0]?.title;
  }

  ngOnChanges() {}
}
