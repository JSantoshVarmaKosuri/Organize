import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, OnChanges } from '@angular/core';
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
export class OrganizeEditorComponent implements OnInit, OnChanges {
    toggelAddFeatures: boolean;
    toggelOptions: boolean;
    type: string;
    isList: boolean;
    id: string;
    fragment: string;
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
                private _DomSanitizationService: DomSanitizer,
                private ref: ChangeDetectorRef) {
        this.toggelAddFeatures = false;
        this.route.fragment.subscribe((fragment: string) => {
            this.fragment = fragment;
        });
        this.route.params
        .subscribe((params) => {
            this.type = params.type;
            this.id = params.id || null;
            (this.type === 'list') ? this.isList = true : this.isList = false;
            
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

            this.listItem.type = this.type;
        });
    }

    linkActiveItem() {
        if(!this.listService.activeListItem) {
            this.listService.createListItem(this.type,null, '', '', {active:[], completed: []}, [], [], []);
        }
        this.listItem = this.listService.activeListItem;
    }

    ngOnInit() {
        if (this.type === 'record' && this.fragment === 'new') {
            setTimeout(() => {
                this.ref.detectChanges();
            }, 4000, this);
        }
    }

    ngOnChanges(simpleChanges) {
        this.listItem = this.listService.activeListItem;
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
        const description = (this.listItem.description === '' || this.listItem.description === this.placeholders.description || this.listItem.type === 'list') ? null : this.listItem.description;

        if (this.listItem.type === 'note') {
            this.listItem.todo = {
                active: [],
                completed: []
            };
        }

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
        } else if (type === 'List') {
            this.router.navigate(['/editor', 'list', this.listItem.id]);
        } else if (type === 'Note') {
            this.router.navigate(['/editor', 'note', this.listItem.id]);
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
        if (navigator && navigator.mediaDevices && (<any>window).MediaRecorder && ((<any>window).SpeechRecognition || (<any>window).webkitSpeechRecognition || (<any>window).mozSpeechRecognition || (<any>window).msSpeechRecognition)) {
            let audio;
            navigator.mediaDevices.getUserMedia({ audio: true, video: false }).then(function(stream) {
                const chunks = [];
                const context = new AudioContext();
                let options;
                if ((<any>window).MediaRecorder.isTypeSupported('audio/webm')) {
                    options = {mimeType: 'audio/webm'};
                }
                const mediaRecorder = new (<any>window).MediaRecorder(stream, options);
                const recognition = new ((<any>window).SpeechRecognition || (<any>window).webkitSpeechRecognition || (<any>window).mozSpeechRecognition || (<any>window).msSpeechRecognition)();

                recognition.continuous = true;
                recognition.lang = 'en-US';
                recognition.interimResults = false;
                recognition.maxAlternatives = 1;

                recognition.onsoundstart = function() {
                    console.log('Some sound is being received');
                    this.listItem.description = this.listItem.description + ' ' +  'Some sound is being received';
                }.bind(this);

                recognition.onresult = function(event) {
                    try { 
                        this.listItem.description = this.listItem.description + ' ' +  event.results[0][0].transcript;
                        this.ref.detectChanges();
                        console.log(this.listItem.description);
                    } catch(e) {
                        console.log(e);
                    }
                    console.log(event.results[0][0].transcript);
                }.bind(this);

                recognition.onerror = function(event) {
                    this.listItem.description = this.listItem.description + ' ' + 'Speech recognition error detected: ' + event.error;

                    this.listItem.description = this.listItem.description + ' ' + 'Speech recognition error detected: ' + event.message;
                    console.log('Speech recognition error detected: ' + event.error);
                    console.log('Additional information: ' + event.message);
                }.bind(this);

                recognition.onnomatch = function() {
                    this.listItem.description = this.listItem.description + ' ' +  'Speech not recognised';
                    console.log('Speech not recognised');
                }.bind(this);

                recognition.onsoundend = function() {
                    this.listItem.description = this.listItem.description + ' ' +  'Sound has stopped being received';
                    console.log('Sound has stopped being received');
                }.bind(this);

                mediaRecorder.start();
                recognition.start();

                mediaRecorder.ondataavailable = function(e) {
                    chunks.push(e.data);
                }

                mediaRecorder.onstop = function(e) {
                    const blob = new Blob(chunks, { 'type' : 'audio/ogg; codecs=opus' });
                    const audio = URL.createObjectURL(blob);
    
                    chunks.length = 0;

                    this.listItem.recording.push(audio);
                    this.listService.activeListItem = this.listItem;
                    this.ref.detectChanges();
                }.bind(this);

                setTimeout(function() {
                    mediaRecorder.stop();
                    recognition.stop();
                    const track = stream.getTracks()[0];
                    track.enabled = false;
                    track.stop();
                }, 5000, this);
            }.bind(this), function(error) {
                alert(error);
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

    onRemoveAudioItem(index: number) {
        console.log(index);
        this.listItem.recording.splice(index, 1);
        this.ref.detectChanges();
    }

    onDrawing() {
        this.router.navigate(['/draw']);
    }

    onDelete() {
        this.store.dispatch(new fromListActions.DeleteListItem(this.listItem.id));
        this.router.navigate(['/list']);
    }
}
