import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OrgListComponent } from './org.organize.list.component';

const routes: Routes = [
    { path: 'list', component: OrgListComponent}
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class OrgListRouter {

}
