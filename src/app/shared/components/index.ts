import { ConfirmDeleteModalComponent } from './confirm-delete-modal/confirm-delete-modal.component';
import { DeletingItemComponent } from './deleting-item/deleting-item.component';
import { EventProgramDataComponent } from './event-program-data/event-program-data.component';
import { EventProgramEntryComponent } from './event-program-entry/event-program-entry.component';
import { EventProgramListComponent } from './event-program-list/event-program-list.component';
import { ProgramSectionComponent } from './program-section/program-section.component';
import { ProgramStageDataEntryComponent } from './program-stage-data-entry/program-stage-data-entry.component';
import { ProgramStageDataComponent } from './program-stage-data/program-stage-data.component';
import { RenderProgramStageDataComponent } from './render-program-stage-data/render-program-stage-data.component';
import { SetColumnsModalComponent } from './set-columns-modal/set-columns-modal.component';
import { SharingSettingsComponent } from './sharing-settings/sharing-settings.component';
import { TrackedEntityInstanceListComponent } from './tracked-entity-instance-list/tracked-entity-instance-list.component';
import { TrackedEntityInstanceSelectorComponent } from './tracked-entity-instance-selector/tracked-entity-instance-selector.component';
import { TrackedEntrityEntryFormComponent } from './tracked-entrity-entry-form/tracked-entrity-entry-form.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserRolesPanelSelectorComponent } from './user-roles-panel-selector/user-roles-panel-selector.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';

export const sharedComponents: any[] = [
  TrackedEntrityEntryFormComponent,
  ProgramStageDataEntryComponent,
  TrackedEntityInstanceListComponent,
  ConfirmDeleteModalComponent,
  TrackedEntityInstanceSelectorComponent,
  ProgramStageDataComponent,
  RenderProgramStageDataComponent,
  SetColumnsModalComponent,
  UserSettingsComponent,
  UserProfileComponent,
  UserRolesPanelSelectorComponent,
  DeletingItemComponent,
  EventProgramEntryComponent,
  EventProgramListComponent,
  ProgramSectionComponent,
  EventProgramDataComponent,
  SharingSettingsComponent,
];
