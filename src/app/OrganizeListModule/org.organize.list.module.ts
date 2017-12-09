import { NgModule } from '@angular/core';

import { OrgSharedModule } from '../SharedModule/org.shared.module';

import { OrgListRouter } from './org.organize.list.router';

import { OrgListComponent } from './org.organize.list.component';
import { OrganizeMenuComponent } from './OrganizeMenu/org.organize.menu.component';

@NgModule({
    declarations: [
        OrgListComponent,
        OrganizeMenuComponent
    ],
    imports: [
        OrgSharedModule,
        OrgListRouter
    ],
    exports: [

    ]
})
export class OrgListModule {

}
