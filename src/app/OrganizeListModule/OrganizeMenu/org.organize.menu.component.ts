import { Component, Input, Output, EventEmitter } from '@angular/core';
import {
    trigger,
    state,
    style,
    animate,
    transition
} from '@angular/animations';

@Component({
    selector: 'org-menu',
    templateUrl: 'org.organize.menu.component.html',
    styleUrls: ['org.organize.menu.component.scss'],
    animations: [
        trigger('sidemenu', [
            state('inactive', style({
                transform: 'translateX(-100%)'
            })),
            state('active', style({
                transform: 'translateX(0)'
            })),
            transition('inactive => active', animate('1s ease-in')),
            transition('active => inactive', animate('1s ease-out'))
        ])
    ]
})
export class OrganizeMenuComponent {
    @Input() toggleState: string;
    @Output() onMenu = new EventEmitter<any>();

    onMenuClick() {
        this.onMenu.emit();
    }
}
