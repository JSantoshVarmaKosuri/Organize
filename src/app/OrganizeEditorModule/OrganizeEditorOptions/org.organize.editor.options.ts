import { Component, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
    selector: 'org-editor-options',
    templateUrl: 'org.organize.editor.options.html',
    styleUrls: ['org.organize.editor.options.scss'],
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
export class OrganizeEditorOptionsComponent {
    toggleState: string;
    @Output() select = new EventEmitter<any>();

    constructor() {
        this.toggleState = 'active';
    }

    onItem(type) {
        this.toggleState = 'inactive';
        setTimeout(() => {
            this.select.emit(type);
        }, 500);
    }

    onMask() {
        this.toggleState = 'inactive';
        setTimeout(() => {
            this.select.emit();
        }, 500);
    }
}
