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
import { getTrackedEntityInstanceReportTable } from 'src/app/core/helpers/tracked-entity-instance-list.helpers';

@Component({
  selector: 'app-tracked-entity-instance-list',
  templateUrl: './tracked-entity-instance-list.component.html',
  styleUrls: ['./tracked-entity-instance-list.component.css'],
})
export class TrackedEntityInstanceListComponent implements OnInit {
  @Input() queryResponse: any[];
  displayedColumns: string[];
  headers: any = {};
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  dataSource: any;
  constructor() {}

  ngOnInit(): void {
    const formattedResponse = getTrackedEntityInstanceReportTable(
      this.queryResponse
    );

    this.displayedColumns = formattedResponse?.displayedColumns;
    this.headers = formattedResponse?.headers;
    this.dataSource = new MatTableDataSource(formattedResponse?.data);

    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onEdit(e, trackedEntityInstance) {
    e.stopPropagation();
    this.edit.emit(trackedEntityInstance);
  }

  onDelete(e, trackedEntityInstance) {
    e.stopPropagation();
    this.delete.emit(trackedEntityInstance);
  }
}
