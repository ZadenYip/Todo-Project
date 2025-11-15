import { Injectable } from '@angular/core';
import { from, map, Observable } from 'rxjs';
import { DeckListItem } from './deck-list-item.model';
import { ipcRunSQL } from '../core/ipc';

@Injectable({
    providedIn: 'root',
})
export class HomeService {
    constructor() {}

    public queryDeckList(): Observable<DeckListItem[]> {
        const sql: string = `
            SELECT deck_id, name, new_cards_per_day, new_cards_learned FROM decks
        `;

        return from(ipcRunSQL(sql)).pipe(
            map((rawDecks: any[]) => {
                const deckList: DeckListItem[] = rawDecks.map((item) => ({
                    deckId: item.deck_id,
                    name: item.name,
                    newCardsPerDay: item.new_cards_per_day,
                    newCardsLearned: item.new_cards_learned,
                }));
                console.log('Mapped deck list:', deckList);
                return deckList;
            })
        );
    }
}
