import { Injectable } from '@angular/core';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  constructor(private http: NgxDhis2HttpClientService) {}

  getReportsByIds(reportIds: string[]) {
    return this.http
      .get(
        `reports.json?fields=id,name,displayName&filter=id:in:[${(
          reportIds || []
        ).join(';')}]&paging=false`
      )
      .pipe(
        map(reportResponse =>
          (reportResponse ? reportResponse.reports : []).map((report: any) => ({
            ...report,
            url: `../../../dhis-web-reporting/getReportParams.action?mode=report&uid=${report.id}`
          }))
        )
      );
  }
}
