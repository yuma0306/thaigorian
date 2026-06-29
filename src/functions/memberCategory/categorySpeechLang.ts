import { defaultSpeechLang, resolveSpeechLang, type SpeechLang } from '@/constants/speechLangs';
import type { createSupabaseServerClient } from '@/functions/supabaseServer';
import { isMissingSpeechLangColumn } from '@/functions/memberCategory/isMissingSpeechLangColumn';

type Supabase = NonNullable<Awaited<ReturnType<typeof createSupabaseServerClient>>>;

export async function fetchMyCategoryForEdit(
	supabase: Supabase,
	userId: string,
	categoryId: string
): Promise<{
	id: string;
	title: string | null;
	slug: string | null;
	speechLang: SpeechLang;
} | null> {
	const withLang = await supabase
		.from('my_categories')
		.select('id,title,slug,speech_lang')
		.eq('id', categoryId)
		.eq('user_id', userId)
		.single();

	if (withLang.data) {
		return {
			id: withLang.data.id,
			title: withLang.data.title,
			slug: withLang.data.slug,
			speechLang: resolveSpeechLang(withLang.data.speech_lang)
		};
	}

	if (!isMissingSpeechLangColumn(withLang.error)) {
		return null;
	}

	const withoutLang = await supabase
		.from('my_categories')
		.select('id,title,slug')
		.eq('id', categoryId)
		.eq('user_id', userId)
		.single();

	if (!withoutLang.data) {
		return null;
	}

	return {
		id: withoutLang.data.id,
		title: withoutLang.data.title,
		slug: withoutLang.data.slug,
		speechLang: defaultSpeechLang
	};
}

type CategoryListRow = {
	id: string;
	title: string | null;
	slug: string | null;
	updated_at: string;
	speech_lang?: string | null;
};

function mapCategoryListRows(rows: CategoryListRow[]) {
	return rows.map((row) => ({
		id: row.id,
		title: row.title,
		slug: row.slug,
		updated_at: row.updated_at,
		speechLang: resolveSpeechLang(row.speech_lang)
	}));
}

export async function fetchMyCategoryList(
	supabase: Supabase,
	userId: string
): Promise<{ categories: ReturnType<typeof mapCategoryListRows> | null; error: Error | null }> {
	const withLang = await supabase
		.from('my_categories')
		.select('id,title,slug,updated_at,speech_lang')
		.eq('user_id', userId)
		.order('updated_at', { ascending: false });

	if (!withLang.error) {
		return { categories: mapCategoryListRows(withLang.data ?? []), error: null };
	}

	if (!isMissingSpeechLangColumn(withLang.error)) {
		return { categories: null, error: withLang.error };
	}

	const withoutLang = await supabase
		.from('my_categories')
		.select('id,title,slug,updated_at')
		.eq('user_id', userId)
		.order('updated_at', { ascending: false });

	if (withoutLang.error) {
		return { categories: null, error: withoutLang.error };
	}

	return { categories: mapCategoryListRows(withoutLang.data ?? []), error: null };
}
