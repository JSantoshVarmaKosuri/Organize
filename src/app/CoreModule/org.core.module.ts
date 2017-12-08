import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from "@angular/core";

import { OrgCoreRouter } from "./org.core.router";

import { OrgSharedModule } from "../SharedModule/org.shared.module";
import { OrgOrganizeModule } from "../OrganizeModule/org.organize.module";

import { OrgCoreComponent } from "./org.core.component";


@NgModule({
    declarations: [
        OrgCoreComponent
    ],
    imports: [
        BrowserModule,
        OrgSharedModule,
        OrgOrganizeModule,
        OrgCoreRouter
    ],
    exports: [

    ],
    bootstrap: [
        OrgCoreComponent
    ]
})
export class OrgCoreModule {
    
}