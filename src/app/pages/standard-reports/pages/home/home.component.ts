import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/reducers';
import { Observable } from 'rxjs';
import { loadStdReportsList } from '../../store/actions';
import {
  getOldReportsList,
  getCountOfLoadedReportTypes
} from '../../store/selectors';
import { getCurrentUser } from 'src/app/store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  reportsList$: Observable<any>;
  countOfLoadedReportTypes$: Observable<number>;
  reportTypes: any[] = [
    {
      type: 'reports',
      url: 'reports.json?paging=false&fields=*'
    },
    {
      type: 'interactive-reports',
      url: 'dataStore/report-templates/reportsList'
    }
  ];
  currentUser$: Observable<any>;
  currentReportGroup: any;
  isReportGroupSet: boolean = false;
  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.currentUser$ = this.store.select(getCurrentUser);
    this.store.dispatch(loadStdReportsList({ reportsTypes: this.reportTypes }));
    this.reportsList$ = this.store.select(getOldReportsList);
    this.countOfLoadedReportTypes$ = this.store.select(
      getCountOfLoadedReportTypes
    );
  }

  onSelectReportGroup(reportGroup) {
    this.isReportGroupSet = false;
    this.currentReportGroup = reportGroup;
    setTimeout(() => {
      this.isReportGroupSet = true;
    }, 50);
  }
}