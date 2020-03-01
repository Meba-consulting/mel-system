import { createAction, props } from "@ngrx/store";

export enum ProceduresActionsTypes {
  LoadProceduresConfigurations = "[Procedures] load procedures configurations",
  AddLoadedProceduresConfigurations = "[Procedures] add loaded procedures configurations",
  LoadingProceduresConfigurationsFail = "[Procedures] loading procedures configurations fail",
  LoadDocuments = "[Procedures] load documents",
  AddLoadedDocuments = "[Procedures] add loaded procedures",
  LoadingDocumentsFail = "[Procedures] loading documents failed"
}

export const loadProceduresConfigurations = createAction(
  "[Procedures] load procedures configurations"
);

export const addLoadedProceduresConfigurations = createAction(
  "[Procedures] add loaded procedures configurations",
  props<{ proceduresConfigs: any }>()
);

export const loadingProceduresConfigurationsFail = createAction(
  "[Procedures] loading procedures configurations fail",
  props<{ error: any }>()
);

export const loadDocuments = createAction(
  "[Procedures] load documents",
  props<{ documents: any }>()
);

export const addLoadedDocuments = createAction(
  "[Procedures] add loaded procedures",
  props<{ documentsInfo: any }>()
);

export const loadingDocumentsFail = createAction(
  "[Procedures] loading documents failed",
  props<{ error: any }>()
);
