import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'org-editor',
    templateUrl: 'org.organize.editor.component.html',
    styleUrls: ['org.organize.editor.component.scss']
})
export class OrganizeEditorComponent {
    toggelAddFeatures: boolean;
    toggelOptions: boolean;

    constructor(private router: Router) {
        this.toggelAddFeatures = false;
    }

    onBack() {
        this.router.navigate(['/list']);
    }

    onPin() {

    }

    onReminder() {

    }

    onArchive() {

    }

    onAddFeatures() {
        this.toggelAddFeatures = true;
    }

    onAddFeatureClose() {
        this.toggelAddFeatures = false;
    }

    onOptions() {
        this.toggelOptions = true;
    }

    onOptionsClose() {
        this.toggelOptions = false;
    }
}
