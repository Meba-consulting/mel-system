import { Action } from '@ngrx/store';
import { DashboardGroups } from '../../dashboard/models/dashboard-groups.model';
import { User, SystemInfo } from '../../models';

export enum DashboardGroupsActionTypes {
  InitializeDashboardGroups = '[DashboardGroups] initialize dashboard group',
  InitializeDashboardGroupSuccess = '[DashboardGroups] initialize dashboard group success',
  LoadDashboardGroups = '[DashboardGroups] Load dashboard group',
  AddDashboardGroups = '[DashboardGroups] Add dashboard group',
  SetActiveDashboardGroup = '[DashboardGroups] Set Active Dashboard group',
  SetActiveDashboardGroupFail = '[DashboardGroups] Set Active Dashboard group fail',
  LoadDashboardGroupsFail = '[DashboardGroups] Load dashboard group fails'
}

export class InitializeDashboardGroupsAction implements Action {
  readonly type = DashboardGroupsActionTypes.InitializeDashboardGroups;
  constructor(public dashboardSettings: any) {}
}

export class InitializeDashboardGroupsActionSuccess implements Action {
  readonly type = DashboardGroupsActionTypes.InitializeDashboardGroupSuccess;
  constructor(
    public dashboardGroups: DashboardGroups[],
    public activeGroup: DashboardGroups,
    public currentDashboardId: string
  ) {}
}

export class LoadDashboardGroupsAction implements Action {
  readonly type = DashboardGroupsActionTypes.LoadDashboardGroups;
  constructor(public currentUser: User, public systemInfo: SystemInfo) {}
}

export class SetActiveDashboardGroupsAction implements Action {
  readonly type = DashboardGroupsActionTypes.SetActiveDashboardGroup;
  constructor(
    public activeGroup: DashboardGroups,
    public currentDashboardId?: string
  ) {}
}

export class SetActiveDashboardGroupsActionFail implements Action {
  readonly type = DashboardGroupsActionTypes.SetActiveDashboardGroupFail;
  constructor(public error: any) {}
}

export class AddDashboardGroupsAction implements Action {
  readonly type = DashboardGroupsActionTypes.AddDashboardGroups;
  constructor(
    public dashboardGroups: DashboardGroups,
    public currentUser: User,
    public systemInfo: SystemInfo
  ) {}
}
export class LoadDashboardGroupsFailAction implements Action {
  readonly type = DashboardGroupsActionTypes.LoadDashboardGroupsFail;
  constructor(public error: any, public currentUser: User) {}
}

export type DashboardGroupsActions =
  | InitializeDashboardGroupsAction
  | LoadDashboardGroupsAction
  | LoadDashboardGroupsFailAction
  | SetActiveDashboardGroupsAction
  | SetActiveDashboardGroupsActionFail
  | InitializeDashboardGroupsActionSuccess
  | AddDashboardGroupsAction;
