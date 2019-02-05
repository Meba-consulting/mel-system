import { Component, OnInit, Input } from '@angular/core';
import { fadeInOutAnimation } from 'src/app/animations/fadeInOut.animations';

@Component({
  selector: 'app-dashboard-visualization-progress',
  templateUrl: './dashboard-visualization-progress.component.html',
  styleUrls: ['./dashboard-visualization-progress.component.scss'],
  animations: [fadeInOutAnimation]
})
export class DashboardVisualizationProgressComponent implements OnInit {
  @Input()
  progressMessages: any;
  constructor() {}

  ngOnInit() {}
}
