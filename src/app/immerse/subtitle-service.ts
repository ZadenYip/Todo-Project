import { Injectable, OnDestroy, signal } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { TranslateService } from "@ngx-translate/core";
import { filter, map, Subject, Subscription, throttleTime } from "rxjs";
import { SubtitleManager } from "./find-subtitle-algo/subtitle-manager";

@Injectable()
export class SubtitleService implements OnDestroy {

    /**
     * notifying subtitle-panel component
     */
    subtitleUpdateTrigger$ = new Subject<number>();
    private subscription: Subscription = new Subscription();
    /**
     * currently active subtitle IDs 
     * used for siganling subtitle item components to highlight
     */
    activeIDs = signal<Set<number>>(new Set<number>());
    private subtitleManager: SubtitleManager;
    
    constructor(private translate: TranslateService) {
        this.subtitleManager = new SubtitleManager(
            this.translate.instant(
                'PAGES.IMMERSE.SUBTITLE.EMPTY',
            ),
        );

        this.subscription.add(this.subtitleUpdateTrigger$.pipe(
            throttleTime(100),
            map((videoCurTimeMs: number) => this.subtitleManager.nextSubtitleIds(videoCurTimeMs)),
            filter((activeSubtitleIDs: Set<number>) => activeSubtitleIDs.size > 0),
        ).subscribe(
            (activeSubtitleIDs: Set<number>) => {
                this.activeIDs.set(activeSubtitleIDs);
            }
        ));
    }

    get manager(): SubtitleManager {
        return this.subtitleManager;
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    public notifySubtitleUpdate(videoCurTimeMs: number): void {
        this.subtitleUpdateTrigger$.next(videoCurTimeMs);
    }

    public async loadSubtitle(file: File, notificationBar: MatSnackBar): Promise<void> {
        const filePath = window.electron.webUtils.getPathForFile(file);
        this.subtitleManager = new SubtitleManager();
        
        return new Promise<void>((resolve, reject) => {
            window.observables.subtitleService.fetchSubtitles$(filePath).subscribe({
                next: (cue) => {
                    console.debug('Received subtitle cue:', cue);
                    this.subtitleManager.add(cue);
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
                    console.log('Total subtitles loaded:', this.subtitleManager.subtitles.length);
                    notificationBar.open(
                        this.translate.instant(
                            'PAGES.IMMERSE.SUBTITLE.SUCCESS_LOAD_MSG'
                        ),
                        this.translate.instant(
                            'PAGES.IMMERSE.SUBTITLE.SUCCESS_LOAD_ACTION'
                        ),
                        { duration: 3000 }
                    );
                    resolve();
                    this.manager.refreshSubtitlesRef();
                },
          });
        });
    }


    
}