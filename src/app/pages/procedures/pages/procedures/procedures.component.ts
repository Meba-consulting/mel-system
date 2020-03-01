import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { State } from "src/app/store/reducers";
import {
  loadProceduresConfigurations,
  loadDocuments
} from "../../store/actions";
import {
  getProceduresConfigurations,
  getProceduresEntities
} from "../../store/selectors";
import * as _ from "lodash";

@Component({
  selector: "app-procedures",
  templateUrl: "./procedures.component.html",
  styleUrls: ["./procedures.component.css"]
})
export class ProceduresComponent implements OnInit {
  departmentId: string;
  resourcesList$: Observable<any>;
  documentEntities$: Observable<any>;
  displayedColumns: string[] = ["id", "name", "url"];
  dataSource = [];
  pdfSrc: string = "";
  isPreviewSet: boolean = false;
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
    this.route.params.forEach((params: Params) => {
      this.departmentId = params["id"];
      this.isPreviewSet = false;
      this.resourcesList$.subscribe(list => {
        if (list) {
          _.map(list, item => {
            if (item.id == params["id"]) {
              const docInfo = {
                docIds: this.getDocIds(item.documents),
                id: item.id
              };
              this.store.dispatch(loadDocuments({ documents: docInfo }));
              this.documentEntities$ = this.store.select(getProceduresEntities);
            }
          });
        }
      });
    });
  }

  getDocIds(docArr) {
    let docStr = "";
    docArr.forEach(doc => {
      docStr += doc.id + ",";
    });
    return docStr;
  }

  selectRow(row) {
    this.selectedDocumentId = row.id;
    this.pdfSrc = "../../../api/documents/" + row.id + "/data";
    this.isPreviewSet = true;
  }

  download() {
    this.router.navigate([]).then(result => {
      window.open(
        "../../../api/documents/" + this.selectedDocumentId + "/data",
        "_blank"
      );
    });
  }

  togglePreview() {
    this.isPreviewSet = false;
  }
}
