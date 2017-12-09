import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'org-organize',
    templateUrl: 'org.organize.list.component.html',
    styleUrls: ['org.organize.list.component.scss']
})
export class OrgListComponent {
    toggleMenu: boolean;
    toggleState: string;
    toggleLayout: string;

    constructor(private router: Router) {
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
