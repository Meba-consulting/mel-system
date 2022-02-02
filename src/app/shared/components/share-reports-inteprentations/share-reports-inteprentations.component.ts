import { Component, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { InterpretationsService } from 'src/app/core/services';

@Component({
  selector: 'app-share-reports-inteprentations',
  templateUrl: './share-reports-inteprentations.component.html',
  styleUrls: ['./share-reports-inteprentations.component.css'],
})
export class ShareReportsInteprentationsComponent implements OnInit {
  @Input() itemNameForSharing: string;
  @Input() itemType: string;
  @Input() itemUid: string;
  description: string;
  comment: string;
  @Input() parameters: { ou: any; pe: any };
  @Input() shouldOpenAccordion: boolean;
  @Input() showAllTypesOfInterpretations: boolean;
  savingInterpretationResponse$: Observable<any>;
  interpretationResponse$: Observable<any>;
  allInterpretationsTypesResponse$: Observable<any>;
  savingInterpretation: boolean = false;
  savingComment: boolean = false;

  constructor(private interpretationService: InterpretationsService) {}

  ngOnInit(): void {
    if (!this.showAllTypesOfInterpretations) {
      this.getInterpretationsForSpecificReport();
    } else {
      this.getInterpretations();
    }
  }

  getInterpretations(): void {
    this.interpretationResponse$ =
      this.interpretationService.getAllInterpretations();
  }

  getInterpretationsForSpecificReport(): void {
    this.interpretationResponse$ = of(null);
    setTimeout(() => {
      this.interpretationResponse$ =
        this.interpretationService.getIntepretationsForSpecificReport(
          this.itemType,
          this.itemUid,
          this.parameters?.pe?.id,
          this.parameters?.ou?.id
        );
    }, 100);
  }

  setComment(event: any, interpretation: any): void {
    this.comment = event.target.value;
  }

  onSaveComment(event: Event, comment, interpretation): void {
    this.savingComment = true;
    event.stopPropagation();
    this.interpretationService
      .saveComment(interpretation?.id, comment)
      .subscribe((response) => {
        if (response) {
          this.savingComment = false;
        }
      });
    this.getInterpretationsForSpecificReport();
  }

  onSave(
    event: Event,
    data: string,
    itemType: string,
    parameters: any,
    itemUid: string
  ): void {
    event.stopPropagation();
    this.savingInterpretation = true;
    const queryParams = `pe=${parameters?.pe?.id}&ou=${parameters?.ou?.id}`;
    this.savingInterpretationResponse$ =
      this.interpretationService.saveInterpretation(
        itemType,
        itemUid,
        queryParams,
        data
      );
    this.savingInterpretationResponse$.subscribe((response) => {
      if (response) {
        this.getInterpretationsForSpecificReport();
      }
    });
  }

  setDescription(event: any): void {
    this.description = event.target.value;
  }
}
