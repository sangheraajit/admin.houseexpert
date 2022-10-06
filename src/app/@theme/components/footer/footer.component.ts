import { Component } from "@angular/core";
import {environment} from '../../../../environments/environment'
@Component({
  selector: "ngx-footer",
  styleUrls: ["./footer.component.scss"],
  template: `
    <strong
      >Copyright © 2022
      <a href="https://home-services.smartersvision.com">{{headerTitle}}</a>. All
      rights reserved.</strong
    >
  `,
})
export class FooterComponent {
  public headerTitle = environment.projName
}
