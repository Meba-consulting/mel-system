import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivityTrackerService } from '../../services/activity-tracker.service';

@Component({
  selector: 'app-activity-tracker',
  templateUrl: './activity-tracker.component.html',
  styleUrls: ['./activity-tracker.component.css'],
})
export class ActivityTrackerComponent implements OnInit {
  @Input() currentUser: any;
  activityTrackerYears$: Observable<any>;
  indicators$: Observable<any>;
  isInfoOpen: boolean = false;
  isExpanded: boolean = true;
  isDark: boolean = false;
  documentURL: string =
    'https://josephatj.github.io/MEL-user-manual/docs/activity-tracker/summary';
  constructor(private activityTrackerService: ActivityTrackerService) {}

  ngOnInit(): void {
    this.activityTrackerYears$ =
      this.activityTrackerService.getActivityTrackerYears();
    this.indicators$ = this.activityTrackerService.getIndicators();
  }

  shouldReload(reload: boolean) {
    if (reload) {
      this.activityTrackerYears$ =
        this.activityTrackerService.getActivityTrackerYears();
      this.indicators$ = this.activityTrackerService.getIndicators();
    }
  }

  toggleMELHelp(event: Event): void {
    event.stopPropagation();
    this.isInfoOpen = !this.isInfoOpen;
  }

  onOpenInfo(): void {
    this.isInfoOpen = true;
  }

  onInfoClose(e): void {
    this.isInfoOpen = e;
  }

  toggleLogMonitor() {
    this.isExpanded = !this.isExpanded;
  }

  toggleTheme() {
    this.isDark = !this.isDark;
  }

  onOpenConsole() {
    this.isExpanded = !this.isExpanded;
  }
}
