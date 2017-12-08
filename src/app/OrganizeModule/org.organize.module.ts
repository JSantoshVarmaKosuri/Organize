import { NgModule } from "@angular/core";

import { OrgSharedModule } from "../SharedModule/org.shared.module";

import { OrgOrganizeRouter } from "./org.organize.router";

import { OrgOrganizeComponent } from "./org.organize.component";

@NgModule({
    declarations: [
        OrgOrganizeComponent
    ],
    imports: [
        OrgSharedModule,
        OrgOrganizeRouter
    ],
    exports: [
        OrgOrganizeComponent
    ]
})
export class OrgOrganizeModule {

}