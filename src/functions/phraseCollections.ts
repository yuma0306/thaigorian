import 'server-only';

import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { resolveSpeechLang, type SpeechLang } from '@/constants/speechLangs';
import type {
	PhraseCollection,
	PhraseCollectionFile,
	PhraseCollectionIndexEntry
} from '@/types/database';

const phrasesDataDir = path.join(process.cwd(), 'src/data/phrases');

export type PhraseCollectionSummary = {
	id: string;
	title: string;
	speechLang: SpeechLang;
};

async function readIndex() {
	const raw = await readFile(path.join(phrasesDataDir, 'index.json'), 'utf8');
	return JSON.parse(raw) as PhraseCollectionIndexEntry[];
}

async function readCollectionFile(entry: PhraseCollectionIndexEntry) {
	const raw = await readFile(path.join(phrasesDataDir, entry.file), 'utf8');
	return JSON.parse(raw) as PhraseCollectionFile;
}

async function loadSummary(entry: PhraseCollectionIndexEntry): Promise<PhraseCollectionSummary> {
	const data = await readCollectionFile(entry);
	return {
		id: entry.id,
		title: entry.title,
		speechLang: resolveSpeechLang(data.speechLang)
	};
}

async function loadCollection(entry: PhraseCollectionIndexEntry): Promise<PhraseCollection> {
	const data = await readCollectionFile(entry);

	return {
		id: entry.id,
		title: data.title,
		...(data.description !== undefined ? { description: data.description } : {}),
		...(data.speechLang !== undefined ? { speechLang: data.speechLang } : {}),
		phrases: data.phrases
	};
}

/** トップ一覧用 */
export async function getPhraseCollectionSummaries(): Promise<PhraseCollectionSummary[]> {
	const index = await readIndex();
	return Promise.all(index.map(loadSummary));
}

export async function getPhraseCollectionById(id: string): Promise<PhraseCollection | undefined> {
	const index = await readIndex();
	const entry = index.find((item) => item.id === id);
	if (!entry) {
		return undefined;
	}
	return loadCollection(entry);
}
