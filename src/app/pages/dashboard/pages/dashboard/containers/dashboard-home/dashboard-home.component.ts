import { Component, OnInit } from '@angular/core';
import {
  getDashboardObjectLoading,
  getDashboardObjectLoaded
} from '../../../store';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss']
})
export class DashboardHomeComponent implements OnInit {
  dashboardsLoading$: Observable<boolean>;
  dashboardsLoaded$: Observable<boolean>;
  welcomingMessage: { title: string; description: string };
  welcomingMessageObject: {
    [id: number]: { title: string; description: string };
  };
  constructor(private store: Store<State>) {
    this.dashboardsLoading$ = store.select(getDashboardObjectLoading);
    this.dashboardsLoaded$ = store.select(getDashboardObjectLoaded);
    this.welcomingMessageObject = {
      0: {
        title: 'Intuitive design patterns',
        description: 'Enjoy simple, elegant and improved look and feel'
      },
      1: {
        title: 'Impressive data visualizations',
        description:
          'Interactively visualize you data in charts, table and maps'
      },
      2: {
        title: 'Impressive data dictionary',
        description: 'Do not just look on your data, know more about your data'
      }
    };

    this.welcomingMessage = this.welcomingMessageObject[
      this.getRandomInt(0, 2)
    ];
  }

  ngOnInit() {}

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; // The maximum is inclusive and the minimum is inclusive
  }
}
