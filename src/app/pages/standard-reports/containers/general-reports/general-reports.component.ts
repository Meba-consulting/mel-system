import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getProgramsForGeneralReports, State } from 'src/app/store';

@Component({
  selector: 'app-general-reports',
  templateUrl: './general-reports.component.html',
  styleUrls: ['./general-reports.component.css'],
})
export class GeneralReportsComponent implements OnInit {
  programs$: Observable<any>;
  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.programs$ = this.store.select(getProgramsForGeneralReports);
  }
}
