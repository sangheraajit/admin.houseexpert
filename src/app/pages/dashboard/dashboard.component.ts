import {Component, OnDestroy} from '@angular/core';
import { NbThemeService,NbColorHelper } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators/takeWhile' ;
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from "../../services/api.service";
interface CardSettings {
  title: string;
  iconClass: string;
  total: string;
  type: string;
}

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnDestroy {

  private alive = true;
  
  ShippedAmt: CardSettings = {
    title: 'Total Earnings ',
    iconClass: 'nb-bar-chart',
    total: localStorage.getItem('ShippedAmt'),
    type: 'info',
  };
  LowStock: CardSettings = {
    title: 'Total Bookings',
    iconClass: 'nb-snowy-circled',
    total: localStorage.getItem('LowStock'),
    type: 'info',
  };
  Totalorder: CardSettings = {
    title: 'Total Partners',
    iconClass: 'nb-sunny-circled',
    total: localStorage.getItem('Totalorder'),
    type: 'info',
  };
  QtySold: CardSettings = {
    title: 'Total Customers',
    iconClass: 'nb-sunny',
    total: localStorage.getItem('QtySold'),
    type: 'info',
  };


  statusCards: string;

  commonStatusCardsSet: CardSettings[] = [
    this.ShippedAmt,
    this.LowStock,
    this.Totalorder,
    this.QtySold,
  ];

  statusCardsByThemes: {
    default: CardSettings[];
    cosmic: CardSettings[];
    corporate: CardSettings[];
  } = {
    default: this.commonStatusCardsSet,
    cosmic: this.commonStatusCardsSet,
    corporate: [
      {
        ...this.ShippedAmt,
        type: 'primary',
      
      },
      {
        ...this.LowStock,
        type: 'primary',
      },
      {
        ...this.Totalorder,
        type: 'primary',
      },
      {
        ...this.QtySold,
        type: 'primary',
      },
    ],
  };

  constructor(private themeService: NbThemeService,private spinner: NgxSpinnerService,private ServiceObj: ApiService) {
   this.spinner.hide();
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.statusCards = this.statusCardsByThemes[theme.name];
       
  });
  //this.EntityID = localStorage.getItem('Entity')
 
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
