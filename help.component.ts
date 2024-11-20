//
//
//          Assessment Part 2
//
//
// Privacy Statement Page
import { Component } from '@angular/core';

@Component({
    selector: '',
    templateUrl: './help.component.html',
    styleUrls: ['./app.component.css']
})

export class HelpComponent {
    isPrivacyActive: boolean = false;
    isHelpActive: boolean = false;

    togglePrivacy(): void {
        this.isPrivacyActive = !this.isPrivacyActive;
    }

    toggleHelp(): void {
        this.isHelpActive = !this.isHelpActive;
    }
}