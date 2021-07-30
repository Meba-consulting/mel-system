import * as _ from 'lodash';

const reference = {
  YgPTlKJ9CRv: {
    useLastEventOnly: false,
    elementToAssignValue: 'E3wPjzUQYBc',
    stage: 'b40d7ONcd65',
    expression: {
      left: '(#{b40d7ONcd65.YgPTlKJ9CRv})',
      right: '(#{b40d7ONcd65.YgPTlKJ9CRv})',
    },
  },
};

let referenceDataValues = {};

function evaluteDataElementsValues(lastEvent, reference, dataValues) {
  // get last event datavalue matching the keys

  Object.keys(reference).forEach((key) => {
    const lastEventDataValuesMatched = lastEvent
      ? lastEvent?.dataValues.filter(
          (dataValue) => dataValue?.dataElement === key
        ) || []
      : [];
    if (lastEventDataValuesMatched && lastEventDataValuesMatched.length > 0) {
      // console.log('last event', lastEvent);
      // console.log('lastEventDataValuesMatched', lastEventDataValuesMatched);
      // console.log('dataValues', dataValues);
      let elementValues = {};
      if (lastEvent && lastEvent?.dataValues) {
        _.each(lastEvent.dataValues, (dataValue) => {
          elementValues[dataValue.dataElement] = dataValue.value;
        });
      }
      const value = evaluateIndicatorExpression(
        reference[key],
        elementValues,
        dataValues
      );
      if (value) {
        const elem: any = document.querySelector(
          "input[id='" +
            reference[key].stage +
            '-' +
            reference[key].elementToAssignValue +
            "-val']"
        );
        if (elem) {
          elem.value = value;
          elem.setAttribute('disabled', 'disabled');
          let colorKey = 'WAIT';

          // create custom event for saving data values
          const dataValueEvent = new CustomEvent('dataValueUpdate', {
            detail: {
              id: `${reference[key].elementToAssignValue}-dataElement`,
              value: value,
              status: 'not-synced',
              domElementId:
                reference[key].stage +
                '-' +
                reference[key].elementToAssignValue +
                '-val',
              colorKey: colorKey,
            },
          });
          document.body.dispatchEvent(dataValueEvent);
        }
      }
    }
  });
}

function getSanitizedValue(value, type) {
  switch (type) {
    case 'TRUE_ONLY':
      return convertToBoolean(value);
    default:
      return value;
  }
}

function convertToBoolean(stringValue) {
  return stringValue === 'true' ? Boolean(true) : stringValue;
}

function getSelectInput(id, value, options) {
  const selectElement = document.createElement('select');
  selectElement.setAttribute('id', id);
  selectElement.setAttribute('class', 'entryselect');

  const defaultOption = document.createElement('option');
  defaultOption.disabled = true;
  defaultOption.selected = true;
  defaultOption.value = '';
  selectElement.appendChild(defaultOption);

  options.forEach(function (option) {
    const optionElement = document.createElement('option');
    optionElement.value = option.code;
    optionElement.appendChild(document.createTextNode(option.name));
    optionElement;
    if (option.code === value) {
      optionElement.selected = true;
    }

    selectElement.appendChild(optionElement);
  });

  return selectElement;
}

function getTextArea(id, value) {
  const textarea = document.createElement('textarea');
  textarea.setAttribute('id', id);
  textarea.setAttribute('name', 'entryform');
  textarea.setAttribute('class', 'entryfield');
  textarea.value = value;
  return textarea;
}

function getRadioInputs(id, savedValue) {
  const radioContainer = document.createElement('div');

  if (savedValue == 'true') {
    const yesInput = document.createElement('input');
    yesInput.setAttribute('type', 'radio');
    yesInput.setAttribute('id', id);
    yesInput.setAttribute('name', id);
    yesInput.setAttribute('class', 'entryfield-radio');
    yesInput.checked = true;
    yesInput.value = 'true';

    const noInput = document.createElement('input');
    noInput.setAttribute('type', 'radio');
    noInput.setAttribute('id', id);
    noInput.setAttribute('name', id);
    noInput.setAttribute('class', 'entryfield-radio');
    noInput.value = 'false';

    radioContainer.appendChild(yesInput);
    radioContainer.appendChild(document.createTextNode(' Yes'));

    radioContainer.appendChild(noInput);
    radioContainer.appendChild(document.createTextNode(' No'));
  } else if (savedValue == 'false') {
    const yesInput = document.createElement('input');
    yesInput.setAttribute('type', 'radio');
    yesInput.setAttribute('name', id);
    yesInput.setAttribute('id', id);
    yesInput.setAttribute('class', 'entryfield-radio');
    yesInput.value = 'true';

    const noInput = document.createElement('input');
    noInput.setAttribute('type', 'radio');
    noInput.setAttribute('name', id);
    noInput.setAttribute('id', id);
    noInput.setAttribute('class', 'entryfield-radio');
    noInput.checked = true;
    noInput.value = 'false';

    radioContainer.appendChild(yesInput);
    radioContainer.appendChild(document.createTextNode(' Yes'));

    radioContainer.appendChild(noInput);
    radioContainer.appendChild(document.createTextNode(' No'));
  } else {
    const yesInput = document.createElement('input');
    yesInput.setAttribute('type', 'radio');
    yesInput.setAttribute('id', id);
    yesInput.setAttribute('name', id);
    yesInput.setAttribute('class', 'entryfield-radio');
    yesInput.value = 'true';

    const noInput = document.createElement('input');
    noInput.setAttribute('type', 'radio');
    noInput.setAttribute('id', id);
    noInput.setAttribute('name', id);
    noInput.setAttribute('class', 'entryfield-radio');
    noInput.value = 'false';

    radioContainer.appendChild(yesInput);
    radioContainer.appendChild(document.createTextNode(' Yes'));

    radioContainer.appendChild(noInput);
    radioContainer.appendChild(document.createTextNode(' No'));
  }

  return radioContainer;
}

export function updateFormFieldColor(elementId, statusColor) {
  const element = document.getElementById(elementId);
  if (element) {
    element.style.border = 'solid 2px';
    element.style.borderColor = statusColor;
  }
}

export function setDataValues(elementId, value) {
  const element = document.getElementById(elementId);
  if (element) {
    element.setAttribute('value', value);
  }
}

function getDataValue(data, id) {
  var dataObject = data[id];
  return dataObject ? dataObject.value : '';
}

function evaluateIndicatorValuesOnFormOpen(indicators, entryFormType) {
  if (
    indicators &&
    Object.keys(indicators) &&
    Object.keys(indicators).length > 0
  ) {
    const formIndicators = document.querySelectorAll("input[name='indicator']");
    if (formIndicators) {
      formIndicators.forEach((indicator) => {
        const formulaPattern = /#\{.+?\}/g;
        let valuesObject = {};
        indicators[indicator.id].expression
          .match(formulaPattern)
          .forEach((elem) => {
            const inputValueElement: any = document.querySelector(
              "input[id='" +
                elem.replace(/[#\{\}]/g, '').replace('.', '-') +
                '-val' +
                "']"
            );
            const valueKey =
              entryFormType && entryFormType === 'aggregate'
                ? elem.replace('}', '').replace('#{', '')
                : elem.split('.')[1].replace('}', '');
            valuesObject[valueKey] =
              inputValueElement && inputValueElement.value
                ? inputValueElement.value
                : 0;
          });
        const indValue = evaluateIndicatorExpression(
          {
            expression: indicators[indicator.id].expression,
            left: indicators[indicator.id]?.left,
            right: indicators[indicator.id]?.right,
          },
          valuesObject,
          valuesObject,
          entryFormType
        );
        const inputElement: any = document.querySelector(
          "input[id='" + indicator.id + "']"
        );
        inputElement.value = indValue;
      });
    }
  }
}

export function onFormReady(
  dataElements,
  formType,
  dataValues,
  entryFormStatusColors,
  indicators,
  lastEvent,
  elementsToDisable,
  formReadyFunc
) {
  // Find input items and set required properties to them
  const dataElementObjects = _.keyBy(dataElements, 'id');
  const inputElements: any = document.getElementsByTagName('INPUT');
  const elementsWithOptionSet = {};
  const elementsWithTextArea = {};
  const elementsWithRadioInput = {};
  _.each(inputElements, (inputElement: any) => {
    if (inputElement) {
      //empty value set on design inputs
      if (inputElement.hasAttribute('value')) {
        inputElement.setAttribute('value', '');
      }
      // Get attribute from the element
      const elementId = inputElement.getAttribute('id')
        ? inputElement.getAttribute('id')
        : inputElement.getAttribute('attributeid');

      // Get splitted ID to get data element and category combo ids
      const splitedId =
        formType === 'aggregate' ||
        formType === 'event' ||
        formType === 'tracker'
          ? elementId
            ? elementId.split('-')
            : []
          : [];

      let dataElementId =
        formType === 'event' || formType === 'tracker'
          ? splitedId[1]
          : splitedId[0];

      if (formType == 'tracker' && !dataElementId) {
        dataElementId = elementId;
        // console.log("element id ", elementId, dataElementId);
        const dataElementDetails = dataElementObjects[dataElementId]
          ? dataElementObjects[dataElementId]
          : {};

        // // Get dataElement type
        const dataElementType = dataElementDetails
          ? dataElementDetails.valueType
          : null;
        const dataElementValue = getSanitizedValue(
          getDataValue(dataValues, dataElementId + '-trackedEntityAttribute'),
          dataElementType
        );
        if (dataElementType === 'LONG_TEXT') {
          elementsWithTextArea[elementId] = getTextArea(
            elementId + '-trackedEntityAttribute',
            dataElementValue
          );
        } else {
          try {
            const inputElement: any = document.querySelector(
              "input[attributeid='" + elementId + "']"
            );

            inputElement.setAttribute(
              'id',
              elementId + '-trackedEntityAttribute'
            );
          } catch (e) {}
        }

        // update text area
        for (let elementId of Object.keys(elementsWithTextArea)) {
          try {
            const inputElement: any = document.querySelector(
              "input[attributeid='" + elementId + "']"
            );
            const textAreaInput = elementsWithTextArea[elementId];
            inputElement.replaceWith(textAreaInput, inputElement);
            inputElement.parentNode.removeChild(inputElement);
          } catch (error) {
            console.log(
              JSON.stringify({
                type: 'Text area input',
                error,
              })
            );
          }
        }
      }

      const optionComboId =
        formType === 'event'
          ? 'dataElement'
          : formType === 'tracker'
          ? 'trackedEntityAttribute'
          : splitedId[1];

      // // Get data element details

      const dataElementDetails = dataElementObjects[dataElementId]
        ? dataElementObjects[dataElementId]
        : {};

      // // Get dataElement type
      const dataElementType = dataElementDetails
        ? dataElementDetails.valueType
        : null;

      // // Get element value
      const dataElementValue = getSanitizedValue(
        getDataValue(dataValues, dataElementId + '-' + optionComboId),
        dataElementType
      );
      // // Update DOM based on data element type
      if (dataElementType) {
        if (dataElementDetails.optionSet) {
          const selectInput = getSelectInput(
            elementId,
            dataElementValue,
            dataElementDetails.optionSet.options
          );
          elementsWithOptionSet[elementId] = selectInput;
        } else {
          if (dataElementType === 'TRUE_ONLY') {
            inputElement.setAttribute('type', 'checkbox');
            inputElement.setAttribute('class', 'entrytrueonly');
            inputElement.checked = dataElementValue;
          } else if (dataElementType === 'LONG_TEXT') {
            elementsWithTextArea[elementId] = getTextArea(
              elementId,
              dataElementValue
            );
          } else if (dataElementType === 'DATE') {
            inputElement.setAttribute('type', 'date');
            inputElement.setAttribute('class', 'entryfield');
            inputElement.value = dataElementValue;
          } else if (dataElementType === 'BOOLEAN') {
            elementsWithRadioInput[elementId] = getRadioInputs(
              elementId,
              dataElementValue
            );
          } else if (
            dataElementType === 'PERCENTAGE' ||
            dataElementType === 'NUMBER' ||
            dataElementType.indexOf('INTEGER') > -1
          ) {
            inputElement.setAttribute('type', 'number');
            inputElement.setAttribute('class', 'entryfield');
            if (dataElementType === 'INTEGER_POSITIVE') {
              inputElement.setAttribute('min', 1);
            } else if (dataElementType === 'INTEGER_NEGATIVE') {
              inputElement.setAttribute('max', -1);
            } else if (dataElementType === 'INTEGER_ZERO_OR_POSITIVE') {
              inputElement.setAttribute('min', 0);
            } else if (dataElementType === 'PERCENTAGE') {
              inputElement.setAttribute('min', 0);
              inputElement.setAttribute('max', 100);
            }
            inputElement.value = dataElementValue;
          } else {
            inputElement.setAttribute('class', 'entryfield');
            inputElement.value = dataElementValue;
          }
        }
      } else {
        // TODO Find ways to deal with input that
        if (
          inputElement &&
          inputElement.hasAttribute('name') &&
          inputElement.getAttribute('name') === 'indicator'
        ) {
          inputElement.setAttribute('value', '0');
          inputElement.setAttribute('class', 'entryfield');
          inputElement.setAttribute('readonly', 'readonly');
          inputElement.setAttribute('disabled', 'disabled');
        }
      }
    }

    setTimeout(() => {
      // disable some elements
      _.each(elementsToDisable, (elementToDisable) => {
        let td: any = document.querySelector(
          "td[todisable='" + elementToDisable + "']"
        );
        const elemToDisable: any = td.querySelector("input[name='entryfield']");

        if (elemToDisable) {
          elemToDisable.setAttribute('disabled', 'disabled');
          elemToDisable.setAttribute('value', 'NA');
        }
      });
    }, 1000);
    setTimeout(() => {
      evaluateIndicatorValuesOnFormOpen(indicators, formType);
      evaluteDataElementsValues(lastEvent, reference, dataValues);
    }, 1500);
  });

  // update option sets
  for (let elementId of Object.keys(elementsWithOptionSet)) {
    try {
      const inputElement: any = document.getElementById(elementId);
      const selectInput = elementsWithOptionSet[elementId];
      inputElement.replaceWith(selectInput);
    } catch (error) {
      console.log(JSON.stringify({ type: 'Select input', error }));
    }
  }

  // update option sets
  for (let elementId of Object.keys(elementsWithRadioInput)) {
    try {
      const inputElement: any = document.getElementById(elementId);
      const redioInput = elementsWithRadioInput[elementId];
      inputElement.replaceWith(redioInput);
    } catch (error) {
      console.log(JSON.stringify({ type: 'Radio input', error }));
    }
  }

  // update text area
  for (let elementId of Object.keys(elementsWithTextArea)) {
    try {
      const inputElement: any = document.getElementById(elementId);
      const textAreaInput = elementsWithTextArea[elementId];
      inputElement.replaceWith(textAreaInput, inputElement);
      inputElement.parentNode.removeChild(inputElement);
    } catch (error) {
      console.log(JSON.stringify({ type: 'Text area input', error }));
    }
  }

  const returnedFormFuncObject = formReadyFunc(
    formType,
    entryFormStatusColors,
    dataElementObjects,
    indicators,
    lastEvent,
    elementsToDisable,
    dataValues
  );
  // console.log("returnedFormFuncObject", returnedFormFuncObject);
  return returnedFormFuncObject;
}

export function onDataValueChange(
  element: any,
  entryFormType: string,
  entryFormColors: any,
  dataElementObjects,
  indicators: any,
  lastEvent: any,
  elementsToDisable: string[],
  dataValues: any
) {
  // Get attribute from the element
  const elementId = element.getAttribute('id');

  // Get splitted ID to get data element and category combo ids
  const splitedId = elementId ? elementId.split('-') : [];

  const dataElementId = entryFormType === 'event' ? splitedId[1] : splitedId[0];
  const optionComboId =
    entryFormType === 'event'
      ? 'dataElement'
      : entryFormType === 'tracker'
      ? 'trackedEntityAttribute'
      : splitedId[1];

  // find element value
  const elementValue = element.value;
  referenceDataValues[dataElementId] = elementValue;

  let colorKey = 'WAIT';

  // create custom event for saving data values
  const dataValueEvent = new CustomEvent('dataValueUpdate', {
    detail: {
      id: `${dataElementId}-${optionComboId}`,
      value: elementValue,
      status: 'not-synced',
      domElementId: elementId,
      colorKey: colorKey,
    },
  });
  document.body.dispatchEvent(dataValueEvent);
  if (
    indicators &&
    Object.keys(indicators) &&
    Object.keys(indicators).length > 0
  ) {
    const formIndicators = document.querySelectorAll("input[name='indicator']");
    if (formIndicators) {
      formIndicators.forEach((indicator) => {
        const formulaPattern = /#\{.+?\}/g;
        let valuesObject = {};
        indicators[indicator.id].expression
          .match(formulaPattern)
          .forEach((elem) => {
            const inputValueElement: any = document.querySelector(
              "input[id='" +
                elem.replace(/[#\{\}]/g, '').replace('.', '-') +
                '-val' +
                "']"
            );
            const valueKey =
              entryFormType && entryFormType === 'aggregate'
                ? elem.replace('}', '').replace('#{', '')
                : elem.split('.')[1].replace('}', '');
            valuesObject[valueKey] =
              inputValueElement && inputValueElement.value
                ? inputValueElement.value
                : 0;
          });
        const indValue = evaluateIndicatorExpression(
          {
            expression: indicators[indicator.id].expression,
            left: indicators[indicator.id]?.left,
            right: indicators[indicator.id]?.right,
          },
          valuesObject,
          valuesObject,
          entryFormType
        );
        const inputElement: any = document.querySelector(
          "input[id='" + indicator.id + "']"
        );
        inputElement.value = indValue;
      });
    }
  }

  setTimeout(() => {
    evaluteDataElementsValues(lastEvent, reference, referenceDataValues);
  }, 1500);
}

function evaluateIndicatorExpression(
  indDefn,
  elementValuesLastEvent,
  currentElementValues?,
  entryFormType?
) {
  const mergedValues = { ...elementValuesLastEvent, ...currentElementValues };
  const indExpression = indDefn.expression;
  let evaluatedValue = 0;
  const formulaPattern = /#\{.+?\}/g;
  if (indDefn.useLastEventOnly) {
    let expression = indExpression;
    const matcher = expression.match(formulaPattern);
    if (matcher) {
      matcher.map(function (match) {
        let operand =
          !entryFormType || (entryFormType && entryFormType != 'aggregate')
            ? match.replace(/[#\{\}]/g, '').split('.')[1]
            : match.replace(/[#\{\}]/g, '');
        let value =
          mergedValues && mergedValues[operand] ? mergedValues[operand] : 0;
        expression = expression.replace(match, value);
      });
    }
    try {
      if (!isNaN(eval(expression))) {
        evaluatedValue = eval(expression);
      }
    } catch (e) {}
  } else {
    let leftExpression = indDefn.left;
    let rightExpression = indDefn.right;

    const matcherLeft = leftExpression.match(formulaPattern);
    const matcherRight = rightExpression.match(formulaPattern);
    if (matcherLeft) {
      matcherLeft.map(function (match) {
        let operand =
          !entryFormType || (entryFormType && entryFormType != 'aggregate')
            ? match.replace(/[#\{\}]/g, '').split('.')[1]
            : match.replace(/[#\{\}]/g, '');
        let value =
          mergedValues && mergedValues[operand] ? mergedValues[operand] : 0;
        leftExpression = leftExpression.replace(match, value);
      });
    }

    if (matcherRight) {
      matcherRight.map(function (match) {
        let operand =
          !entryFormType || (entryFormType && entryFormType != 'aggregate')
            ? match.replace(/[#\{\}]/g, '').split('.')[1]
            : match.replace(/[#\{\}]/g, '');
        let value =
          mergedValues && mergedValues[operand] ? mergedValues[operand] : 0;
        rightExpression = rightExpression.replace(match, value);
      });
    }

    let leftEvaluatedValue = 0;
    let rightEvaluatedValue = 0;
    try {
      if (!isNaN(eval(rightExpression)) && !isNaN(eval(leftExpression))) {
        leftEvaluatedValue = eval(leftExpression);
        rightEvaluatedValue = eval(rightExpression);
      }
    } catch (e) {}

    evaluatedValue = leftEvaluatedValue / rightEvaluatedValue;
  }
  return evaluatedValue.toFixed(0);
}
