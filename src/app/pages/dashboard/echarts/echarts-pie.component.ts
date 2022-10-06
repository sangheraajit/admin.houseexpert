import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'ngx-echarts-pie',
  template: `
    <div echarts [options]="options" class="echart"></div>
  `,
})
export class EchartsPieComponent implements AfterViewInit, OnDestroy {
  options: any = {};
  themeSubscription: any;
  public names = [];
  public  channelwise: any[];
  constructor(private theme: NbThemeService) {
 this.channelwise = JSON.parse(localStorage.getItem('Channelwise'))
    // for(let i of this.channelwise)
    // {
    //   this.names.push(i.name);
    // }
  }

  ngAfterViewInit() {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors = config.variables;
      const echarts: any = config.variables.echarts;
      
      this.options = {
        backgroundColor: echarts.bg,
        color: [colors.warningLight, colors.infoLight, colors.dangerLight, colors.successLight, colors.primaryLight],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: this.names,
          // ['USA', 'Germany', 'France', 'Canada', 'Russia'],
          textStyle: {
            color: echarts.textColor,
          },
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: '80%',
            center: ['50%', '50%'],
            data: this.channelwise,
            // [
            //   { value: 335, name: 'Germany' },
            //   { value: 310, name: 'France' },
            //   { value: 234, name: 'Canada' },
            //   { value: 135, name: 'Russia' },
            //   { value: 1548, name: 'USA' },
            // ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: echarts.itemHoverShadowColor,
              },
            },
            label: {
              normal: {
                textStyle: {
                  color: echarts.textColor,
                },
              },
            },
            labelLine: {
              normal: {
                lineStyle: {
                  color: echarts.axisLineColor,
                },
              },
            },
          },
        ],
      };
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
