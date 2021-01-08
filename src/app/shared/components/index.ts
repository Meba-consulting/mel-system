import { ConfirmDeleteModalComponent } from './confirm-delete-modal/confirm-delete-modal.component';
import { ProgramStageDataEntryComponent } from './program-stage-data-entry/program-stage-data-entry.component';
import { ProgramStageDataComponent } from './program-stage-data/program-stage-data.component';
import { RenderProgramStageDataComponent } from './render-program-stage-data/render-program-stage-data.component';
import { TrackedEntityInstanceListComponent } from './tracked-entity-instance-list/tracked-entity-instance-list.component';
import { TrackedEntityInstanceSelectorComponent } from './tracked-entity-instance-selector/tracked-entity-instance-selector.component';
import { TrackedEntrityEntryFormComponent } from './tracked-entrity-entry-form/tracked-entrity-entry-form.component';

export const sharedComponents: any[] = [
  TrackedEntrityEntryFormComponent,
  ProgramStageDataEntryComponent,
  TrackedEntityInstanceListComponent,
  ConfirmDeleteModalComponent,
  TrackedEntityInstanceSelectorComponent,
  ProgramStageDataComponent,
  RenderProgramStageDataComponent,
];
