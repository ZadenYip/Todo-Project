import { Component, OnDestroy, OnInit } from '@angular/core';
import { SubtitlePanelComponent } from './subtitle-panel/subtitle-panel';
import { VideoComponent } from './video-component/video-component';
import { SubtitleService } from './subtitle-service';
import { FileService } from '@app/shared/services/file.service';

@Component({
    selector: 'app-immerse',
    templateUrl: './immerse.component.html',
    styleUrls: ['./immerse.component.scss'],
    standalone: true,
    providers: [
        SubtitleService
    ],
    imports: [
        SubtitlePanelComponent,
        VideoComponent
    ],
})
export class ImmerseComponent implements OnInit, OnDestroy {

    ngOnInit(): void {
        console.log('ImmerseComponent initialized.');
    }

    ngOnDestroy(): void {
        console.log('ImmerseComponent destroyed.');
    }
}
