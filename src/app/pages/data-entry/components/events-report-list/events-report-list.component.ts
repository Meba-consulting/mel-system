import {
  Component,
  OnInit,
  Input,
  ViewChild,
  EventEmitter,
  Output
} from '@angular/core';
import {
  formatEventsDataIntoKeyValuePair,
  createDisplayColumns,
  createKeyedHeaders
} from '../../helpers';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-events-report-list',
  templateUrl: './events-report-list.component.html',
  styleUrls: ['./events-report-list.component.css']
})
export class EventsReportListComponent implements OnInit {
  @Input() events: any[];
  @Input() reportDataELements: any[];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @Output() eventSet: EventEmitter<string> = new EventEmitter<string>();
  displayedColumns: string[];
  dataSource: any;
  keyedHeaders: any = {};
  selectedEventId: string;
  constructor() {}

  ngOnInit(): void {
    this.displayedColumns = createDisplayColumns(this.reportDataELements);
    this.keyedHeaders = createKeyedHeaders(this.reportDataELements);
    const data = formatEventsDataIntoKeyValuePair(this.events);
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
