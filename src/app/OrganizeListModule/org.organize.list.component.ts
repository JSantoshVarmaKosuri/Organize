import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/take';

import { AppState } from '../SharedModule/Models/org.organize.application.models';

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
    @ViewChild('recording') recordingInput: ElementRef;

    constructor(private router: Router,
                private store: Store<AppState>,
                private listService: OrganizeListService) {
        this.toggleMenu = false;
        this.toggleState = 'inactive';
        this.toggleLayout = this.listService.layout;
    }

    ngOnInit() {
        this.listState = this.store.select('listStore');
    }

    onMenu() {
        this.toggleMenu = !this.toggleMenu;
        this.toggleState = (this.toggleState === 'inactive') ? 'active' : 'inactive';
    }

    onLayout() {
        this.listService.layout = (this.listService.layout === 'list') ? 'grid' : 'list';
        this.toggleLayout = this.listService.layout;
    }

    onSearch() {

    }

    onList() {
        this.listService.createListItem('list', null, '', '', {active: [], completed: []}, [], [], []);
        this.router.navigate(['/editor', 'list']);
    }

    onNote() {
        this.listService.createListItem('note', null, '', '', null, [], [], []);
        this.router.navigate(['/editor', 'note']);
    }

    onDrawing() {
        this.listService.createListItem('draw', null, null, null, null, [], [], []);
        this.router.navigate(['/draw'], {fragment : 'new'});
    }

    onCamera() {
        this.imageInput.nativeElement.click();
    }

    onCameraChange(event) {
        const file = event.target.files;

        if (file.length) {
            const url = URL.createObjectURL(file[0]);
            this.listService.createListItem('camera', null, null, null, null, [], [], [url]);
            event.target.value = '';
            this.router.navigate(['/editor', 'camera']);
        }
    }

    onRecording() {
        if (navigator && navigator.mediaDevices) {
            this.listService.createListItem('record', null, null, null, null, [], [], []);
            this.router.navigate(['/editor', 'record']);
            navigator.getUserMedia({audio: true, video: false},
            function(stream) {
                console.log(stream);
                setTimeout(() => {
                    if (stream.active) {
                        const audio = URL.createObjectURL(stream);
                        console.log(audio);
                        this.listService.activeListItem.recording.push(audio);
                    } else {
                        console.log('no audio');
                    }
                    const track = stream.getTracks()[0];
                    track.stop();
                }, 3000, this);
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
            this.listService.createListItem('record', null, null, null, null, [], [audio], []);
            event.target.value = '';
            this.router.navigate(['/editor', 'record']);
        }
    }
}
