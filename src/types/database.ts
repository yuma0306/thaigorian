/** Supabase: my_categories（一覧） */
export type MyCategoryListRow = {
	id: string;
	title: string | null;
	slug: string | null;
	updated_at: string;
};

/** Supabase: my_categories（詳細・編集） */
export type MyCategoryRow = Pick<MyCategoryListRow, 'id' | 'title' | 'slug'>;

/** Supabase: my_categories（id + title のみ） */
export type MyCategoryTitleRow = Pick<MyCategoryListRow, 'id' | 'title'>;

/** Supabase: my_phrases */
export type MyPhraseRow = {
	id: string;
	category_id: string;
	phrase: string | null;
	meaning: string | null;
	ipa: string | null;
	sort_order: number | null;
};

/** Supabase: my_phrases（category_id なしの select） */
export type MyPhraseEditRow = Omit<MyPhraseRow, 'category_id'>;

/** Supabase: my_words */
export type MyWordRow = {
	id: string;
	phrase_id: string;
	word: string | null;
	meaning: string | null;
	sort_order: number | null;
};

/** Supabase: profiles */
export type ProfileRow = {
	id: string;
	email: string | null;
	name: string | null;
	created_at: string;
	updated_at: string;
};

/** Supabase: my_phrases insert の select 戻り値 */
export type MyPhraseSavedRow = {
	id: string;
	sort_order: number;
};

/** アプリ共通: 用語（MyWordRow の word / meaning に対応、fieldId は JSON・UI 用の ID） */
type Word = {
	fieldId: string;
} & Partial<Pick<MyWordRow, 'word' | 'meaning'>>;

/** アプリ共通: フレーズ（MyPhraseRow の phrase / meaning / ipa に対応） */
export type Phrase = {
	fieldId: string;
} & Partial<Pick<MyPhraseRow, 'phrase' | 'meaning' | 'ipa'>> & {
		words?: Word[];
	};

export type LessonResult = {
	phrase: Phrase;
	correct: boolean;
};

/** src/data/phrases/*.json のファイル本体（id は index.json で管理） */
export type PhraseCollectionFile = {
	title: string;
	description?: string;
	phrases: Phrase[];
};

/** src/data/phrases/index.json の1件 */
export type PhraseCollectionIndexEntry = {
	id: string;
	title: string;
	file: string;
};

/** フレーズ集（JSON 静的データ・会員データの共通形） */
export type PhraseCollection = {
	id: string;
	title: string;
	description?: string;
	phrases: Phrase[];
};
