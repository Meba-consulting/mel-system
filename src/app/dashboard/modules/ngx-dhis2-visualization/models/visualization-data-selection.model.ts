export interface VisualizationDataSelection {
  dimension: string;
  name?: string;
  layout?: string;
  filter?: string;
  optionSet?: any;
  legendSet?: string;
  changed?: boolean;
  items: Array<{
    id: string;
    name: string;
    type?: string;
    functionObject?: any;
  }>;
  groups?: Array<{
    id: string;
    name: string;
    members: Array<string>;
  }>;
}
