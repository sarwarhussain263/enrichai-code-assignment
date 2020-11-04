import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { HeaderTemplateComponent } from "./header-template/header-template.component";
import { LineChartComponent } from './line-chart/line-chart.component';
import { StackedColumnChartComponent } from './stacked-column-chart/stacked-column-chart.component';
import { TimeChartComponent } from './time-chart/time-chart.component';
import { MicroChartComponent } from './micro-chart/micro-chart.component';

export const COMPONENTS = [
  //HTML page header component
  HeaderTemplateComponent,

  // Charts and Map Component
  LineChartComponent,
  StackedColumnChartComponent,
  TimeChartComponent,
  MicroChartComponent
];

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class ComponentsModule { }
