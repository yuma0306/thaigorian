import { z } from 'zod';
import { synthesizeSpeechWav } from '@/functions/geminiTts';
import { createSupabaseServerClient } from '@/functions/supabaseServer';

const requestSchema = z.object({
	text: z.string().trim().min(1).max(500),
	lang: z.string().trim().min(2).max(20)
});

export async function POST(request: Request) {
	const parsed = requestSchema.safeParse(await request.json());

	if (!parsed.success) {
		return Response.json({ error: 'Invalid request' }, { status: 400 });
	}

	if (!parsed.data.lang.startsWith('th')) {
		return Response.json({ error: 'Unsupported language' }, { status: 400 });
	}

	const supabase = await createSupabaseServerClient();
	const {
		data: { user },
		error: authError
	} = await supabase.auth.getUser();

	if (authError || !user) {
		return Response.json({ error: 'Unauthorized' }, { status: 401 });
	}

	try {
		const wav = await synthesizeSpeechWav(parsed.data.text, parsed.data.lang);

		return new Response(new Uint8Array(wav), {
			headers: { 'Content-Type': 'audio/wav' }
		});
	} catch {
		return Response.json({ error: 'TTS failed' }, { status: 500 });
	}
}
