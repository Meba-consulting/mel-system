import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-selection-filters-modal',
  templateUrl: './selection-filters-modal.component.html',
  styleUrls: ['./selection-filters-modal.component.css'],
})
export class SelectionFiltersModalComponent implements OnInit {
  selectionDialogData: any;
  selectionFilterConfig: any;
  dataSelections: any;
  constructor(
    private dialogRef: MatDialogRef<SelectionFiltersModalComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.selectionDialogData = data;
  }

  ngOnInit(): void {
    this.dataSelections = this.selectionDialogData?.dataSelections;
    this.selectionFilterConfig = {
      showDataFilter:
        this.selectionDialogData?.selectedFilter == 'DATA' ? true : false,
      showOrgUnitFilter:
        this.selectionDialogData?.selectedFilter == 'ORG_UNIT' ? true : false,
      showPeriodFilter:
        this.selectionDialogData?.selectedFilter == 'PERIOD' ? true : false,
      showLayout: true,
    };
  }

  onFilterClose(selections): void {
    this.dialogRef.close({
      selectionItems: selections,
      selectedFilter: this.selectionDialogData?.selectedFilter,
    });
  }

  onFilterUpdateAction(selections) {
    this.dialogRef.close({
      selectionItems: selections,
      selectedFilter: this.selectionDialogData?.selectedFilter,
    });
  }

  onClose(e) {
    e.stopPropagation();
    this.dialogRef.close();
  }
}
