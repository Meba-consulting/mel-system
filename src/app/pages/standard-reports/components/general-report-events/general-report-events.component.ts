import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { keyBy } from 'lodash';

@Component({
  selector: 'app-general-report-events',
  templateUrl: './general-report-events.component.html',
  styleUrls: ['./general-report-events.component.css'],
})
export class GeneralReportEventsComponent implements OnInit {
  @Input() eventReport: any;
  @Input() program: any;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @Output() eventSet: EventEmitter<string> = new EventEmitter<string>();
  displayedColumns: string[];
  dataSource: any;
  keyedHeaders: any = {};
  constructor() {}

  ngOnInit(): void {
    this.displayedColumns = [
      'position',
      ...this.program.programStages[0].programStageDataElements.map(
        (programStageDataElement) => {
          return programStageDataElement?.dataElement?.id;
        }
      ),
    ];
    this.keyedHeaders = keyBy(
      this.program.programStages[0].programStageDataElements.map(
        (programStageDataElement) => {
          return programStageDataElement?.dataElement;
        }
      ),
      'id'
    );
    this.keyedHeaders['position'] = {
      id: 'position',
      name: 'No.',
    };
    let dataRows = [];
    if (this.eventReport.rows?.length == 0) {
      dataRows = [];
    } else {
      this.eventReport.rows.map((row, count) => {
        let dataRow = {};
        dataRow['position'] = count + 1;
        this.eventReport.headers.forEach((header, index) => {
          if (
            this.keyedHeaders[header?.name] &&
            this.keyedHeaders[header?.name]['optionSet']
          ) {
            const matchedOption = (this.keyedHeaders[header?.name][
              'optionSet'
            ]?.options.filter((option) => option?.id === row[index]) || [])[0];
            dataRow[header?.name] = matchedOption ? matchedOption?.name : ' - ';
          } else {
            dataRow[header?.name] = row[index];
          }
        });
        dataRows = [...dataRows, dataRow];
      });
    }
    // console.log(this.displayedColumns);
    // console.log(dataRows);
    this.dataSource = new MatTableDataSource(dataRows);
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
