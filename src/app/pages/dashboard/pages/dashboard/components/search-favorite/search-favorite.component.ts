import { Component, OnInit } from '@angular/core';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { flatten } from 'lodash';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-search-favorite',
  templateUrl: './search-favorite.component.html',
  styleUrls: ['./search-favorite.component.css'],
})
export class SearchFavoriteComponent implements OnInit {
  filteredOptions$: Observable<any>;
  constructor(
    private httpClientService: NgxDhis2HttpClientService,
    private dialogRef: MatDialogRef<SearchFavoriteComponent>
  ) {}

  ngOnInit(): void {}

  searchFavorite(event): void {
    const searchingText = event.target.value.toLowerCase();
    this.filteredOptions$ = this.httpClientService
      .get(
        `dashboards/q/${searchingText}.json?max=CHART&max=EVENT_CHART&max=EVENT_REPORT&max=REPORTS`
      )
      .pipe(
        map((response) => {
          return flatten(response?.visualizations, response?.reports);
        })
      );
  }

  openFavorite(event: Event, favorite): void {
    event.stopPropagation();
    console.log(favorite);
    setTimeout(() => {
      this.dialogRef.close(favorite);
    }, 400);
  }

  onClose(event: Event): void {
    event.stopPropagation();
    this.dialogRef.close();
  }
}
