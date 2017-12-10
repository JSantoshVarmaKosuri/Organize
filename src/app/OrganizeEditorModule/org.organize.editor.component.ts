import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
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
export class OrganizeEditorComponent implements OnInit, AfterViewChecked {
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

    ngOnInit() {
        if (this.id) {
            this.store.select('listStore')
            .take(1)
            .subscribe((data) => {
                this.listItem = data.list.find((item) => item.id === this.id);
            });
        }
    }

    ngAfterViewChecked() {
        if (this.listItem) {
            this.title.nativeElement.innerText = this.listItem.title;
            this.description.nativeElement.innerText = this.listItem.description;
            this.listItem = null;
        }
    }

    validate() {
        const title = this.title.nativeElement.innerText;
        const description = this.description.nativeElement.innerText;

        if ((title === ''  || title === this.placeholders.title)
            && (description === ''  || description === this.placeholders.description)) {
            return false;
        } else {
            return true;
        }
    }

    onBack() {
        const title = this.title.nativeElement.innerText;
        const description = this.description.nativeElement.innerText;

        if (this.validate()) {
            const listItem = new ListItem(
                                (this.id ? this.id : new Date).valueOf().toString(),
                                this.type,
                                (title === ''  || title === this.placeholders.title) ? null : title,
                                (description === ''  || description === this.placeholders.description) ? null : description,
                                [],
                                false,
                                false,
                                false,
                                null);

            if (this.id) {
                this.store.dispatch(new fromListActions.UpdateListItem(listItem));
            } else {
                this.store.dispatch(new fromListActions.AddListItem(listItem));
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
