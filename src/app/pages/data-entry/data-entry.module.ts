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
import { RenderEventsComponent } from './pages/containers/render-events/render-events.component';
import { EventTableComponent } from './pages/containers/render-events/event-table/event-table.component';
import { FormsComponent } from './components/forms/forms.component';
import { FormsListComponent } from './components/forms-list/forms-list.component';
import { EventsListComponent } from './components/events-list/events-list.component';
import { BatchControlComponent } from './components/batch-control/batch-control.component';
import { DataEntryDashboardComponent } from './pages/containers/data-entry-dashboard/data-entry-dashboard.component';
import { CorrectiveActionsComponent } from './pages/containers/corrective-actions/corrective-actions.component';
import { FortificationComponent } from './pages/containers/fortification/fortification.component';
import { WasteEnergyManagementComponent } from './pages/containers/waste-energy-management/waste-energy-management.component';
import { HumanResourceManagementComponent } from './pages/containers/human-resource-management/human-resource-management.component';
import { ProgramsListComponent } from './components/programs-list/programs-list.component';
import { ProgramUploadingComponent } from './pages/containers/program-uploading/program-uploading.component';
import { ProgramDataEntryComponent } from './pages/containers/program-data-entry/program-data-entry.component';

@NgModule({
  declarations: [...pages, DataEntryComponent, RenderEventsComponent, EventTableComponent, FormsComponent, FormsListComponent, EventsListComponent, BatchControlComponent, DataEntryDashboardComponent, CorrectiveActionsComponent, FortificationComponent, WasteEnergyManagementComponent, HumanResourceManagementComponent, ProgramsListComponent, ProgramUploadingComponent, ProgramDataEntryComponent],
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
