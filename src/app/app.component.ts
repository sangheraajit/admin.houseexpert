import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { SeoService } from './@core/utils/seo.service';
import { ToasterConfig } from 'angular2-toaster';

@Component({
  selector: 'ngx-app',
  template: `
    <router-outlet></router-outlet>
    <toaster-container [toasterconfig]="config"></toaster-container>
  `,
})
export class AppComponent implements OnInit {
  public config: ToasterConfig = new ToasterConfig({
    positionClass: 'toast-bottom-right',
    timeout: 2000,
    newestOnTop: true,
    tapToDismiss: true,
    animation: 'fade',
  });

  constructor(
    private analytics: AnalyticsService,
    private seoService: SeoService,
  ) {}

  ngOnInit(): void {
    this.analytics.trackPageViews();
    this.seoService.trackCanonicalChanges();
  }
}
