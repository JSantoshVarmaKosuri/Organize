import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { OrgCoreRouter } from './org.core.router';

import { OrgSharedModule } from '../SharedModule/org.shared.module';
import { OrgListModule } from '../OrganizeListModule/org.organize.list.module';
import { OrganizeEditorModule } from '../OrganizeEditorModule/org.organize.editor.module';

import { OrgCoreComponent } from './org.core.component';

import { ListReducers } from '../SharedModule/Stores/ListStore/org.organize.list.reducer';

@NgModule({
    declarations: [
        OrgCoreComponent
    ],
    imports: [
        BrowserModule,
        OrgSharedModule,
        OrgListModule,
        OrganizeEditorModule,
        OrgCoreRouter,
        StoreModule.forRoot({ listStore: ListReducers})
    ],
    exports: [

    ],
    bootstrap: [
        OrgCoreComponent
    ]
})
export class OrgCoreModule {

}
