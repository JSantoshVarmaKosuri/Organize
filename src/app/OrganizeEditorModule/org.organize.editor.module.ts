import { NgModule } from '@angular/core';

import { OrganizeEditorRouter } from './org.organize.editor.router';

import { OrgSharedModule } from '../SharedModule/org.shared.module';

import { OrganizeEditorComponent } from './org.organize.editor.component';
import { OrganizeEditorNotesComponent } from './OrganizeEditorNotes/org.organize.editor.notes';
import { OrganizeEditorOptionsComponent } from './OrganizeEditorOptions/org.organize.editor.options';

@NgModule({
    declarations: [
        OrganizeEditorComponent,
        OrganizeEditorNotesComponent,
        OrganizeEditorOptionsComponent
    ],
    imports: [
        OrgSharedModule,
        OrganizeEditorRouter
    ],
    exports: [

    ]
})
export class OrganizeEditorModule {

}
