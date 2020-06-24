import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { State } from 'src/app/store/reducers';
import { Store } from '@ngrx/store';
import { loadReportMetadata } from '../../store/actions';
import { Observable } from 'rxjs';
import { getOldReportMetadataByReportId } from '../../store/selectors';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  reportMetadata$: Observable<any>;
  filterSelections: any;
  reportType: string;
  reportId: string;
  constructor(private route: ActivatedRoute, private store: Store<State>) {}

  ngOnInit(): void {
    this.reportId = this.route.snapshot.params.id;
    this.reportType = this.route.snapshot.params.type;
    this.store.dispatch(
      loadReportMetadata({
        reportId: this.reportId,
        reportType: this.reportType
      })
    );
    this.reportMetadata$ = this.store.select(getOldReportMetadataByReportId, {
      id: this.reportId
    });
  }
}
