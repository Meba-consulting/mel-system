import { Injectable } from '@angular/core';
import { NgxDhis2HttpClientService } from '@hisptz/ngx-dhis2-http-client';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private _reportEntities$: BehaviorSubject<any> = new BehaviorSubject({});
  constructor(private http: NgxDhis2HttpClientService) {}

  loadReportsByIds(reportIds: string[]) {
    this.getReportEntities().subscribe((availableReportEntities: any) => {
      const reports = (reportIds || [])
        .map((reportId: string) => availableReportEntities[reportId])
        .filter(report => report);
      if (reports.length === 0) {
        this.http
          .get(
            `reports.json?fields=id,name,displayName&filter=id:in:[${(
              reportIds || []
            ).join(';')}]&paging=false`
          )
          .subscribe((reportResponse: any) => {
            const reportResults = reportResponse ? reportResponse.reports : [];

            const reportEntities = reportResults.reduce(
              (reportEntity, report) => {
                reportEntity[report.id] = {
                  ...report,
                  url: `../../../dhis-web-reporting/getReportParams.action?mode=report&uid=${
                    report.id
                  }`
                };
                return reportEntity;
              },
              {}
            );
            this._reportEntities$.next({
              ...availableReportEntities,
              ...reportEntities
            });
          });
      }
    });
  }

  getReportEntities() {
    return this._reportEntities$.asObservable();
  }

  getReportsByIds(reportIds: string[]) {
    return this.getReportEntities().pipe(
      map((reportEntities: any) => {
        return (reportIds || [])
          .map((reportId: string) => reportEntities[reportId])
          .filter(report => report);
      })
    );
  }
}
