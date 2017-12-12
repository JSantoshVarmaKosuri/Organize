import { Component, ViewChild, ElementRef, OnInit, Renderer2 } from "@angular/core";

@Component({ 
    selector: 'org-draw',
    templateUrl: 'org.organize.draw.component.html',
    styleUrls: ['org.organize.draw.component.scss']
})
export class OrganizeDrawComponent implements OnInit {
    @ViewChild('canvas') canvas: ElementRef;
    @ViewChild('svg') svg: ElementRef;
    context: any;
    
    constructor(private renderer: Renderer2) {

    }

    ngOnInit() {
        if(this.canvas && this.canvas.nativeElement) {
            console.log(this.canvas.nativeElement);
            this.context = this.canvas.nativeElement.getContext("2d");
            this.context.moveTo(0,0);
            this.context.lineTo(200,100);
            this.context.stroke();
        } else if(this.svg && this.svg.nativeElement) {
            console.log(this.svg.nativeElement);
            this.renderer.setAttribute(this.svg.nativeElement,'fill', '#333');
        }
    }

    onBack() {
        console.log(`back called`);
    }
}