import { NgModule } from '@angular/core';

import { OrgSharedModule } from '../SharedModule/org.shared.module';

import { OrgListRouter } from './org.organize.list.router';

import { OrgListComponent } from './org.organize.list.component';

@NgModule({
    declarations: [
        OrgListComponent
    ],
    imports: [
        OrgSharedModule,
        OrgListRouter
    ],
    exports: [
        OrgListComponent
    ]
})
export class OrgListModule {

}
