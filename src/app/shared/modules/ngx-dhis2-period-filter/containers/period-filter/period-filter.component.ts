import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Fn } from '@iapps/function-analytics';
import {
  NgxDhis2HttpClientService,
  SystemInfo,
} from '@iapps/ngx-dhis2-http-client';
import { find } from 'lodash';

import { periodFilterConfig } from '../../constants/period-filter-config.constant';
import { getAvailablePeriods } from '../../helpers/get-available-periods.helper';
import { getSanitizedPeriods } from '../../helpers/get-sanitized-periods.helper';
import { removePeriodFromList } from '../../helpers/remove-period-from-list.helper';
import { PeriodFilterConfig } from '../../models/period-filter-config.model';

@Component({
  selector: 'ngx-dhis2-period-filter',
  templateUrl: './period-filter.component.html',
  styleUrls: ['./period-filter.component.css'],
})
export class PeriodFilterComponent implements OnInit, OnChanges, OnDestroy {
  @Input() selectedPeriodType: string;
  @Input() selectedPeriods: any[];
  @Input() periodFilterConfig: PeriodFilterConfig;

  @Output() update = new EventEmitter();
  @Output() close = new EventEmitter();
  @Output() change = new EventEmitter();

  availablePeriods: any[];
  selectedYear: number;
  currentYear: number;
  periodTypes: any[];
  periodInstance: any;
  showPeriodTypeSelection: boolean;

  constructor(private httpClient: NgxDhis2HttpClientService) {
    const periodTypeInstance = new Fn.PeriodType();
    this.periodInstance = new Fn.Period();

    // this.periodTypes = periodTypeInstance.get();
    // console.log(JSON.stringify(this.periodTypes));
    this.periodTypes = [
      {
        id: 'Monthly',
        name: 'Monthly',
        rank: 3,
      },
      {
        id: 'Quarterly',
        name: 'Quarterly',
        rank: 5,
      },
      {
        id: 'Yearly',
        name: 'Yearly',
        rank: 7,
      },
      {
        id: 'RelativeMonth',
        name: 'Relative Month',
        rank: 3,
      },
      {
        id: 'RelativeQuarter',
        name: 'Relative Quarter',
        rank: 5,
      },
      {
        id: 'RelativeYear',
        name: 'Relative Year',
        rank: 7,
      },
    ];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedPeriods && !changes.selectedPeriods.firstChange) {
      this._setPeriodProperties(null);
    }
  }

  ngOnInit() {
    if (this.periodFilterConfig && this.periodFilterConfig.lowestPeriodType) {
      const lowestPeriodType = find(this.periodTypes, [
        'id',
        this.periodFilterConfig.lowestPeriodType,
      ]);
      if (lowestPeriodType) {
        this.periodTypes = this.periodTypes.filter(
          (periodType: any) => periodType.rank >= lowestPeriodType.rank
        );
      }
    }

    // Initialize selected periods if not defined
    if (!this.selectedPeriods) {
      this.selectedPeriods = [];
    }

    this._setPeriodProperties(this.selectedPeriodType);
  }

  private _setPeriodProperties(selectedPeriodType) {
    this.httpClient.systemInfo().subscribe((systemInfo: SystemInfo) => {
      this.selectedPeriods = getSanitizedPeriods(
        this.selectedPeriods,
        this.periodFilterConfig,
        systemInfo.keyCalendar
      );

      this.periodFilterConfig = {
        ...periodFilterConfig,
        ...(this.periodFilterConfig || {}),
      };

      // Get selected period type if not supplied
      if (!selectedPeriodType) {
        if (this.selectedPeriods[0]) {
          this.selectedPeriodType = this.selectedPeriods[0].type || 'Monthly';
        } else {
          this.selectedPeriodType = 'Monthly';
        }
      }

      this.periodInstance
        .setType(this.selectedPeriodType)
        .setCalendar(systemInfo.keyCalendar)
        .setPreferences({
          childrenPeriodSortOrder:
            this.periodFilterConfig.childrenPeriodSortOrder || 'DESC',
          allowFuturePeriods: true,
        })
        .get();

      this.selectedYear = this.currentYear = this.periodInstance.currentYear();

      this._setAvailablePeriods();
    });
  }

  onSelectPeriod(period, e) {
    e.stopPropagation();
    if (this.periodFilterConfig.singleSelection) {
      this.availablePeriods = this.periodInstance.list();

      // Add back the removed period to the available period if applicable
      this.selectedPeriods = [];
    }

    // Remove selected period to available bucket
    this.availablePeriods = removePeriodFromList(this.availablePeriods, period);

    // Add selected period to selection bucket
    this.selectedPeriods = [...this.selectedPeriods, period];

    if (this.periodFilterConfig.emitOnSelection) {
      this._onUpdatePeriod(false);
    }
    this._setAvailablePeriods();
  }

  onDeselectPeriod(period: any, e) {
    e.stopPropagation();

    // Remove period from selection list
    this.selectedPeriods = removePeriodFromList(this.selectedPeriods, period);

    // Add back the removed period to the available period if applicable
    this._setAvailablePeriods();

    if (this.periodFilterConfig.emitOnSelection) {
      this._onUpdatePeriod(false);
    }
  }

  onUpdatePeriodType(e, selectedPeriodType: string) {
    e.stopPropagation();
    if (this.periodFilterConfig.resetOnPeriodTypeChange) {
      this.selectedPeriods = [];
    }

    this.showPeriodTypeSelection = false;

    this.selectedPeriodType = selectedPeriodType;
    this.periodInstance.setType(this.selectedPeriodType).get();

    this._setAvailablePeriods();
  }

  pushPeriod(e, direction: string) {
    e.stopPropagation();

    if (direction === 'NEXT') {
      this.selectedYear++;
    } else {
      this.selectedYear--;
    }

    this.periodInstance.setYear(this.selectedYear).get();
    this._setAvailablePeriods();
  }

  onSelectAllPeriods(e) {
    e.stopPropagation();

    // Add all period to selected bucket
    this.selectedPeriods = [...this.availablePeriods, ...this.selectedPeriods];

    // remove all periods from available
    this.availablePeriods = [];

    if (this.periodFilterConfig.emitOnSelection) {
      this._onUpdatePeriod(false);
    }
  }

  onDeselectAllPeriods(e) {
    e.stopPropagation();
    // remove all items from selected bucket
    this.selectedPeriods = [];

    // add to available period bucket
    this.availablePeriods = getAvailablePeriods([], this.periodInstance.list());

    if (this.periodFilterConfig.emitOnSelection) {
      this._onUpdatePeriod(false);
    }
  }

  onUpdate(e) {
    e.stopPropagation();
    this._onUpdatePeriod();
  }

  onClose(e) {
    e.stopPropagation();
    this.close.emit(this._getPeriodSelection());
  }

  onTogglePeriodTypeSelection(e) {
    e.stopPropagation();
    this.showPeriodTypeSelection = !this.showPeriodTypeSelection;
  }

  ngOnDestroy() {
    if (this.periodFilterConfig.emitOnDestroy) {
      this.close.emit(this._getPeriodSelection());
    }
  }

  private _getPeriodSelection() {
    return {
      items: this.selectedPeriods,
      dimension: 'pe',
      lowestPeriodType: this.periodFilterConfig.lowestPeriodType,
      changed: true,
    };
  }

  private _onUpdatePeriod(isUpdate: boolean = true) {
    if (isUpdate) {
      this.update.emit(this._getPeriodSelection());
    } else {
      this.change.emit(this._getPeriodSelection());
    }
  }

  private _setAvailablePeriods() {
    this.availablePeriods = getAvailablePeriods(
      this.selectedPeriods,
      this.periodInstance.list()
    );
  }
}
