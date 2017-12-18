import { Directive, ElementRef, Input, HostListener, HostBinding, OnInit, Output, EventEmitter, OnChanges } from '@angular/core';

@Directive({
    selector: '[orgPlaceholder]'
})
export class OrganizePlaceholderDirective implements OnInit, OnChanges {
    @Input() orgPlaceholder: string;
    @Input() orgValue: string;

    @HostBinding('style.color') color = '#656565';

    constructor(private eleRef: ElementRef) {}

    @HostListener('focus') onfocus() {
        if (this.eleRef.nativeElement.innerText === this.orgPlaceholder ) {
            this.eleRef.nativeElement.innerText = '';
            this.color = '#656565';
        } else {
            this.color = '#3c3c3c';
        }
    }

    @HostListener('keyup') onKeyup() {
        this.color = '#3c3c3c';
        this.orgValue = this.eleRef.nativeElement.innerText;
    }

    @HostListener('blur') onBlur() {
        if (this.eleRef.nativeElement.innerText === '') {
            this.eleRef.nativeElement.innerText = this.orgPlaceholder;
            this.color = '#656565';
        }
    }

    ngOnInit() {
        this.eleRef.nativeElement.innerText = this.orgValue || this.orgPlaceholder;
    }

    ngOnChanges(simpleChanges) {
        this.eleRef.nativeElement.innerText = this.orgValue || this.orgPlaceholder;
    }
}
