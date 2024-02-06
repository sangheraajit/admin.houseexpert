// import { Component, Input } from '@angular/core';

// @Component({
//   selector: 'ngx-status-card',
//   styleUrls: ['./status-card.component.scss'],
//   template: `
//     <nb-card (click)="on = !on" [ngClass]="{'off': !on}">
//       <div class="icon-container">
//         <div class="icon status-{{ type }}">
//           <ng-content></ng-content>
//         </div>
//       </div>

//       <div class="details">
//         <div class="title h5">{{ title }}</div>
//         <div class="status paragraph-2">{{ on ? 'ON' : 'OFF' }}</div>
//       </div>
//     </nb-card>
//   `,
// })
// export class StatusCardComponent {

//   @Input() title: string;
//   @Input() type: string;
//   @Input() on = true;
// }

import { Component, Input } from '@angular/core';

@Component({
  selector: 'ngx-status-card',
  styleUrls: ['./status-card.component.scss'],
  template: `
    <nb-card (click)="on = !on" [ngClass]="{'off': !on}">
      <div class="icon-container">
        <div class="icon {{ type }}">
          <ng-content></ng-content>
        </div>
      </div>

      <div class="details">
        <div class="title h5">{{ title }}</div>
        <div class="status paragraph-2">{{ total }}</div>
      </div>
    </nb-card>
  `,
})
export class StatusCardComponent {

  @Input() title: string;
  @Input() type: string;
  @Input() total: string;
  @Input() on = false;
}
