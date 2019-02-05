import { DashboardAccess } from './dashboard-access.model';

export interface Dashboard {
  id: string;
  name: string;
  created?: string;
  lastUpdated?: string;
  description?: string;
  bookmarked?: boolean;
  bookmarkPending?: boolean;
  supportBookmark?: boolean;
  access?: DashboardAccess;
  addingItem?: boolean;
  hasNewUnsavedFavorite?: boolean;
  creating?: boolean;
  updating?: boolean;
  updatedOrCreated?: boolean;
  error?: any;
  namespace?: string;
  globalSelections?: any[];
}
