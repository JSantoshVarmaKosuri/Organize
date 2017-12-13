import { NgModule } from "@angular/core";

import { OrgSharedModule } from "../SharedModule/org.shared.module";

import { OrganizeDrawComponent } from "./org.organize.draw.component";

import { OrganizeDrawRouter } from "./org.organize.draw.router";

import { OrganizeDrawingDirective } from "./Directives/org.organize.drawing.directive";

@NgModule({
    declarations: [
        OrganizeDrawComponent,
        OrganizeDrawingDirective
    ],
    imports: [
        OrgSharedModule,
        OrganizeDrawRouter
    ],
    exports: [

    ]
})
export class OrganizeDrawModule {

}