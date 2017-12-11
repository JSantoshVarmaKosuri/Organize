import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/take';

import { AppState } from '../SharedModule/Models/org.organize.application.models';
import { ListItem, ListItemModel } from '../SharedModule/Stores/Models/org.list.model';

import * as fromListActions from '../SharedModule/Stores/ListStore/org.organize.list.actions';

@Component({
    selector: 'org-editor',
    templateUrl: 'org.organize.editor.component.html',
    styleUrls: ['org.organize.editor.component.scss']
})
export class OrganizeEditorComponent implements OnInit {
    toggelAddFeatures: boolean;
    toggelOptions: boolean;
    type: string;
    id: string;
    listItem: ListItemModel;
    placeholders = {
        title: 'Title',
        description: 'Description'
    };

    @ViewChild('title') title: ElementRef;
    @ViewChild('description') description: ElementRef;

    constructor(private router: Router, private route: ActivatedRoute,
                private store: Store<AppState>) {
        this.toggelAddFeatures = false;
        this.route.params
        .subscribe((params) => {
            this.type = params.type;
            this.id = params.id || null;
        });
    }

    createListItem() {
        this.listItem = new ListItem(
            (this.id) ? this.id : (new Date).valueOf().toString(),
            new Date().toUTCString(),
            this.type,
            '',
            '',
            {
                active: [],
                completed: []
            },
            [],
            [],
            []);
    }

    ngOnInit() {
        if (this.id) {
            this.store.select('listStore')
            .take(1)
            .subscribe((data) => {
                const listItem = data.list.find((item) => item.id === this.id);
                if (listItem) {
                    listItem.createdAt = (new Date).valueOf().toString();
                    this.listItem = listItem;
                } else {
                    this.createListItem();
                }
            });
        } else {
            this.createListItem();
        }
    }

    validate(title: string,
             description: string): boolean {

        if((description && this.listItem.type !== 'list') || !!title) {
            return true;
        } else {
            return false;
        }
    }

    onBack() {
        const title = (this.listItem.title === '' || this.listItem.title === this.placeholders.title) ? null : this.listItem.title;
        const description = (this.listItem.description === '' || this.listItem.description === this.placeholders.description) ? null : this.listItem.description;
        
        if (this.validate(title, description)) {
            this.listItem.title = title;
            this.listItem.description = description;         

            if (this.id) {
                this.store.dispatch(new fromListActions.UpdateListItem(this.listItem));
            } else {
                this.store.dispatch(new fromListActions.AddListItem(this.listItem));
            }
        }

        this.router.navigate(['/list']);
    }

    onPin() {

    }

    onReminder() {

    }

    onArchive() {

    }

    onAddFeatures() {
        this.toggelAddFeatures = true;
    }

    onAddFeatureClose() {
        this.toggelAddFeatures = false;
    }

    onOptions() {
        this.toggelOptions = true;
    }

    onOptionsClose() {
        this.toggelOptions = false;
    }
}
