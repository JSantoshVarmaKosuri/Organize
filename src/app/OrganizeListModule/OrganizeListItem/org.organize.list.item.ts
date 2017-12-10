import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ListItemModel } from '../../SharedModule/Stores/Models/org.list.model';

@Component({
    selector: 'org-list-item',
    templateUrl: 'org.organize.list.item.html',
    styleUrls: ['org.organize.list.item.scss']
})
export class OrganizeListItemComponent implements OnInit {
    @Input() item: ListItemModel;

    constructor(private router: Router) {}

    ngOnInit() {

    }

    onListItem() {
        this.router.navigate(['/editor', this.item.type, this.item.id]);
    }
}
