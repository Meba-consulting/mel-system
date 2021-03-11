import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { formatDateToYYMMDD } from 'src/app/pages/data-entry/helpers';

@Component({
  selector: 'app-close-club',
  templateUrl: './close-club.component.html',
  styleUrls: ['./close-club.component.css'],
})
export class CloseClubComponent implements OnInit {
  item: any;
  closedDate: any;
  message: string = '';
  closingResponse$: Observable<any>;
  savingChanges: boolean = false;
  updated: boolean = false;
  constructor(
    private dialogRef: MatDialogRef<CloseClubComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private httpClient: NgxDhis2HttpClientService
  ) {
    this.item = data;
  }

  ngOnInit(): void {}

  onConfirmCloseClub(e, item) {
    e.stopPropagation();
    this.savingChanges = true;
    this.httpClient
      .get('organisationUnits/' + item?.id + '.json')
      .subscribe((ouResponse) => {
        if (ouResponse) {
          let data = {
            path: ouResponse?.path,
            level: ouResponse?.level,
            user: ouResponse?.user,
            attributeValues: ouResponse?.attributeValues,
            ancestors: ouResponse?.ancestors,
            parent: ouResponse?.parent,
            name: item?.name,
            shortName: ouResponse?.shortName,
            phoneNumber: ouResponse?.phoneNumber,
            openingDate: ouResponse?.openingDate,
            closedDate: !item?.closedDate ? this.closedDate : null,
          };
          this.closingResponse$ = this.httpClient
            .put(`organisationUnits/${item?.id}?mergeMode=UPDATE`, data)
            .pipe(
              map((response) => {
                if (response) {
                  this.updated = true;
                  this.savingChanges = false;
                  this.message = 'Successfully updated ' + this.item?.name;
                  setTimeout(() => {
                    this.message = '';
                  }, 1000);
                }
                return response;
              }),
              catchError((error) => {
                this.savingChanges = false;
                this.message = 'Failed';
                return of(error);
              })
            );
        }
      });
  }

  onDateChange(date) {
    this.closedDate = formatDateToYYMMDD(date);
  }

  onClose(e) {
    e.stopPropagation();
    this.dialogRef.close(this.updated);
  }
}
