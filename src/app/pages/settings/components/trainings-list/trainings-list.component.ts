import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { DataService } from 'src/app/core/services/data.service';
import { ConfirmDeleteModalComponent } from 'src/app/shared/components/confirm-delete-modal/confirm-delete-modal.component';

@Component({
  selector: 'app-trainings-list',
  templateUrl: './trainings-list.component.html',
  styleUrls: ['./trainings-list.component.css'],
})
export class TrainingsListComponent implements OnInit {
  @Input() program: any;
  @Input() ouId: string;
  @Output() edit = new EventEmitter<any>();
  queryResponseData$: Observable<any>;
  constructor(private dataService: DataService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.queryResponseData$ = this.dataService.getTrackedEntityInstances({
      orgUnit: this.ouId,
      program: this.program?.id,
    });
  }

  onSetDelete(e) {
    this.dialog
      .open(ConfirmDeleteModalComponent, {
        width: '30%',
        height: '250px',
        disableClose: false,
        data: { message: 'Are you sure?', item: '' },
        panelClass: 'custom-dialog-container',
      })
      .afterClosed()
      .subscribe((confirmed) => {
        if (confirmed == true) {
          this.dataService
            .deleteTrackedEntityInstance(e.action?.id)
            .subscribe((response) => {
              if (response) {
                this.queryResponseData$ = this.dataService.getTrackedEntityInstances(
                  {
                    orgUnit: this.ouId,
                    program: this.program?.id,
                  }
                );
              }
            });
        }
      });
  }

  onSetEdit(e) {
    this.edit.emit(e);
  }
}