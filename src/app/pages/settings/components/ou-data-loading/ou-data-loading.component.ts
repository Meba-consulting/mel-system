import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { OuService } from 'src/app/core/services/ou.service';
import { AddClubModalComponent } from '../add-club-modal/add-club-modal.component';
import { OuRegistrationComponent } from '../ou-registration/ou-registration.component';

@Component({
  selector: 'app-ou-data-loading',
  templateUrl: './ou-data-loading.component.html',
  styleUrls: ['./ou-data-loading.component.css'],
})
export class OuDataLoadingComponent implements OnInit {
  @Input() group: any;
  @Input() clubCategories: any;
  @Input() currentUser: any;
  @Input() configurations: any;
  ouData$: Observable<any>;
  constructor(private ouService: OuService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.ouData$ = this.ouService.getClubsFromSQLVIEW(this.group?.id);
  }

  onAddOu(e, group) {
    e.stopPropagation();
    if (group?.id === 'GOMCSNn5OdW') {
      this.dialog.open(AddClubModalComponent, {
        width: '50%',
        height: '600px',
        disableClose: false,
        data: {
          clubCategories: this.clubCategories,
          configurations: this.configurations,
        },
        panelClass: 'custom-dialog-container',
      });
      this.dialog.afterAllClosed.subscribe(() => {
        this.ouData$ = this.ouService.getClubsFromSQLVIEW(this.group?.id);
      });
    } else {
      this.dialog
        .open(OuRegistrationComponent, {
          width: '50%',
          height: '600px',
          disableClose: false,
          data: {
            clubCategories: this.clubCategories,
            group: this.group,
            configurations: this.configurations,
          },
          panelClass: 'custom-dialog-container',
        })
        .afterClosed()
        .subscribe(() => {
          this.ouData$ = this.ouService.getClubsFromSQLVIEW(this.group?.id);
        });
    }
  }

  onClose(e) {
    e.stopPropagation();
    this.ouData$ = this.ouService.getClubsFromSQLVIEW(this.group?.id);
  }
}
