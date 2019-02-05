import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { DynamicDimension } from '../models/dynamic-dimension.model';

export enum DynamicDimensionActionTypes {
  LoadDynamicDimensions = '[DynamicDimension] Load DynamicDimensions',
  InitiateDynamicDimensions = '[DynamicDimension] Initiate DynamicDimensions',
  LoadDynamicDimensionsFail = '[DynamicDimension] Load DynamicDimensions fail',
  AddDynamicDimensions = '[DynamicDimension] Add DynamicDimensions'
}

export class InitiateDynamicDimensionsAction implements Action {
  readonly type = DynamicDimensionActionTypes.InitiateDynamicDimensions;
}
export class LoadDynamicDimensionsAction implements Action {
  readonly type = DynamicDimensionActionTypes.LoadDynamicDimensions;
}

export class AddDynamicDimensionsAction implements Action {
  readonly type = DynamicDimensionActionTypes.AddDynamicDimensions;

  constructor(public dynamicDimensions: DynamicDimension[]) {}
}

export class LoadDynamicDimensionsFailAction implements Action {
  readonly type = DynamicDimensionActionTypes.LoadDynamicDimensionsFail;
  constructor(public error: any) {}
}

export type DynamicDimensionActions =
  | InitiateDynamicDimensionsAction
  | LoadDynamicDimensionsAction
  | AddDynamicDimensionsAction
  | LoadDynamicDimensionsFailAction;
