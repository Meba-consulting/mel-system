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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { dataEntryFlowReducer } from './store/reducers/data-entry-flow.reducer';
import { DataEntryFlowEffects } from './store/effects/data-entry-flow.effects';
import { eventsReducer } from './store/reducers/events.reducer';
import { EventsEffects } from './store/effects/events.effects';
import { RenderEventsComponent } from './pages/containers/render-events/render-events.component';
import { EventTableComponent } from './pages/containers/render-events/event-table/event-table.component';
import { FormsComponent } from './components/forms/forms.component';
import { FormsListComponent } from './components/forms-list/forms-list.component';
import { EventsListComponent } from './components/events-list/events-list.component';
import { DataEntryDashboardComponent } from './pages/containers/data-entry-dashboard/data-entry-dashboard.component';
import { ProgramsListComponent } from './components/programs-list/programs-list.component';
import { ProgramUploadingComponent } from './components/program-uploading/program-uploading.component';
import { ProgramDataEntryComponent } from './pages/containers/program-data-entry/program-data-entry.component';
import { FileResourcesComponent } from './components/file-resources/file-resources.component';
import { FileResourcesListComponent } from './components/file-resources-list/file-resources-list.component';
import { ProgramEntryComponent } from './components/program-entry/program-entry.component';
import { FilterUserGroupPipe } from './pipes/filter-user-group.pipe';
import { EventsReportComponent } from './components/events-report/events-report.component';
import { EventsReportListComponent } from './components/events-report-list/events-report-list.component';
import { entryComponents } from './components';

@NgModule({
  declarations: [
    ...pages,
    ...entryComponents,
    DataEntryComponent,
    RenderEventsComponent,
    EventTableComponent,
    FormsComponent,
    FormsListComponent,
    EventsListComponent,
    DataEntryDashboardComponent,
    ProgramsListComponent,
    ProgramUploadingComponent,
    ProgramDataEntryComponent,
    FileResourcesComponent,
    FileResourcesListComponent,
    ProgramEntryComponent,
    FilterUserGroupPipe,
    EventsReportComponent,
    EventsReportListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DataEntryRoutingModule,
    SharedModule,
    EffectsModule.forFeature([
      DataEntryFormsEffects,
      DataEntryFlowEffects,
      EventsEffects,
    ]),
    StoreModule.forFeature('dataEntryForms', dataEntryFormsReducer),
    StoreModule.forFeature('dataEntryFlowConfigs', dataEntryFlowReducer),
    StoreModule.forFeature('events', eventsReducer),
  ],
  entryComponents: [...entryComponents],
})
export class DataEntryModule {}
