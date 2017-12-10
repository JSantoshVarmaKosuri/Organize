import { Directive, ElementRef, Input, HostListener, HostBinding, OnInit } from '@angular/core';

@Directive({
    selector: '[orgPlaceholder]'
})
export class OrganizePlaceholderDirective implements OnInit {
    @Input() orgPlaceholder: string;
    @HostBinding('innerText') text = '';
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
    }

    @HostListener('blur') onBlur() {
        if (this.eleRef.nativeElement.innerText === '') {
            this.eleRef.nativeElement.innerText = this.orgPlaceholder;
            this.color = '#656565';
        }
    }

    ngOnInit() {
        this.text = this.orgPlaceholder;
    }
}
