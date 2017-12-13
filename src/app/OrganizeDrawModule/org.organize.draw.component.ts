import { Component, ViewChild, ElementRef, OnInit, Renderer2 } from "@angular/core";

@Component({ 
    selector: 'org-draw',
    templateUrl: 'org.organize.draw.component.html',
    styleUrls: ['org.organize.draw.component.scss']
})
export class OrganizeDrawComponent implements OnInit {
    @ViewChild('canvas') canvas: ElementRef;
    context: any;
    toggelClear: boolean;
    
    constructor(private renderer: Renderer2) {
        this.context = null;
        this.toggelClear = false;
    }

    ngOnInit() {
        
    }

    onClear() {
        this.toggelClear = true;
        setTimeout(() => {
            this.toggelClear = false;
        },100);
    }

    onBack() {
        console.log(`back called`);
    }
}