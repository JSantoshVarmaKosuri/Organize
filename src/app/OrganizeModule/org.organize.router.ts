import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { OrgOrganizeComponent } from "./org.organize.component";

const routes: Routes = [
    { path: 'list', component: OrgOrganizeComponent}
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class OrgOrganizeRouter {

}