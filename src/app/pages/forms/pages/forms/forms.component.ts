import { Component, OnInit, ViewChild } from '@angular/core';
import {
  loadFormsDocuments,
  loadFormsConfigurations
} from '../../store/actions';
import {
  getFormsEntities,
  getFormsConfigurations
} from '../../store/selectors';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/reducers';
import * as _ from 'lodash';
import { tap, catchError, finalize } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {
  selectionFilterConfig: any = {
    showDataFilter: false,
    showPeriodFilter: false,
    showOrgUnitFilter: true,
    showLayout: false,
    showFilterButton: false,
    orgUnitFilterConfig: {
      singleSelection: true,
      showOrgUnitLevelGroupSection: false,
      showUserOrgUnitSection: false
    }
  };
  departmentId: string;
  resourcesList$: Observable<any>;
  documentEntities$: Observable<any>;
  allDocEntities: any = [];
  documentEntities: any = [];
  displayedColumns: string[] = ['id', 'name', 'url'];
  dataSource = [];
  pdfSrc: string = '';
  isPreviewSet: boolean = false;
  selectedDocumentId: string;

  private dataSubject = new BehaviorSubject<any[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  orgUnitObject: any;
  action: string;
  orgUnitFilterConfig: any = {
    singleSelection: true,
    showUserOrgUnitSection: false,
    showOrgUnitLevelGroupSection: false,
    showOrgUnitGroupSection: false,
    showOrgUnitLevelSection: false
  };
  selectedOrgUnitItems: any[] = [{ id: 'O6uvpzGd5pu', name: 'Bo', level: 2 }];

  constructor(
    private route: ActivatedRoute,
    private store: Store<State>,
    private router: Router
  ) {
    this.store.dispatch(loadFormsConfigurations());
    this.resourcesList$ = store.select(getFormsConfigurations);
  }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      this.departmentId = params['id'];
      this.isPreviewSet = false;
      this.resourcesList$.subscribe(list => {
        if (list) {
          _.map(list, item => {
            if (item.id == params['id']) {
              const docInfo = {
                docIds: this.getDocIds(item.documents),
                id: item.id
              };
              this.store.dispatch(loadFormsDocuments({ documents: docInfo }));
              this.documentEntities$ = this.store.select(getFormsEntities);
              if (this.documentEntities$) {
                this.documentEntities$.subscribe(entities => {
                  if (entities && entities[params['id']]) {
                    this.allDocEntities = entities[params['id']]['documents'];
                    this.documentEntities = _.take(this.allDocEntities, 5);
                  }
                });
              }
            }
          });
        }
      });
    });
  }

  ngAfterViewInit() {
    setTimeout(
      () =>
        console.log(
          this.paginator.page.pipe(tap(() => this.loadData())).subscribe()
        ),
      2000
    );
  }

  loadData() {
    this.documentEntities = this.loadItemsByConditions(
      'asc',
      this.paginator.pageIndex,
      this.paginator.pageSize,
      this.allDocEntities
    );
  }

  loadItemsByConditions(sortDirection, pageIndex, pageSize, items) {
    // create array of array by group of page size
    let arrOfArr = [];
    if (items.length > pageSize) {
      _.map(items, (item, index) => {
        let arr = [];
        for (let count = 0; count < pageSize; count++) {
          arr.push(items[index]);
        }
        arrOfArr.push(arr);
      });
      _.map(arrOfArr, (arr, i) => {
        if (i == pageIndex) {
          return arr;
        }
      });
    } else {
      return items;
    }
  }

  getDocIds(docArr) {
    let docStr = '';
    docArr.forEach(doc => {
      docStr += doc.id + ',';
    });
    return docStr;
  }

  selectRow(row) {
    this.selectedDocumentId = row.id;
    this.pdfSrc = '/api/documents/' + row.id + '/data';
    this.isPreviewSet = true;
  }

  download() {
    this.router.navigate([]).then(result => {
      window.open(
        '/api/documents/' + this.selectedDocumentId + '/data',
        '_blank'
      );
    });
  }

  togglePreview() {
    this.isPreviewSet = false;
  }

  onFilterUpdate(selection) {
    console.log(selection);
  }
}
