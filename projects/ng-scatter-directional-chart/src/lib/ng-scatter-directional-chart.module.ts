import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgScatterDirectionalChartComponent } from './ng-scatter-directional-chart.component';

import { HelipopperModule } from '@ngneat/helipopper';

@NgModule({
  declarations: [NgScatterDirectionalChartComponent],
  imports: [
    CommonModule,
    HelipopperModule
  ],
  exports: [NgScatterDirectionalChartComponent]
})
export class NgScatterDirectionalChartModule { }
