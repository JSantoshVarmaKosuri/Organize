import { BrowserModule } from '@angular/platform-browser';

import { NgModule } from '@angular/core';

import { OrgCoreRouter } from './org.core.router';

import { OrgSharedModule } from '../SharedModule/org.shared.module';
import { OrgListModule } from '../OrganizeListModule/org.organize.list.module';

import { OrgCoreComponent } from './org.core.component';

@NgModule({
    declarations: [
        OrgCoreComponent
    ],
    imports: [
        BrowserModule,
        OrgSharedModule,
        OrgListModule,
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
