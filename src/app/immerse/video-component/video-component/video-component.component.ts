import { Component, ElementRef, inject, viewChild } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { FileService } from 'app/shared/services/file.service';
import Logger from 'electron-log/renderer';
import { MatTooltip } from '@angular/material/tooltip';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
    selector: 'video-component',
    imports: [
        MatTooltip,
        MatIcon,
        MatIconButton,
        TranslatePipe
    ],
    templateUrl: './video-component.component.html',
    styleUrl: './video-component.component.scss',
})
export class VideoComponent {
    private fileService = inject(FileService);
    readonly videoPlayer =
        viewChild.required<ElementRef<HTMLVideoElement>>('videoPlayer');
    videoSrc: SafeUrl = '';

    /**
     * Called after a file is selected.
     * @param event - File selection event
     */
    onVideoChange(event: Event): void {
        const handler = (file: File) => {
            console.log('Selected video file:', file);
        };
        this.videoSrc = this.fileService.getURLFromInputElem(
            event,
            this.videoSrc,
            handler,
        );
    }

    /**
     * Called when video metadata is loaded.
     */
    onVideoLoad(): void {
        // Use setTimeout to ensure video.src is fully updated
        setTimeout(() => {
            this.videoPlayer().nativeElement.play();
            Logger.info('Video playback started.');
        }, 0);
    }

    onVideoPlaying(event: Event): void {
        const currentTimeInSeconds =
            this.videoPlayer().nativeElement.currentTime;
        Logger.debug('Current video time:', currentTimeInSeconds);

        const currentTimeInMs = Math.ceil(currentTimeInSeconds * 1000);
        // TODO this.subtitleUpdateTrigger$.next(currentTimeInMs);
    }
}
