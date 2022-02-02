import { ConfirmDeleteModalComponent } from './confirm-delete-modal/confirm-delete-modal.component';
import { DeletingItemComponent } from './deleting-item/deleting-item.component';
import { DownloadFileResourceComponent } from './download-file-resource/download-file-resource.component';
import { EntrySideBarSummaryComponent } from './entry-side-bar-summary/entry-side-bar-summary.component';
import { EventProgramDataComponent } from './event-program-data/event-program-data.component';
import { EventProgramEntryComponent } from './event-program-entry/event-program-entry.component';
import { EventProgramListComponent } from './event-program-list/event-program-list.component';
import { InterpretationModalComponent } from './interpretation-modal/interpretation-modal.component';
import { MELHelpComponent } from './mel-help/mel-help.component';
import { MessagesModalComponent } from './messages-modal/messages-modal.component';
import { ProgramSectionComponent } from './program-section/program-section.component';
import { ProgramStageDataEntryComponent } from './program-stage-data-entry/program-stage-data-entry.component';
import { ProgramStageDataListComponent } from './program-stage-data-list/program-stage-data-list.component';
import { ProgramStageDataComponent } from './program-stage-data/program-stage-data.component';
import { ProgramStageEntryModalComponent } from './program-stage-entry-modal/program-stage-entry-modal.component';
import { RenderProgramStageDataComponent } from './render-program-stage-data/render-program-stage-data.component';
import { SetColumnsModalComponent } from './set-columns-modal/set-columns-modal.component';
import { ShareReportsInteprentationsComponent } from './share-reports-inteprentations/share-reports-inteprentations.component';
import { SharingSettingsComponent } from './sharing-settings/sharing-settings.component';
import { SuccessErrorModalComponent } from './success-error-modal/success-error-modal.component';
import { TrackedEntityInstanceListComponent } from './tracked-entity-instance-list/tracked-entity-instance-list.component';
import { TrackedEntityInstanceSelectorComponent } from './tracked-entity-instance-selector/tracked-entity-instance-selector.component';
import { TrackedEntrityEntryFormComponent } from './tracked-entrity-entry-form/tracked-entrity-entry-form.component';
import { UpdateStatusModalComponent } from './update-status-modal/update-status-modal.component';
import { UploadExcelDataModalComponent } from './upload-excel-data-modal/upload-excel-data-modal.component';
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
  EntrySideBarSummaryComponent,
  ProgramStageEntryModalComponent,
  UpdateStatusModalComponent,
  SuccessErrorModalComponent,
  UploadExcelDataModalComponent,
  ProgramStageDataListComponent,
  DownloadFileResourceComponent,
  MELHelpComponent,
  MessagesModalComponent,
  ShareReportsInteprentationsComponent,
  InterpretationModalComponent,
];

export const sharedEntryComponents: any[] = [
  MessagesModalComponent,
  InterpretationModalComponent,
];
