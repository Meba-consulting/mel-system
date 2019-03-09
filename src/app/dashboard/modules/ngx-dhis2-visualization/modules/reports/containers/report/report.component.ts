import { Component, OnInit, Input } from '@angular/core';
import { ReportService } from '../../services/report.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  @Input()
  reports: { id: string }[];

  reports$: Observable<any[]>;
  constructor(private reportService: ReportService) {}

  ngOnInit() {
    if (this.reports && this.reports.length > 0) {
      const reportIds = (this.reports || [])
        .map((report: any) => (report ? report.id : null))
        .filter(reportId => reportId);

      this.reports$ = this.reportService.getReportsByIds(reportIds);
      this.reportService.loadReportsByIds(reportIds);
    }
  }
}
