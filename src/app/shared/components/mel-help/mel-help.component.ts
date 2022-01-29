import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'MEL-help',
  templateUrl: './mel-help.component.html',
  styleUrls: ['./mel-help.component.scss'],
})
export class MELHelpComponent implements OnInit {
  @Input() appName: string;
  @Input() documentURL: string;
  @Input() isInfoOpen: boolean;
  @Output() cancel = new EventEmitter<boolean>();

  docURL: SafeUrl;
  defaultDocumentURL = `https://josephatj.github.io/MEL-user-manual/docs/introduction/introduction`;

  constructor(private domSanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.docURL = this.documentURL
      ? this.domSanitizer.bypassSecurityTrustResourceUrl(this.documentURL)
      : this.domSanitizer.bypassSecurityTrustResourceUrl(
          this.defaultDocumentURL
        );
  }

  onClose() {
    this.cancel.emit(false);
  }
}
