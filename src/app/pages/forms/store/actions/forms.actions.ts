import { createAction, props } from "@ngrx/store";

export enum FormsActionsTypes {
  LoadFormsConfigurations = "[Forms] load Forms configurations",
  AddLoadedFormsConfigurations = "[Forms] add loaded Forms configurations",
  LoadingFormsConfigurationsFail = "[Forms] loading Forms configurations fail",
  LoadFormsDocuments = "[Forms] load documents",
  AddLoadedDocuments = "[Forms] add loaded Forms",
  LoadingDocumentsFail = "[Forms] loading documents failed"
}

export const loadFormsConfigurations = createAction(
  "[Forms] load Forms configurations"
);

export const addLoadedFormsConfigurations = createAction(
  "[Forms] add loaded Forms configurations",
  props<{ formsConfigs: any }>()
);

export const loadingFormsConfigurationsFail = createAction(
  "[Forms] loading Forms configurations fail",
  props<{ error: any }>()
);

export const loadFormsDocuments = createAction(
  "[Forms] load documents",
  props<{ documents: any }>()
);

export const addLoadedDocuments = createAction(
  "[Forms] add loaded Forms",
  props<{ documentsInfo: any }>()
);

export const loadingFormsDocumentsFail = createAction(
  "[Forms] loading documents failed",
  props<{ error: any }>()
);
