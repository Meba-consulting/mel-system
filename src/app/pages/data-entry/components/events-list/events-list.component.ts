import {
  Component,
  OnInit,
  Input,
  ViewChild,
  Output,
  EventEmitter
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {
  createDisplayColumns,
  createArrayOfObjectByHeadersAndDataValues,
  createKeyedHeaders
} from '../../helpers';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css']
})
export class EventsListComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @Input() dataElements: Array<any>;
  @Input() dataValues: any;
  @Input() headers: Array<any>;
  @Output() eventSet: EventEmitter<string> = new EventEmitter<string>();
  displayedColumns: string[];
  dataSource: any;
  keyedHeaders: any = {};
  selectedEventId: string;
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.displayedColumns = createDisplayColumns(this.headers);
    this.keyedHeaders = createKeyedHeaders(this.headers);
    this.dataSource = new MatTableDataSource(
      createArrayOfObjectByHeadersAndDataValues(this.headers, this.dataValues)
    );
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  setEvent(event) {
    this.selectedEventId = event.id;
    this.eventSet.emit(event);
    this.router.navigate([], {
      queryParams: {
        form: this.route.snapshot.queryParams['form'],
        ou: this.route.snapshot.queryParams['ou'],
        event: event.id
      }
    });
  }
}
