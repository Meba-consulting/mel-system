import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import * as Excel from 'exceljs/dist/exceljs.min.js';
import * as ExcelJS from 'exceljs';

import * as _ from 'lodash';
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

  generateExcel(list, header, elementsData, fileName) {
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
    console.log(data);
    //Create workbook and worksheet
    let workbook = new ExcelJS.Workbook();
    let worksheet = workbook.addWorksheet('data');

    //Add Header Row
    let headerRow = worksheet.addRow(header);

    // Cell Style : Fill and Border
    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFFFF00' },
        bgColor: { argb: 'FF0000FF' },
      };
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
    });
    worksheet.getColumn(3).width = 30;
    data.forEach((d) => {
      let row = worksheet.addRow(d);
    });
    elementsData.forEach((element, index) => {
      const options = element.options.join(',');
      worksheet.getCell(
        excelTablesHeaders[element?.index] + '2'
      ).dataValidation = {
        type: 'list',
        allowBlank: true,
        formulae: [options],
      };
    });
    //Generate Excel File with given name
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      FileSaver.saveAs(blob, 'entry_data_for_' + fileName + '.xlsx');
    });
  }
}
