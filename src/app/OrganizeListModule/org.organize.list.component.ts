import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/take';

import { AppState } from '../SharedModule/Models/org.organize.application.models';
import { Observable } from 'rxjs/Observable';

import { ListReducer } from '../SharedModule/Stores/Models/org.list.model';

import { OrganizeListService } from '../SharedModule/Services/org.organize.list.service';

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

    @ViewChild('image') imageInput: ElementRef;

    constructor(private router: Router, 
                private store: Store<AppState>,
                private listService: OrganizeListService) {
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
        this.listService.createListItem('list',null, '', '', {active:[], completed: []}, [], [], []);
        this.router.navigate(['/editor', 'list']);
    }

    onNote() {
        this.listService.createListItem('note',null, '', '', null, [], [], []);
        this.router.navigate(['/editor', 'note']);
    }

    onRecord() {
        this.listService.createListItem('record',null, null, null, null, [], [], []);
        this.router.navigate(['/editor', 'record']);
    }

    onDrawing() {
        this.listService.createListItem('draw',null, null, null, null, [], [], []);
        this.router.navigate(['/editor', 'draw']);
    }

    onCamera() {
        this.imageInput.nativeElement.click();
    }

    onCameraChange(event) {
        const file = event.target.files; 
        
        if(file.length) {
            const url = URL.createObjectURL(file[0]);
            this.listService.createListItem('camera',null, null, null, null, [], [], [url]);
            this.router.navigate(['/editor', 'camera']);
        }
    }
}
