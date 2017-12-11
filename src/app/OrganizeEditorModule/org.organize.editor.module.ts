import { NgModule } from '@angular/core';

import { OrganizeEditorRouter } from './org.organize.editor.router';

import { OrgSharedModule } from '../SharedModule/org.shared.module';

import { OrganizeEditorComponent } from './org.organize.editor.component';
import { OrganizeEditorNotesComponent } from './OrganizeEditorNotes/org.organize.editor.notes';
import { OrganizeEditorOptionsComponent } from './OrganizeEditorOptions/org.organize.editor.options';
import { OrganizeEditorTodoComponent } from './OrganiseEditorTodo/org.organize.todo';

import { OrganizePlaceholderDirective } from './Directives/org.organize.placeholder.directive';

@NgModule({
    declarations: [
        OrganizeEditorComponent,
        OrganizeEditorNotesComponent,
        OrganizeEditorOptionsComponent,
        OrganizePlaceholderDirective,
        OrganizeEditorTodoComponent
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
