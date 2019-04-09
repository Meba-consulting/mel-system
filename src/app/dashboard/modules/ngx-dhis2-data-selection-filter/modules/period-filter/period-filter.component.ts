import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';

import {
  addPeriodToList,
  getAvailablePeriods,
  getSelectedPeriodsType,
  removePeriodFromList
} from './helpers ';
import * as fromPeriodFilterModel from './period-filter.model';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-period-filter',
  templateUrl: './period-filter.component.html',
  styleUrls: ['./period-filter.component.css']
})
export class PeriodFilterComponent implements OnInit, OnChanges {
  @Input() selectedPeriodType;
  @Input() selectedPeriods: any[];
  @Input()
  periodConfig: any = {
    resetOnPeriodTypeChange: false,
    emitOnSelection: false,
    singleSelection: false
  };
  @Output() periodFilterUpdate = new EventEmitter();
  @Output() periodFilterClose = new EventEmitter();

  availablePeriods: any[];
  selectedYear: number;
  currentYear: number;
  periodTypes: any[];

  constructor() {
    const date = new Date();
    this.selectedYear = date.getFullYear();
    this.currentYear = date.getFullYear();
    this.periodTypes = fromPeriodFilterModel.PERIOD_TYPES;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedPeriods && !changes.selectedPeriods.firstChange) {
      this.selectedPeriodType = getSelectedPeriodsType(this.selectedPeriods);

      this.availablePeriods = getAvailablePeriods(
        this.selectedPeriodType,
        this.selectedYear,
        this.selectedPeriods
      );
    }
  }

  ngOnInit() {
    if (!this.selectedPeriodType) {
      this.selectedPeriodType = getSelectedPeriodsType(this.selectedPeriods);
    }

    this.availablePeriods = getAvailablePeriods(
      this.selectedPeriodType,
      this.selectedYear,
      this.selectedPeriods
    );
  }

  onSelectPeriod(period, e) {
    e.stopPropagation();

    if (this.periodConfig.singleSelection) {
      this.selectedPeriods = [];
    }

    // Add selected period to selection bucket
    this.selectedPeriods = [...this.selectedPeriods, period];

    // Remove selected period to available bucket
    this.availablePeriods = removePeriodFromList(this.availablePeriods, period);
  }

  onDeselectPeriod(period: any, e) {
    e.stopPropagation();

    // Remove period from selection list
    this.selectedPeriods = removePeriodFromList(this.selectedPeriods, period);

    // Add back the removed period to the available period if applicable
    this.availablePeriods = addPeriodToList(this.availablePeriods, {
      ...period,
      type: period.type || getSelectedPeriodsType([period])
    });
  }

  updatePeriodType(periodType: string, e) {
    e.stopPropagation();

    if (this.periodConfig.resetOnPeriodTypeChange) {
      this.selectedPeriods = [];
    }

    this.availablePeriods = getAvailablePeriods(
      periodType,
      this.selectedYear,
      this.selectedPeriods
    );
  }

  pushPeriodBackward(e) {
    e.stopPropagation();
    this.selectedYear--;
    this.availablePeriods = getAvailablePeriods(
      this.selectedPeriodType,
      this.selectedYear,
      this.selectedPeriods
    );
  }

  pushPeriodForward(e) {
    e.stopPropagation();
    this.selectedYear++;
    this.availablePeriods = getAvailablePeriods(
      this.selectedPeriodType,
      this.selectedYear,
      this.selectedPeriods
    );
  }

  onSelectAllPeriods(e) {
    e.stopPropagation();

    // Add all period to selected bucket
    this.selectedPeriods = this.availablePeriods;

    // remove all periods from available
    this.availablePeriods = [];

    if (this.periodConfig.emitOnSelection) {
      this.getPeriodOutput();
    }
  }

  onDeselectAllPeriods(e) {
    e.stopPropagation();
    // remove all items from selected bucket
    this.selectedPeriods = [];

    // add to available period bucket
    this.availablePeriods = getAvailablePeriods(
      this.selectedPeriodType,
      this.selectedYear,
      []
    );

    if (this.periodConfig.emitOnSelection) {
      this.getPeriodOutput();
    }
  }

  updatePeriod(e) {
    e.stopPropagation();
    this.getPeriodOutput();
  }

  getPeriodOutput() {
    this.periodFilterUpdate.emit({
      items: this.selectedPeriods,
      dimension: 'pe',
      changed: true
    });
  }

  closePeriodFilter(e) {
    e.stopPropagation();
    this.periodFilterClose.emit({
      items: this.selectedPeriods,
      dimension: 'pe',
      changed: true
    });
  }
}
