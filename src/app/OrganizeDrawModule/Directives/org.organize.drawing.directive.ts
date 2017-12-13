import { Directive, Input, OnInit, ElementRef, HostListener, Renderer2, EventEmitter, OnChanges } from "@angular/core";

@Directive({
    selector: '[orgDrawing]'
})
export class OrganizeDrawingDirective implements OnInit, OnChanges{
    context: any;
    startDrawing: boolean;
    clickX = [];
    clickY = [];
    clickDrag = [];

    @Input() clear: boolean;

    constructor(private element: ElementRef,
                private renderer: Renderer2) {
        this.startDrawing = false;
    }

    ngOnChanges() {
        if(this.clear) {
            this.clearCanvas();
        }
    }

    @HostListener('touchstart', ['$event'])
    @HostListener('mousedown', ['$event']) onMouseDown($event) {

        if ($event.touches.length) {
            var mouseX = $event.touches[0].pageX - this.element.nativeElement.offsetLeft;
            var mouseY = $event.touches[0].pageY - this.element.nativeElement.offsetTop;
        } else {
            var mouseX = $event.pageX - this.element.nativeElement.offsetLeft;
            var mouseY = $event.pageY - this.element.nativeElement.offsetTop;
        }

        this.startDrawing = true;
        this.addClick(mouseX, mouseY, false);
        this.redraw();
    }

    @HostListener('touchmove', ['$event'])
    @HostListener('mousemove', ['$event']) onMouseMove($event) {
        if(this.startDrawing) {

            if ($event.touches.length) {
                var mouseX = $event.touches[0].pageX - this.element.nativeElement.offsetLeft;
                var mouseY = $event.touches[0].pageY - this.element.nativeElement.offsetTop;
            } else {
                var mouseX = $event.pageX - this.element.nativeElement.offsetLeft;
                var mouseY = $event.pageY - this.element.nativeElement.offsetTop;
            }

            this.addClick(mouseX, mouseY, true);
            this.redraw();
        }
    }

    @HostListener('touchend')
    @HostListener('mouseup')
    @HostListener('touchcancel')
    @HostListener('mouseleave') onMouseLeave() {
        console.log('touchend');
        this.startDrawing = false;
    }

    addClick(x: number, y: number, dragging: boolean) {
        this.clickX.push(x);
        this.clickY.push(y);
        this.clickDrag.push(dragging);
    }

    clearCanvas() {
        this.clickX.length = 0;
        this.clickY.length = 0;
        this.clickDrag.length = 0;
        this.context.clearRect(0, 0, this.context.canvas.offsetWidth, this.context.canvas.offsetHeight);
    }

    redraw() {
        this.context.clearRect(0, 0, this.context.canvas.offsetWidth, this.context.canvas.offsetHeight);

        this.context.strokeStyle = "#df4b26";
        this.context.lineJoin = "round";
        this.context.lineEnd = "round";
        this.context.lineWidth = 5;
                  
        for(var i=0; i < this.clickX.length; i++) {		
          this.context.beginPath();
          if(this.clickDrag[i] && i){
            this.context.moveTo(this.clickX[i-1], this.clickY[i-1]);
           }else{
             this.context.moveTo(this.clickX[i]-1, this.clickY[i]);
           }
           this.context.lineTo(this.clickX[i], this.clickY[i]);
           this.context.closePath();
           this.context.stroke();
        }
    }

    ngOnInit() {
        this.context = this.element.nativeElement.getContext("2d");
        this.renderer.setAttribute(this.element.nativeElement, 'width' , this.context.canvas.offsetWidth);
        this.renderer.setAttribute(this.element.nativeElement, 'height' , this.context.canvas.offsetHeight);
    }
}