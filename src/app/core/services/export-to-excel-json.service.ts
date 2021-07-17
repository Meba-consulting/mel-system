import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import date from 'date-and-time';
import * as Excel from 'exceljs/dist/exceljs.min.js';
// import * as ExcelJS from 'exceljs';

import * as _ from 'lodash';
import { formatDateYYMMDD } from 'src/app/pages/data-entry/helpers';
const EXCEL_TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
const excelTablesHeaders: any = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
];

@Injectable({
  providedIn: 'root',
})
export class ExportToExcelJsonService {
  constructor() {}

  public exportAsExcelFile(
    jsonData: any[],
    jsonReference: any[],
    excelFileName: string
  ): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(jsonData);
    //console.log('worksheet', worksheet);
    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet, reference: worksheet },
      SheetNames: ['data', 'reference'],
    };

    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    //const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE,
    });
    FileSaver.saveAs(
      data,
      fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION
    );
  }

  generateExcel(
    list,
    header,
    elementsData,
    fileName,
    dataElements?,
    orgUnitData?
  ) {
    let data: any = [];
    const wb: XLSX.WorkBook = {
      Sheets: { data },
      SheetNames: ['data'],
    };
    for (let i = 0; i < list.length; i++) {
      const keys = Object.keys(list[i]);
      let arr = [];
      keys.forEach((key) => {
        arr.push(list[i][key]);
      });
      data.push(arr);
    }
    //Create workbook and worksheet
    let workbook = new Excel.Workbook();
    let worksheet = workbook.addWorksheet('data');

    //Add Header Row
    let headerRow = worksheet.addRow(header);

    // Cell Style : Fill and Border
    headerRow.eachCell((cell, number) => {
      if (number < 5) {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFFFFF00' },
          bgColor: { argb: 'FF0000FF' },
        };

        worksheet.getColumn(number).width = 15;
      }
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
    });

    const today = date.format(new Date(), 'DD/MM/YYYY');
    dataElements.forEach((elem, index) => {
      worksheet.getColumn(index + 5).width = elem.dataElement.name.length + 5;
      if (elem.dataElement.valueType === 'DATE') {
        const column = worksheet.getColumn(index + 5);

        column.numFmt = 'dd/mm/yyyy';
        column.tooltip = 'Date Format - 1/1/2021';
        column.rules = [
          {
            type: 'expression',
            formulae: ['dd/mm/yyyy'],
            style: {
              fill: {
                type: 'pattern',
                'dd/mm/yyyy': 'solid',
                bgColor: { argb: 'FF00FF00' },
                with: 30,
              },
            },
          },
        ];
        column.eachCell((cell, rowNumber) => {
          // console.log('rowNumber', rowNumber);
          // cell.numFmt = 'dd/mm/yyyy';
          cell.dataValidation = {
            type: 'date',
            with: 30,
            operator: 'greaterThan',
            formulae: [new Date('1/1/1920')],
            showInputMessage: true,
            allowBlank: true,
            promptTitle: 'Valid Date',
            prompt: `Format (DD/MM/YYYY) Eg: ${today}`,
            showErrorMessage: true,
            errorStyle: 'error',
            errorTitle: 'Invalid Date',
            error: `Format (DD/MM/YYYY) Eg: ${today}`,
          };
        });
      }
    });

    data.forEach((d) => {
      let row = worksheet.addRow(d);
    });
    elementsData.forEach((element, index) => {
      const options = '"' + element.options.join(',') + '"';
      worksheet.getCell(
        excelTablesHeaders[element?.index] + '2'
      ).dataValidation = {
        type: 'list',
        allowBlank: true,
        formulae: [options],
      };
    });
    dataElements.forEach((elem, index) => {
      if (elem.dataElement.valueType === 'ORGANISATION_UNIT') {
        let ouOptions = [];
        ouOptions = [
          ...ouOptions,
          orgUnitData?.name + '(_' + orgUnitData?.id + '_)',
        ];
        ouOptions = [
          ...ouOptions,
          ...orgUnitData?.children.map(
            (ouChild) => ouChild?.name + '(_' + ouChild?.id + '_)'
          ),
        ];
        const options = '"' + ouOptions.join(',') + '"';
        worksheet.getCell(excelTablesHeaders[index + 4] + '2').dataValidation =
          {
            type: 'list',
            allowBlank: true,
            formulae: [options],
          };
      }
    });
    //Generate Excel File with given name
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      FileSaver.saveAs(
        blob,
        'entry_data_for_' +
          fileName +
          '_' +
          formatDateYYMMDD(new Date()) +
          '.xlsx'
      );
    });
  }
}
