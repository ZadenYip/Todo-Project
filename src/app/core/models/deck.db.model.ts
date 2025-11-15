export interface DeckDB {
    deckId: number;
    name: string;
    newCardsPerDay: number;
    newCardsLearned: number;
    algorithm_parameters: string;
}
/**
 * 
 * CREATE TABLE IF NOT EXISTS decks (
 *   deck_id INTEGER PRIMARY KEY, -- Unix 时间
 *  name TEXT NOT NULL,
 *  new_cards_per_day INTEGER DEFAULT 20, -- 允许每天新学的卡片数量
 *  new_cards_learned INTEGER DEFAULT 0, -- 已学习的新卡片数量
 * algorithm_parameters TEXT -- 算法参数的 JSON 字符串
 * );
 */