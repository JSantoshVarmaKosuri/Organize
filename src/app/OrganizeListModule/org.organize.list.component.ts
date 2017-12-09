import { Component } from '@angular/core';

@Component({
    selector: 'org-organize',
    templateUrl: 'org.organize.list.component.html',
    styleUrls: ['org.organize.list.component.scss']
})
export class OrgListComponent {
    toggleMenu: boolean;
    toggleState: string;
    toggleLayout: string;

    constructor() {
        this.toggleMenu = false;
        this.toggleState = 'inactive';
        this.toggleLayout = 'list';
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

    }

    onNote() {

    }

    onRecord() {

    }

    onCamera() {

    }
}
