import { Component, ViewChild, ElementRef, OnInit, Renderer2 } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { OrganizeListService } from "../SharedModule/Services/org.organize.list.service";

@Component({
    selector: 'org-draw',
    templateUrl: 'org.organize.draw.component.html',
    styleUrls: ['org.organize.draw.component.scss']
})
export class OrganizeDrawComponent implements OnInit {
    @ViewChild('canvas') canvas: ElementRef;
    context: any;
    toggelClear: boolean;
    touched: boolean;
    newNote: string;

    constructor(private renderer: Renderer2,
                private router: Router,
                private listService: OrganizeListService,
                private route: ActivatedRoute) {
        this.context = null;
        this.toggelClear = false;
        this.touched = false;
    }

    ngOnInit() {
        this.route.fragment.subscribe((param: string) => {
            this.newNote = param;
        });
    }

    onClear() {
        this.toggelClear = true;
        setTimeout(() => {
            this.toggelClear = false;
        }, 100);
    }

    canvasTouched() {
        this.touched = true;
    }

    onBack() {
        const data = this.canvas.nativeElement.toDataURL();
        if (data && this.touched) {
            this.listService.activeListItem.drawing.push(data);
        }

        if (this.newNote &&  this.newNote === 'new') {
            this.router.navigate(['/editor', 'draw']);
        } else {
            this.router.navigate(['/editor', 'draw', this.listService.activeListItem.id]);
        }
    }
}
