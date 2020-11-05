import { NgModule, ModuleWithProviders } from "@angular/core";
import { ChartService } from './chart-service';


@NgModule()
export class ApiClientModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: ApiClientModule,
            providers: [
                ChartService,
            ]
        };
    }
}