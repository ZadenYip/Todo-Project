import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { GlobalSubtitle } from "./subtitle-interface";
import { TranslateService } from "@ngx-translate/core";

@Injectable({
    providedIn: 'root',
})
export class SubtitleService {
    
    constructor(private translate: TranslateService) {}

    public async loadSubtitle(file: File, notificationBar: MatSnackBar): Promise<GlobalSubtitle[]> {
        // Clear existing subtitles
        let newSubtitles: GlobalSubtitle[] = [];
        const filePath = window.electron.webUtils.getPathForFile(file);

        return new Promise<GlobalSubtitle[]>((resolve, reject) => {
            window.observables.subtitleService.fetchSubtitles$(filePath).subscribe({
                next: (cue) => {
                    console.debug('Received subtitle cue:', cue);
                    newSubtitles.push(cue);
                },
                error: (err) => {
                    console.error('Error fetching subtitles:', err);
                    notificationBar.open(
                        this.translate.instant(
                            'PAGES.IMMERSE.SUBTITLE.FAIL_TO_LOAD_MSG'
                        ),
                        this.translate.instant(
                            'PAGES.IMMERSE.SUBTITLE.FAIL_TO_LOAD_ACTION'
                        )
                    );
                    reject(err);
                },
                complete: () => {
                    console.log('Completed fetching subtitles.');
                    console.log('Total subtitles loaded:', newSubtitles.length);
                    notificationBar.open(
                        this.translate.instant(
                            'PAGES.IMMERSE.SUBTITLE.SUCCESS_LOAD_MSG'
                        ),
                        this.translate.instant(
                            'PAGES.IMMERSE.SUBTITLE.SUCCESS_LOAD_ACTION'
                        ),
                        { duration: 3000 }
                    );
                    resolve(newSubtitles);
                },
          });
        });
    }

    public nextSubtitleId(subtitles: GlobalSubtitle[], timeInMs: number): number {
        // TODO find the next subtitle id based on timeInMs
        return 0;
    }
    
}