import type { SpeechLang } from '@/constants/speechLangs';
import type { createSupabaseServerClient } from '@/functions/supabaseServer';
import { isMissingSpeechLangColumn } from '@/functions/memberCategory/isMissingSpeechLangColumn';

type Supabase = NonNullable<Awaited<ReturnType<typeof createSupabaseServerClient>>>;

export async function insertMyCategoryRow(
	supabase: Supabase,
	row: {
		user_id: string;
		title: string;
		slug: string;
		speech_lang: SpeechLang;
	}
) {
	const withLang = await supabase.from('my_categories').insert(row).select('id').single();

	if (!withLang.error) {
		return withLang;
	}

	if (!isMissingSpeechLangColumn(withLang.error)) {
		return withLang;
	}

	return supabase
		.from('my_categories')
		.insert({
			user_id: row.user_id,
			title: row.title,
			slug: row.slug
		})
		.select('id')
		.single();
}

export async function updateMyCategoryRow(
	supabase: Supabase,
	categoryId: string,
	userId: string,
	fields: {
		title: string;
		slug: string;
		speech_lang: SpeechLang;
		updated_at: string;
	}
) {
	const withLang = await supabase
		.from('my_categories')
		.update(fields)
		.eq('id', categoryId)
		.eq('user_id', userId);

	if (!withLang.error) {
		return withLang;
	}

	if (!isMissingSpeechLangColumn(withLang.error)) {
		return withLang;
	}

	return supabase
		.from('my_categories')
		.update({
			title: fields.title,
			slug: fields.slug,
			updated_at: fields.updated_at
		})
		.eq('id', categoryId)
		.eq('user_id', userId);
}
