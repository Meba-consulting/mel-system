import * as _ from 'lodash';

export function createFormFieldsFromProgramStageDataElement(
  stageDataElements,
  configs?,
  stage?
) {
  return _.map(stageDataElements, (stageDataElement) => {
    return {
      id: stageDataElement?.dataElement?.id,
      label: stageDataElement?.dataElement?.name,
      key: stageDataElement?.dataElement?.id,
      controlType:
        stageDataElement?.dataElement?.valueType == 'LONG_TEXT'
          ? 'textarea'
          : stageDataElement?.dataElement?.valueType == 'TEXT' &&
            !stageDataElement?.dataElement?.optionSet
          ? 'textbox'
          : stageDataElement?.dataElement?.valueType === 'NUMBER' ||
            stageDataElement?.dataElement?.valueType ===
              'INTEGER_ZERO_OR_POSITIVE' ||
            stageDataElement?.dataElement?.valueType === 'INTEGER_POSITIVE'
          ? 'number'
          : stageDataElement?.dataElement?.valueType == 'DATE'
          ? 'date'
          : stageDataElement?.dataElement?.optionSet
          ? 'dropdown'
          : 'textbox',

      type:
        stageDataElement?.dataElement?.valueType ==
          'INTEGER_ZERO_OR_POSITIVE' ||
        stageDataElement?.dataElement?.valueType == 'INTEGER_POSITIVE' ||
        stageDataElement?.dataElement?.valueType == 'NUMBER'
          ? 'number'
          : null,
      min:
        stageDataElement?.dataElement?.valueType == 'INTEGER_ZERO_OR_POSITIVE'
          ? 0
          : stageDataElement?.dataElement?.valueType == 'INTEGER_POSITIVE'
          ? 1
          : null,
      options: stageDataElement?.dataElement?.optionSet
        ? _.map(stageDataElement?.dataElement?.optionSet?.options, (option) => {
            return {
              id: option?.id,
              name: option?.name,
              label: option?.name,
              key: option?.id,
            };
          })
        : [],
      name: stageDataElement?.dataElement?.name,
      required: stageDataElement?.compulsory,
      disabled:
        configs &&
        configs?.stagesConfigs &&
        configs?.stagesConfigs[stage?.id][stageDataElement?.dataElement?.id]
          ? true
          : false,
    };
  });
}
