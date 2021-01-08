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
          : stageDataElement?.dataElement?.valueType == 'TEXT'
          ? 'textbox'
          : stageDataElement?.dataElement?.valueType ==
              'INTEGER_ZERO_OR_POSITIVE' ||
            stageDataElement?.dataElement?.valueType == 'INTEGER_POSITIVE' ||
            stageDataElement?.dataElement?.valueType == 'NUMBER'
          ? 'number'
          : stageDataElement?.dataElement?.valueType == 'DATE'
          ? 'date'
          : 'textbox',
      min:
        stageDataElement?.dataElement?.valueType == 'INTEGER_ZERO_OR_POSITIVE'
          ? 0
          : stageDataElement?.dataElement?.valueType == 'INTEGER_POSITIVE'
          ? 1
          : null,
      name: stageDataElement?.dataElement?.name,
      required: true,
    };
  });
}
