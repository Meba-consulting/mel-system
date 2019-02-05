import * as _ from 'lodash';
import { DynamicDimension } from '../store/models/dynamic-dimension.model';
export function getSanitizedDynamicDimensions(
  dynamicDimensions: any[]
): DynamicDimension[] {
  return _.map(dynamicDimensions, (dynamicDimension: any) => {
    return {
      ...dynamicDimension,
      dimension: dynamicDimension.id
    };
  });
}
