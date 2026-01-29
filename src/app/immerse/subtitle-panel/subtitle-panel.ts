import { CdkVirtualScrollViewport, ScrollingModule } from '@angular/cdk/scrolling';
import { Component, inject, OnDestroy, OnInit, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltip } from '@angular/material/tooltip';
import { SafeUrl } from '@angular/platform-browser';
import { TranslatePipe } from '@ngx-translate/core';
import { SubtitleService } from '../subtitle-service';
import { FileService } from '@shared/services/file.service';
import Logger from 'electron-log/renderer';
import { Subscription } from 'rxjs';
import { SubtitleItemComponent } from './item/subtitle-item';


@Component({
    selector: 'subtitle-panel',
    imports: [
    CdkVirtualScrollViewport,
    ScrollingModule,
    MatIconModule,
    MatButtonModule,
    TranslatePipe,
    MatSnackBarModule,
    MatTooltip,
    SubtitleItemComponent
],
    templateUrl: './subtitle-panel.html',
    styleUrl: './subtitle-panel.scss',
})
export class SubtitlePanelComponent implements OnInit, OnDestroy {
    private fileService = inject(FileService);
    private subscribeVideoPlaying$ = new Subscription();

    readonly subtitleListView =
        viewChild.required<CdkVirtualScrollViewport>('subtitleList');
    subtitleSrc: SafeUrl = '';
    private notificationBar = inject(MatSnackBar);
    subtitleService = inject(SubtitleService);

    ngOnInit(): void {
        Logger.info('SubtitlePanelComponent initialized.');
    }

    ngOnDestroy(): void {
        this.subscribeVideoPlaying$.unsubscribe();
    }

    /**
     *
     * @param event - Subtitle file selection event
     */
    onSubtitleChange(event: Event): void {
        const handler = async (file: File) => {
            Logger.info('Selected subtitle file:', file);
            await this.subtitleService.loadSubtitle(
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
