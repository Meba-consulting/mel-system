import { Component, OnInit, Input } from '@angular/core';
import { loadDocuments } from '../../store/actions';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store';

import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { getProceduresByCategoryId } from '../../store/selectors';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  @Input() documentId: string;
  @Input() resourcesList: Array<any>;
  currentProcedures$: Observable<any>;
  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    const docInfo = {
      docIds: this.getDocIds(
        _.filter(this.resourcesList, { id: this.documentId })[0]['documents']
      ),
      id: this.documentId
    };
    this.store.dispatch(loadDocuments({ documents: docInfo }));
    this.currentProcedures$ = this.store.select(getProceduresByCategoryId, {
      id: this.documentId
    });
  }

  getDocIds(docArr) {
    let docStr = '';
    docArr.forEach(doc => {
      docStr += doc.id + ',';
    });
    return docStr;
  }
}
