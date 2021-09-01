import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getCurrentUser, getReportById, State } from 'src/app/store';

@Component({
  selector: 'app-general-report-home',
  templateUrl: './general-report-home.component.html',
  styleUrls: ['./general-report-home.component.css'],
})
export class GeneralReportHomeComponent implements OnInit {
  currentUser$: Observable<any>;
  reportMetadata$: Observable<any>;
  programId: string;
  type: string;
  constructor(
    private route: ActivatedRoute,
    private store: Store<State>,
    private httpClient: NgxDhis2HttpClientService
  ) {}

  ngOnInit(): void {
    this.programId = this.route.snapshot.params['id'];
    this.type = this.route.snapshot.params['type'];
    this.currentUser$ = this.store.select(getCurrentUser);
    if (this.type === 'AGGREGATE') {
      this.reportMetadata$ = this.httpClient.get(
        `dataSets/${this.programId}.json?fields=id,name,description`
      );
    } else {
      this.reportMetadata$ = this.store.select(getReportById, {
        id: this.programId,
      });
    }
  }
}
