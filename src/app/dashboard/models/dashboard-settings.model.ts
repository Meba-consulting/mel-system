export interface DashboardSettings {
  id: string;
  namespace: string;
  useDataStoreAsSource: boolean;
  allowAdditionalAttributes?: boolean;
  additionalAttributes?: string[];
}
