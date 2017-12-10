import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/take';

import { AppState } from '../SharedModule/Models/org.organize.application.models';
import { Observable } from 'rxjs/Observable';

import { ListReducer } from '../SharedModule/Stores/Models/org.list.model';

@Component({
    selector: 'org-organize',
    templateUrl: 'org.organize.list.component.html',
    styleUrls: ['org.organize.list.component.scss']
})
export class OrgListComponent implements OnInit {
    toggleMenu: boolean;
    toggleState: string;
    toggleLayout: string;
    listState: Observable<ListReducer>;

    constructor(private router: Router, private store: Store<AppState>) {
        this.toggleMenu = false;
        this.toggleState = 'inactive';
        this.toggleLayout = 'list';
    }

    ngOnInit() {
        this.listState = this.store.select('listStore');
    }

    onMenu() {
        this.toggleMenu = !this.toggleMenu;
        this.toggleState = (this.toggleState === 'inactive') ? 'active' : 'inactive';
    }

    onLayout() {
        this.toggleLayout = (this.toggleLayout === 'list') ? 'grid' : 'list';
    }

    onSearch() {

    }

    onList() {
        this.router.navigate(['/editor', 'list']);
    }

    onNote() {
        this.router.navigate(['/editor', 'note']);
    }

    onRecord() {
        this.router.navigate(['/editor', 'record']);
    }

    onDrawing() {
        this.router.navigate(['/editor', 'draw']);
    }

    onCamera() {
        this.router.navigate(['/editor', 'camera']);
    }
}
