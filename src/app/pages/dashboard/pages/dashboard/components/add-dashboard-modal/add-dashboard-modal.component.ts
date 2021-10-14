import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-dashboard-modal',
  templateUrl: './add-dashboard-modal.component.html',
  styleUrls: ['./add-dashboard-modal.component.css'],
})
export class AddDashboardModalComponent implements OnInit {
  dashboardName: string;
  addingDashboard: boolean = false;
  addedDashboard: boolean = false;
  constructor(private dialogRef: MatDialogRef<AddDashboardModalComponent>) {}

  ngOnInit(): void {}

  onCancel(event: Event): void {
    event.stopPropagation();
    this.dialogRef.close(null);
  }

  onAdd(event: Event): void {
    event.stopPropagation();
    this.addingDashboard = true;
    setTimeout(() => {
      this.addingDashboard = false;
      this.addedDashboard = true;
    }, 300);
    setTimeout(() => {
      this.addingDashboard = false;
      this.addedDashboard = false;
      this.dialogRef.close(this.dashboardName);
    }, 500);
  }
}
