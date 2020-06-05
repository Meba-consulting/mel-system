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
  resourcesList$: Observable<any>;
  documentEntities$: Observable<any>;
  allDocEntities: any = [];
  documentEntities: any = [];
  displayedColumns: string[] = ['id', 'name', 'url'];
  dataSource = [];
  pdfSrc: string = '';
  isPreviewSet: boolean = false;
  selectedDocumentId: string;
  documentId: string;

  isFormTypeIdSet: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private store: Store<State>,
    private router: Router
  ) {
    this.store.dispatch(loadFormsConfigurations());
    this.resourcesList$ = store.select(getFormsConfigurations);
  }

  ngOnInit() {
    this.documentId = this.route.snapshot.params['id'];
    this.isPreviewSet = false;
    setTimeout(() => {
      this.isFormTypeIdSet = true;
    }, 100);
  }

  setDocumentTypeId(form) {
    this.isFormTypeIdSet = false;
    setTimeout(() => {
      this.documentId = form.id;
      this.isFormTypeIdSet = true;
    }, 100);
  }
}
