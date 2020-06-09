import {
  Component,
  OnInit,
  Input,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import * as _ from 'lodash';
import { MatTableDataSource } from '@angular/material/table';
import { formatResourcesForDataTable } from '../../helpers/format-resources-for-datatable.helper';
import { ResourcesService } from '../../services/resources.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-resources-list',
  templateUrl: './resources-list.component.html',
  styleUrls: ['./resources-list.component.css']
})
export class ResourcesListComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @Input() resources: Array<any>;
  @Input() currentUser: any;
  @Input() userGroup: any;
  displayedColumns: string[] = ['position', 'name', 'type', 'action'];
  dataSource: any;
  showConfirmDeletion: boolean = false;
  confirmDeletion: boolean = false;
  resourceIdToDelete: string;

  constructor(
    private resourceService: ResourcesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(
      formatResourcesForDataTable(this.resources)
    );
    this.dataSource.paginator = this.paginator;
  }

  redirectTo(uri: string) {
    this.router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigate([uri]));
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openResource(url) {
    window.open(url, '_blank');
  }

  cancelDeletion() {
    this.confirmDeletion = false;
  }

  deleteResource(id, confirmDelete) {
    this.confirmDeletion = true;
    this.resourceIdToDelete = id;
    if (confirmDelete) {
      this.resourceService.deleteResource(id).subscribe(response => {
        console.log(response);
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
          this.router.navigate(['resources/documents'], {
            queryParams: { status: 'delete' }
          })
        );
        // this.redirectTo('resources/documents');
      });
    }
  }
}
