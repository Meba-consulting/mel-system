import * as _ from 'lodash';

export function createFormFieldsFromProgramStageDataElement(stageDataElements) {
  return _.map(stageDataElements, (stageDataElement) => {
    return {
      id: stageDataElement?.dataElement?.id,
      label: stageDataElement?.dataElement?.name,
      key: stageDataElement?.dataElement?.id,
      controlType:
        stageDataElement?.dataElement?.valueType == 'LONG_TEXT'
          ? 'textarea'
          : 'textbox',
      name: stageDataElement?.dataElement?.name,
      required: true,
    };
  });
}
