import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  OnDestroy
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { removeInterventionFromList } from '../../helpers/remove-intervention-from-list.helper';
import { Intervention } from '../../models/intervention.model';
import { LoadInterventions } from '../../store/actions/intervention.actions';
import { State } from '../../store/reducers/intervention.reducer';
import {
  getInterventions,
  getInterventionsLoadingStatus
} from '../../store/selectors/intervention.selectors';

@Component({
  selector: 'app-intervention-filter',
  templateUrl: './intervention-filter.component.html',
  styleUrls: ['./intervention-filter.component.css']
})
export class InterventionFilterComponent
  implements OnInit, OnChanges, OnDestroy {
  @Input() selectedInterventions: any[];
  @Input()
  interventionFilterConfig: any = {
    resetOnInterventionTypeChange: false,
    emitOnSelection: false,
    singleSelection: false
  };

  @Output() update = new EventEmitter();
  @Output() close = new EventEmitter();

  availableInterventions$: Observable<Intervention[]>;
  loadingInterventions$: Observable<boolean>;

  interventionTypes: any[];

  constructor(private store: Store<State>) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes.selectedInterventions &&
      !changes.selectedInterventions.firstChange
    ) {
      this._setAvailableInterventions();
    }
  }

  ngOnInit() {
    // Initialize selected interventions if not defined
    if (!this.selectedInterventions) {
      this.selectedInterventions = [];
    }

    this.store.dispatch(new LoadInterventions());

    this.loadingInterventions$ = this.store.select(
      getInterventionsLoadingStatus
    );

    this._setAvailableInterventions();
  }

  onSelectIntervention(intervention, e) {
    e.stopPropagation();

    if (this.interventionFilterConfig.singleSelection) {
      this.selectedInterventions = [];
    }

    // Add selected intervention to selection bucket
    this.selectedInterventions = [...this.selectedInterventions, intervention];

    this._setAvailableInterventions();
  }

  onDeselectIntervention(intervention: any, e) {
    e.stopPropagation();

    // Remove intervention from selection list
    this.selectedInterventions = removeInterventionFromList(
      this.selectedInterventions,
      intervention
    );

    this._setAvailableInterventions();
  }

  updateInterventionType(interventionType: string, e) {
    e.stopPropagation();

    if (this.interventionFilterConfig.resetOnInterventionTypeChange) {
      this.selectedInterventions = [];
    }

    this._setAvailableInterventions();
  }

  onSelectAllInterventions(e, availableInterventions: any[]) {
    e.stopPropagation();

    // Add all intervention to selected bucket
    this.selectedInterventions = availableInterventions;

    this._setAvailableInterventions();

    if (this.interventionFilterConfig.emitOnSelection) {
      this._onUpdateIntervention();
    }
  }

  onDeselectAllInterventions(e) {
    e.stopPropagation();
    // remove all items from selected bucket
    this.selectedInterventions = [];

    // add to available intervention bucket
    this._setAvailableInterventions();

    if (this.interventionFilterConfig.emitOnSelection) {
      this._onUpdateIntervention();
    }
  }

  onUpdate(e) {
    e.stopPropagation();
    this._onUpdateIntervention();
  }

  onClose(e) {
    e.stopPropagation();
    this.close.emit(this._getInterventionSelection());
  }

  private _getInterventionSelection() {
    return {
      items: this.selectedInterventions,
      dimension: 'intervention',
      changed: true
    };
  }

  private _onUpdateIntervention() {
    this.update.emit(this._getInterventionSelection());
  }

  private _setAvailableInterventions() {
    this.availableInterventions$ = this.store.select(
      getInterventions(this.selectedInterventions)
    );
  }

  ngOnDestroy() {
    this.close.emit(this._getInterventionSelection());
  }
}
