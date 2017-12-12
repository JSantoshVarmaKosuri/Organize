import { NgModule } from "@angular/core";

import { OrgSharedModule } from "../SharedModule/org.shared.module";

import { OrganizeDrawComponent } from "./org.organize.draw.component";

import { OrganizeDrawRouter } from "./org.organize.draw.router";

@NgModule({
    declarations: [
        OrganizeDrawComponent
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