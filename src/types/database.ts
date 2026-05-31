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
