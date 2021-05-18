import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import * as Excel from 'exceljs/dist/exceljs.min.js';

@Injectable({
  providedIn: 'root',
})
export class ProcessExcelUploadedFileService {
  constructor() {}

  processExcelFileData(data) {
    let formattedData = [];
    var workbook = XLSX.read(data, {
      type: 'binary',
    });

    //Fetch the name of First Sheet.
    var firstSheet = workbook.SheetNames[0];

    //Read all rows from First Sheet into an JSON array.
    var excelRows = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheet]);
    console.log('EXCEL ROWS', excelRows);
    return formattedData;
  }
}
