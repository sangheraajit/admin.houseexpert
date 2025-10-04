import { Component, Input } from '@angular/core';
import { ToasterService, ToasterConfig } from 'angular2-toaster';

@Component({
  selector: 'app-customer-info',
  template: `
    <div>
      <div class="cust-name"><b>{{ rowData.cust_name }}</b></div>

      <!-- Email Row -->
      <div class="cust-row">
        <i class="fa fa-envelope"></i>
        <span class="cust-text">{{ rowData.cust_email }}</span>
        <i class="fa fa-copy copy-icon"
           title="Copy Email"
            (click)="copyToClipboard(rowData.cust_email, 'email')"></i>
           <span *ngIf="copiedField === 'email'" class="copied-msg">Copied!</span>
      </div>

      <!-- Phone Row -->
      <div class="cust-row">
        <i class="fa fa-phone"></i>
        <span class="cust-text">{{ rowData.cust_mobile }}</span>
        <i class="fa fa-copy copy-icon"
           title="Copy Phone"
           (click)="copyToClipboard(rowData.cust_mobile, 'phone')"></i>
           <span *ngIf="copiedField === 'email'" class="copied-msg">Copied!</span>
      </div>
    </div>
  `,
  styles: [`
    .cust-row {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-top: 3px;
    }
    .cust-text {
      flex: 1;
    }
    .copy-icon {
      cursor: pointer;
      transition: transform 0.2s, color 0.2s;
    }
    .copy-icon:active {
      transform: scale(1.2);
      color: green;
    }
  `]
})
export class CustomerInfoComponent {
  @Input() value: any;
  @Input() rowData: any;

  constructor(private toasterService: ToasterService) {}

 /*  copyToClipboard(text: string, type: string) {
    navigator.clipboard.writeText(text).then(() => {
    //  this.toasterService.pop('success', 'Copied', `${type} copied!`);
    });
  } */
 copiedField: 'email' | 'phone' | null = null;

  copyToClipboard(text: string, field: 'email' | 'phone') {
    navigator.clipboard.writeText(text).then(() => {
      this.copiedField = field;

      // Reset after 2s so message disappears
      setTimeout(() => {
        this.copiedField = null;
      }, 2000);
    });
  }
}
