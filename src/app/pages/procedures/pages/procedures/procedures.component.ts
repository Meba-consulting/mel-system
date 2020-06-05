import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/reducers';
import {
  loadProceduresConfigurations,
  loadDocuments
} from '../../store/actions';
import {
  getProceduresConfigurations,
  getProceduresEntities
} from '../../store/selectors';
import * as _ from 'lodash';

@Component({
  selector: 'app-procedures',
  templateUrl: './procedures.component.html',
  styleUrls: ['./procedures.component.css']
})
export class ProceduresComponent implements OnInit {
  departmentId: string;
  documentId: string;
  resourcesList$: Observable<any>;
  documentEntities$: Observable<any>;
  selectedProcedures$: Observable<any>;
  displayedColumns: string[] = ['id', 'name', 'url'];
  dataSource = [];
  pdfSrc: string = '';
  isPreviewSet: boolean = false;
  isProcedureTypeIdSet: boolean = false;
  selectedDocumentId: string;

  constructor(
    private route: ActivatedRoute,
    private store: Store<State>,
    private router: Router
  ) {
    this.store.dispatch(loadProceduresConfigurations());
    this.resourcesList$ = store.select(getProceduresConfigurations);
  }

  ngOnInit() {
    this.documentId = this.route.snapshot.params['id'];
    this.isPreviewSet = false;
    setTimeout(() => {
      this.isProcedureTypeIdSet = true;
    }, 100);
  }

  setDocumentTypeId(id) {
    this.isProcedureTypeIdSet = false;
    setTimeout(() => {
      this.documentId = id;
      this.isProcedureTypeIdSet = true;
    }, 100);
    console.log(this.documentId);
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
    this.pdfSrc = '../../../api/documents/' + row.id + '/data';
    this.isPreviewSet = true;
  }

  download() {
    this.router.navigate([]).then(result => {
      window.open(
        '../../../api/documents/' + this.selectedDocumentId + '/data',
        '_blank'
      );
    });
  }

  togglePreview() {
    this.isPreviewSet = false;
  }
}
