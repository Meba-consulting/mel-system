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
  constructor(private activityTrackerService: ActivityTrackerService) {}

  ngOnInit(): void {
    this.activityTrackerYears$ = this.activityTrackerService.getActivityTrackerYears();
  }
}
