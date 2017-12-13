import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/take';

import { AppState } from '../SharedModule/Models/org.organize.application.models';
import { ListItem, ListItemModel } from '../SharedModule/Stores/Models/org.list.model';

import * as fromListActions from '../SharedModule/Stores/ListStore/org.organize.list.actions';

import { OrganizeListService } from '../SharedModule/Services/org.organize.list.service';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

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
    @ViewChild('image') imageInput: ElementRef;
    @ViewChild('gallery') galleryInput: ElementRef;
    @ViewChild('recording') recordingInput: ElementRef;

    constructor(private router: Router, private route: ActivatedRoute,
                private store: Store<AppState>,
                private listService: OrganizeListService,
                private _DomSanitizationService: DomSanitizer) {
        this.toggelAddFeatures = false;
        this.route.params
        .subscribe((params) => {
            this.type = params.type;
            this.id = params.id || null;
        });
    }

    linkActiveItem() {
        if(!this.listService.activeListItem) {
            this.listService.createListItem(this.type,null, '', '', {active:[], completed: []}, [], [], []);
        }
        this.listItem = this.listService.activeListItem;
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
                    this.listService.activeListItem = listItem;
                } else {
                    this.linkActiveItem();
                }
            });
        } else {
            this.linkActiveItem();
        }
    }

    validate(title: string,
             description: string): boolean {

        if((description && this.listItem.type !== 'list') 
        || !!title
        || (this.listItem.todo && (this.listItem.todo.active.length || this.listItem.todo.completed.length))
        || (this.listItem.image.length)
        || (this.listItem.drawing.length)
        || (this.listItem.recording.length)) {
            return true;
        } else {
            return false;
        }
    }

    onBack() {
        const title = (this.listItem.title === '' || this.listItem.title === this.placeholders.title) ? null : this.listItem.title;
        // tslint:disable-next-line:max-line-length
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

        this.listService.activeListItem = null;
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

    onAddFeatureClose(type: string) {
        this.toggelAddFeatures = false;
        if (type === 'Camera') {
            this.onCamera();
        } else if (type === 'Gallery') {
            this.onGallery();
        } else if (type === 'Draw') {
            this.onDrawing();
        } else if (type === 'Recording') {
            this.onRecording();
        }
    }

    onOptions() {
        this.toggelOptions = true;
    }

    onOptionsClose(type: string) {
        this.toggelOptions = false;
        if (type === 'Delete') {
            this.onDelete();
        }
    }

    onCamera() {
        this.imageInput.nativeElement.click();
    }

    onCameraChange(event) {
        const file = event.target.files;

        if (file.length) {
            const url = URL.createObjectURL(file[0]);
            this.listItem.image.push(url);
            event.target.value = '';
        }
    }

    onGallery() {
        this.galleryInput.nativeElement.click();
    }

    onGalleryChange(event) {
        const file = event.target.files;

        if (file.length) {
            const url = URL.createObjectURL(file[0]);
            this.listItem.image.push(url);
            event.target.value = '';
        }
    }

    onRecording() {
        if (navigator && navigator.mediaDevices) {
            navigator.getUserMedia({audio: true, video: false},
            function(stream) {
                console.log(stream);
                const timer = Observable.create((observer: Observer<any>) => {
                    setTimeout(() => {
                        if (stream.active) {
                            const audio = URL.createObjectURL(stream);
                            observer.next(audio);
                        } else {
                            observer.error('no audio');
                        }
                        const track = stream.getTracks()[0];
                        track.stop();
                    }, 3000);
                });
                timer.take(1).subscribe((audio) => {
                    this.listItem.recording.push(audio);
                }, (error) => {
                    console.log(error);
                });
            }.bind(this),
            function(error) {
                console.log('getUserMedia() error', error);
            });
        } else {
            this.recordingInput.nativeElement.click();
        }
    }

    onRecordingChange(event) {
        const file = event.target.files;

        if (file.length) {
            const audio = URL.createObjectURL(file[0]);
            this.listItem.recording.push(audio);
            event.target.value = '';
        }
    }

    onDrawing() {
        this.router.navigate(['/draw']);
    }

    onDelete() {
        this.store.dispatch(new fromListActions.DeleteListItem(this.listItem.id));
        this.router.navigate(['/list']);
    }
}
