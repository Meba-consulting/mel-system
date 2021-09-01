import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getProgramsForGeneralReports, State } from 'src/app/store';
import { orderBy } from 'lodash';

@Component({
  selector: 'app-general-reports',
  templateUrl: './general-reports.component.html',
  styleUrls: ['./general-reports.component.css'],
})
export class GeneralReportsComponent implements OnInit {
  programs$: Observable<any>;
  @Input() programs: any[];
  @Input() dataSets: any[];
  mergedProgramsAndForms: any[] = [];
  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.programs$ = this.store.select(getProgramsForGeneralReports);
    this.mergedProgramsAndForms = orderBy(
      [
        ...this.programs,
        ...this.dataSets.map((dataSet) => {
          return {
            ...dataSet,
            type: 'AGGREGATE',
          };
        }),
      ],
      ['name'],
      ['asc']
    );
  }
}
