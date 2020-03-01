import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { pages } from './pages';
import { DataEntryRoutingModule } from './data-entry-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { DataEntryFormsEffects } from './store/effects/data-entry-forms.effects';
import { StoreModule } from '@ngrx/store';
import { dataEntryFormsReducer } from './store/reducers/data-entry-forms.reducer';
import { DataEntryComponent } from './pages/containers/data-entry/data-entry.component';
import { FormsModule } from '@angular/forms';
import { dataEntryFlowReducer } from './store/reducers/data-entry-flow.reducer';
import { DataEntryFlowEffects } from './store/effects/data-entry-flow.effects';
import { eventsReducer } from './store/reducers/events.reducer';
import { EventsEffects } from './store/effects/events.effects';

@NgModule({
  declarations: [...pages, DataEntryComponent],
  imports: [
    CommonModule,
    FormsModule,
    DataEntryRoutingModule,
    SharedModule,
    EffectsModule.forFeature([
      DataEntryFormsEffects,
      DataEntryFlowEffects,
      EventsEffects
    ]),
    StoreModule.forFeature('dataEntryForms', dataEntryFormsReducer),
    StoreModule.forFeature('dataEntryFlowConfigs', dataEntryFlowReducer),
    StoreModule.forFeature('events', eventsReducer)
  ]
})
export class DataEntryModule {}
