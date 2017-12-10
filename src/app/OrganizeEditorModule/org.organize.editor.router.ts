import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OrganizeEditorComponent } from './org.organize.editor.component';

const routes: Routes = [
    { path: 'editor/:type' , component: OrganizeEditorComponent },
    { path: 'editor/:type/:id' , component: OrganizeEditorComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class OrganizeEditorRouter {

}
