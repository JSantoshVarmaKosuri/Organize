import { Component, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
    selector: 'org-editor-notes',
    templateUrl: 'org.organize.editor.notes.html',
    styleUrls: ['org.organize.editor.notes.scss'],
    animations: [
        trigger('notesOptions', [
            state('active', style({
                transform: 'translateY(200px)'
            })),
            state('inactive', style({
                transform: 'translateY(200%)'
            })),
            transition('void => active', animate('500ms ease-in')),
            transition('active => inactive', animate('500ms ease-out'))
        ])
    ]
})
export class OrganizeEditorNotesComponent {
    toggleState: string;
    @Output() select = new EventEmitter<any>();

    constructor() {
        this.toggleState = 'active';
    }

    onMask() {
        this.toggleState = 'inactive';
        setTimeout(() => {
            this.select.emit();
        }, 500);
    }

    onItem(type) {
        this.toggleState = 'inactive';
        setTimeout(() => {
            this.select.emit(type);
        }, 500);
    }
}
