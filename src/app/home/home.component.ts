import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { HomeService } from './home.service';
import { Observable, of } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import { DataSource } from '@angular/cdk/table';
import { C } from '@angular/cdk/data-source.d-Bblv7Zvh';
import { DeckListItem } from './deck-list-item.model';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: true,
    imports: [TranslateModule, MatTableModule]
})
export class HomeComponent implements OnInit {
    private homeService: HomeService = inject(HomeService);
    deckListSrc: DeckListDataSource = new DeckListDataSource(of([]));
    displayedColumns: string[] = ['id', 'name', 'newCardsPerDay', 'newCardsLearned'];
    
    // TODO 模板处理异步数据流
    deckList$: Observable<DeckListItem[]> | null = null;   
    constructor(private router: Router) {}

    ngOnInit(): void {
        console.log('HomeComponent INIT');
        this.reloadDecks();
    }

    reloadDecks() {
        console.log('Reloading decks...');
        this.deckListSrc = new DeckListDataSource(this.homeService.queryDeckList());
    }

    clickDeckRow(deck: DeckListItem) {
        console.log('Clicked deck row:', deck);
    }
}

export class DeckListDataSource extends DataSource<DeckListItem> {

    constructor(private deckList$: Observable<DeckListItem[]>) {
        super();
    }

    connect(): Observable<readonly DeckListItem[]> {
        return this.deckList$;
    }

    disconnect(): void {
        // No-op
    }
}
