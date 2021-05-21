import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { formatDateToYYMMDD } from 'src/app/pages/data-entry/helpers/process-program-metadata.helper';

import { keyBy } from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class ProcessExcelUploadedFileService {
  constructor() {}

  processExcelFileData(data, programStageSataElements?) {
    var workbook = XLSX.read(data, {
      type: 'binary',
    });

    // console.log(programStageSataElements);
    const dataElements = programStageSataElements.map(
      (programStageSataElement) => {
        return {
          ...programStageSataElement?.dataElement,
        };
      }
    );

    const keyValuePairedDataElements = keyBy(dataElements, 'name');

    //Fetch the name of First Sheet.
    var firstSheet = workbook.SheetNames[0];

    //Read all rows from First Sheet into an JSON array.
    var excelRows = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheet]);
    // console.log('EXCEL ROWS', excelRows);
    // console.log('keyValuePairedDataElements', keyValuePairedDataElements);
    const eventData = excelRows.map((excelRow) => {
      const keys = Object.keys(excelRow);
      return {
        trackedEntityInstance: excelRow['reference_id'],
        program: excelRow['form_reference'].split('_')[0],
        programStage: excelRow['form_reference'].split('_')[1],
        enrollment: excelRow['reference_id'],
        orgUnit: excelRow['orgunit'],
        notes: [],
        dataValues: keys
          .filter((key, index) => index > 3)
          .map((key) => {
            return {
              dataElement: keyValuePairedDataElements[key]?.id,
              value:
                !keyValuePairedDataElements[key]?.optionSet ||
                (keyValuePairedDataElements[key]?.optionSet &&
                  keyValuePairedDataElements[key]?.optionSet?.options
                    ?.length === 0)
                  ? keyValuePairedDataElements[key]?.valueType === 'DATE'
                    ? formatDateToYYMMDD(new Date(excelRow[key]))
                    : excelRow[key]
                  : (
                      keyValuePairedDataElements[
                        key
                      ]?.optionSet?.options.filter(
                        (option) =>
                          option?.code.toLowerCase() ===
                          excelRow[key].split('_').join(' ')
                      ) || []
                    )?.length > 0
                  ? (keyValuePairedDataElements[key]?.optionSet?.options.filter(
                      (option) =>
                        option?.code.toLowerCase() ===
                        excelRow[key].split('_').join(' ')
                    ) || [])[0]?.code
                  : '',
            };
          }),
        status: 'COMPLETED',
        eventDate: formatDateToYYMMDD(new Date()),
      };
    });

    // console.log(eventData);
    return eventData;
  }
}
