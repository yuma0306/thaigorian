import {
	defaultSpeechLang,
	resolveSpeechLang,
	type SpeechLang
} from '@/constants/speechLangs';
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
