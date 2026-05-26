import { createClient } from 'microcms-js-sdk';
import type { Situation } from '@/types';

function getClient() {
	const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN;
	const apiKey = process.env.MICROCMS_API_KEY;
	if (!serviceDomain || !apiKey) {
		throw new Error('MICROCMS_SERVICE_DOMAIN and MICROCMS_API_KEY must be set');
	}
	return createClient({ serviceDomain, apiKey });
}

export async function getSituations(): Promise<Situation[]> {
	const client = getClient();
	const response = await client.getList<Situation>({
		endpoint: 'situations',
		queries: {
			limit: 100,
			fields: 'id,title'
		}
	});
	return response.contents;
}

export async function getSituationById(id: string): Promise<Situation | undefined> {
	try {
		const client = getClient();
		return await client.getListDetail<Situation>({
			endpoint: 'situations',
			contentId: id
		});
	} catch {
		return undefined;
	}
}
