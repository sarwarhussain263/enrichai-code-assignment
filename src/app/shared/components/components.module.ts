import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { HeaderTemplateComponent } from "./header-template/header-template.component";

export const COMPONENTS = [
  HeaderTemplateComponent,
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
