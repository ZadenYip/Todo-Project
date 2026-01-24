import { CdkVirtualScrollViewport, ScrollingModule } from '@angular/cdk/scrolling';
import { Component, inject, OnInit, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltip } from '@angular/material/tooltip';
import { SafeUrl } from '@angular/platform-browser';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { SubtitleManager } from '../../find-subtitle-algo/subtitle-manager'; 
import { SubtitleService } from '../../subtitle-service'; 
import { FileService } from '../../../shared/services/file.service';
import log from 'electron-log/renderer';


@Component({
    selector: 'subtitle-panel',
    imports: [
        CdkVirtualScrollViewport,
        ScrollingModule,
        MatIconModule,
        MatButtonModule,
        TranslatePipe,
        MatSnackBarModule,
        MatTooltip
    ],
    providers: [
        SubtitleService
    ],
    templateUrl: './subtitle-panel.component.html',
    styleUrl: './subtitle-panel.component.scss',
})
export class SubtitlePanelComponent implements OnInit {
    private fileService = inject(FileService);
    private translate = inject(TranslateService);

    readonly subtitleListView =
        viewChild.required<CdkVirtualScrollViewport>('subtitleList');
    subtitleSrc: SafeUrl = '';
    private notificationBar = inject(MatSnackBar);
    private subtitleService = inject(SubtitleService);

    subtitles: GlobalSubtitle[] = [];
    /**
     * zero indicates no active subtitle
     * because srt subtitle ids start from 1
     */
    activeSubtitleId: number = 0;
    

    constructor() {}

    ngOnInit(): void {
        this.subtitles = [
            {
                id: 1,
                startTime: 0,
                endTime: 2000,
                textLines: [
                    this.translate.instant(
                        'PAGES.IMMERSE.SUBTITLE.EMPTY_SUBTITLE_ITEM',
                    ),
                ],
            },
        ];
    }

    /**
     *
     * @param event - Subtitle file selection event
     */
    onSubtitleChange(event: Event): void {
        const handler = async (file: File) => {
            log.info('Selected subtitle file:', file);
            this.subtitles = await this.subtitleService.loadSubtitle(
                file,
                this.notificationBar,
            );
        };

        this.subtitleSrc = this.fileService.getURLFromInputElem(
            event,
            this.subtitleSrc,
            handler,
        );
    }
}
