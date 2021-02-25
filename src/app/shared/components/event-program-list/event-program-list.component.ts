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
import { formatDateYYMMDD } from 'src/app/pages/data-entry/helpers';

@Component({
  selector: 'app-event-program-list',
  templateUrl: './event-program-list.component.html',
  styleUrls: ['./event-program-list.component.css'],
})
export class EventProgramListComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @Input() eventsData: any[];
  displayedColumns: string[] = [
    'position',
    'eventDate',
    'status',
    'storedBy',
    'action',
  ];
  dataSource: any;
  @Output() editEvent = new EventEmitter<any>();
  @Output() deleteEvent = new EventEmitter<any>();
  constructor() {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(
      this.eventsData.map((data, index) => {
        return {
          position: index + 1,
          eventDate: formatDateYYMMDD(new Date(data?.eventDate)),
          storedBy: data?.storedBy,
          status: data?.status,
          action: data,
        };
      })
    );
    this.dataSource.paginator = this.paginator;
  }

  onEditEvent(e, event) {
    e.stopPropagation();
    this.editEvent.emit(event);
  }

  onDeleteEvent(e, event) {
    e.stopPropagation();
    this.deleteEvent.emit(event);
  }
}
